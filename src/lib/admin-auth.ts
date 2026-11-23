import "dotenv/config";
import { createHash, randomBytes, randomInt, scryptSync, timingSafeEqual } from "node:crypto";
import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type AdminAccount = {
  username: string;
  email: string;
  passwordHash: string;
  salt: string;
};

type VerificationState = {
  codeHash: string;
  salt: string;
  expiresAt: number;
  attemptsLeft: number;
  sentAt: number[];
  targetEmail?: string;
};

const DATA_DIR = join(process.cwd(), ".data");
const ACCOUNT_FILE = join(DATA_DIR, "admin-account.json");
const VERIFICATION_FILE = join(DATA_DIR, "admin-email-verification.json");
const sessions = new Map<string, { role: string; expires: number }>();
const loginAttempts = new Map<
  string,
  { count: number; windowStartedAt: number; blockedUntil: number }
>();

function hashPassword(password: string, salt: string) {
  return scryptSync(password, salt, 64).toString("hex");
}

function writeJsonFile(path: string, value: unknown) {
  mkdirSync(DATA_DIR, { recursive: true });
  const temporaryPath = `${path}.${randomBytes(8).toString("hex")}.tmp`;
  writeFileSync(temporaryPath, JSON.stringify(value), { encoding: "utf8", mode: 0o600 });
  renameSync(temporaryPath, path);
}

function readAdminAccount(): AdminAccount | null {
  try {
    return JSON.parse(readFileSync(ACCOUNT_FILE, "utf8")) as AdminAccount;
  } catch {
    const initialPassword = process.env.ADMIN_PASSWORD;
    if (!initialPassword) return null;
    const salt = randomBytes(32).toString("hex");
    const account: AdminAccount = {
      username: process.env.ADMIN_USERNAME || "admin",
      email:
        process.env.ADMIN_RECOVERY_EMAIL || process.env.ADMIN_EMAIL || "aaqib.mehmood@gmail.com",
      passwordHash: hashPassword(initialPassword, salt),
      salt,
    };
    writeJsonFile(ACCOUNT_FILE, account);
    return account;
  }
}

export function getAdminAccountSummary() {
  const account = readAdminAccount();
  return account ? { username: account.username, email: account.email } : null;
}

export function verifyAdminCredentials(identifier: string, password: string) {
  const account = readAdminAccount();
  if (!account) return false;
  const matchesIdentifier =
    identifier.trim().toLowerCase() === account.username.toLowerCase() ||
    identifier.trim().toLowerCase() === account.email.toLowerCase();
  if (!matchesIdentifier) return false;
  const actual = Buffer.from(hashPassword(password, account.salt), "hex");
  const expected = Buffer.from(account.passwordHash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function getLoginRateLimit(identifier: string) {
  const key = identifier.trim().toLowerCase();
  const state = loginAttempts.get(key);
  if (!state) return 0;
  const now = Date.now();
  if (state.blockedUntil > now) return Math.ceil((state.blockedUntil - now) / 1000);
  if (now - state.windowStartedAt > 15 * 60 * 1000) loginAttempts.delete(key);
  return 0;
}

export function recordLoginFailure(identifier: string) {
  const key = identifier.trim().toLowerCase();
  const now = Date.now();
  const state = loginAttempts.get(key);
  if (!state || now - state.windowStartedAt > 15 * 60 * 1000) {
    loginAttempts.set(key, { count: 1, windowStartedAt: now, blockedUntil: 0 });
    return;
  }
  const count = state.count + 1;
  loginAttempts.set(key, {
    count,
    windowStartedAt: state.windowStartedAt,
    blockedUntil: count >= 5 ? now + 15 * 60 * 1000 : 0,
  });
}

export function clearLoginFailures(identifier: string) {
  loginAttempts.delete(identifier.trim().toLowerCase());
}

export function updateAdminCredentials(input: {
  username?: string;
  email?: string;
  password?: string;
}) {
  const account = readAdminAccount();
  if (!account) throw new Error("Admin account is not configured.");
  if (input.username !== undefined) account.username = input.username.trim();
  if (input.email !== undefined) account.email = input.email.trim().toLowerCase();
  if (input.password !== undefined) {
    account.salt = randomBytes(32).toString("hex");
    account.passwordHash = hashPassword(input.password, account.salt);
  }
  writeJsonFile(ACCOUNT_FILE, account);
  return { username: account.username, email: account.email };
}

export function createEmailVerificationCode(targetEmail: string) {
  const now = Date.now();
  let state: VerificationState;
  try {
    state = JSON.parse(readFileSync(VERIFICATION_FILE, "utf8")) as VerificationState;
  } catch {
    state = { codeHash: "", salt: "", expiresAt: 0, attemptsLeft: 0, sentAt: [] };
  }

  const recentSends = state.sentAt.filter((sentAt) => now - sentAt < 15 * 60 * 1000);
  const lastSentAt = recentSends[recentSends.length - 1];
  if (lastSentAt && now - lastSentAt < 60 * 1000) {
    return { error: "Please wait a minute before requesting another code." };
  }
  if (recentSends.length >= 5) {
    return { error: "Too many verification codes requested. Try again in 15 minutes." };
  }

  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  const salt = randomBytes(24).toString("hex");
  writeJsonFile(VERIFICATION_FILE, {
    codeHash: createHash("sha256").update(`${salt}:${code}`).digest("hex"),
    salt,
    expiresAt: now + 10 * 60 * 1000,
    attemptsLeft: 5,
    sentAt: [...recentSends, now],
    targetEmail: targetEmail.toLowerCase(),
  } satisfies VerificationState);
  return { code };
}

export function verifyEmailCode(code: string, targetEmail: string) {
  let state: VerificationState;
  try {
    state = JSON.parse(readFileSync(VERIFICATION_FILE, "utf8")) as VerificationState;
  } catch {
    return false;
  }
  if (state.expiresAt < Date.now() || state.attemptsLeft <= 0) {
    writeJsonFile(VERIFICATION_FILE, { ...state, codeHash: "", attemptsLeft: 0 });
    return false;
  }
  if (state.targetEmail !== targetEmail.toLowerCase()) return false;

  const submitted = createHash("sha256").update(`${state.salt}:${code}`).digest();
  const expected = Buffer.from(state.codeHash, "hex");
  const matches = submitted.length === expected.length && timingSafeEqual(submitted, expected);
  if (matches) {
    writeJsonFile(VERIFICATION_FILE, { ...state, codeHash: "", attemptsLeft: 0 });
    return true;
  }
  writeJsonFile(VERIFICATION_FILE, { ...state, attemptsLeft: state.attemptsLeft - 1 });
  return false;
}

export function createSession(role = "Super Admin") {
  const token = randomBytes(32).toString("hex");
  sessions.set(token, { role, expires: Date.now() + 1000 * 60 * 60 * 8 });
  return token;
}

export function invalidateAdminSessions() {
  sessions.clear();
}

export function getSession(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(/(?:^|;\s*)admin_session=([^;]+)/);
  if (!match) return null;
  const session = sessions.get(match[1]);
  if (!session || session.expires < Date.now()) {
    if (session) sessions.delete(match[1]);
    return null;
  }
  return session;
}

export function hashResetToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

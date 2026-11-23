import { createFileRoute } from "@tanstack/react-router";
import { isAdminEmailConfigured, sendAdminVerificationEmail } from "@/lib/admin-email";
import {
  createEmailVerificationCode,
  getAdminAccountSummary,
  getSession,
  invalidateAdminSessions,
  updateAdminCredentials,
  verifyAdminCredentials,
  verifyEmailCode,
} from "@/lib/admin-auth";

export const Route = createFileRoute("/api/admin/account")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!getSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
        return Response.json(getAdminAccountSummary());
      },
      POST: async ({ request }) => {
        if (!getSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
        const body = (await request.json()) as {
          action?: "send-code" | "update";
          currentPassword?: string;
          code?: string;
          username?: string;
          email?: string;
          newPassword?: string;
          newEmail?: string;
        };
        const account = getAdminAccountSummary();
        if (!account)
          return Response.json({ error: "Admin account is not configured." }, { status: 503 });

        if (body.action === "send-code") {
          if (
            !body.currentPassword ||
            !verifyAdminCredentials(account.username, body.currentPassword)
          ) {
            return Response.json({ error: "Current password is incorrect." }, { status: 401 });
          }
          const recipient = body.newEmail?.trim().toLowerCase() || account.email;
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
            return Response.json(
              { error: "Enter a valid recovery email address." },
              { status: 400 },
            );
          }
          if (!isAdminEmailConfigured()) {
            return Response.json(
              {
                error:
                  "Gmail delivery is not configured. Add SMTP_USER and SMTP_APP_PASSWORD on the server.",
              },
              { status: 503 },
            );
          }
          const verification = createEmailVerificationCode(recipient);
          if (verification.error)
            return Response.json({ error: verification.error }, { status: 429 });

          try {
            await sendAdminVerificationEmail(recipient, verification.code, "account change");
          } catch (error) {
            console.error("Unable to send admin verification email.", error);
            const message =
              error instanceof Error
                ? error.message
                : "Gmail could not send the verification email.";
            const status = message.startsWith("Gmail delivery is not configured") ? 503 : 502;
            return Response.json({ error: message }, { status });
          }
          return Response.json({ sent: true, recipient });
        }

        if (body.action === "update") {
          const username = body.username?.trim();
          const email = body.email?.trim().toLowerCase();
          const newPassword = body.newPassword;
          if (!body.code || (!username && !email && !newPassword)) {
            return Response.json(
              { error: "Enter a verification code and at least one account change." },
              { status: 400 },
            );
          }
          if (username && !/^[a-zA-Z0-9._-]{3,32}$/.test(username)) {
            return Response.json(
              {
                error:
                  "Username must be 3–32 characters using letters, numbers, dots, underscores or hyphens.",
              },
              { status: 400 },
            );
          }
          if (newPassword && newPassword.length < 12) {
            return Response.json(
              { error: "New password must be at least 12 characters." },
              { status: 400 },
            );
          }
          if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return Response.json({ error: "Enter a valid email address." }, { status: 400 });
          }
          const verifiedAddress = body.email?.trim().toLowerCase() || account.email;
          if (!verifyEmailCode(body.code, verifiedAddress)) {
            return Response.json(
              { error: "Verification code is invalid, expired or already used." },
              { status: 400 },
            );
          }
          try {
            const updated = updateAdminCredentials({ username, email, password: newPassword });
            if (newPassword) invalidateAdminSessions();
            return Response.json(updated);
          } catch (error) {
            console.error("Unable to update admin credentials.", error);
            return Response.json({ error: "Unable to update the admin account." }, { status: 500 });
          }
        }
        return Response.json({ error: "Unsupported account action." }, { status: 400 });
      },
    },
  },
});

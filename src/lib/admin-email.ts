import { createTransport } from "nodemailer";

export function isAdminEmailConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_APP_PASSWORD);
}

export async function sendAdminVerificationEmail(recipient: string, code: string, purpose: string) {
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_APP_PASSWORD;
  if (!isAdminEmailConfigured() || !user || !password) {
    throw new Error(
      "Gmail delivery is not configured. Add SMTP_USER and SMTP_APP_PASSWORD on the server.",
    );
  }

  const transport = createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: (process.env.SMTP_SECURE || "true") === "true",
    auth: { user, pass: password.replace(/\s+/g, "") },
  });
  try {
    await transport.sendMail({
      from: process.env.SMTP_FROM || user,
      to: recipient,
      subject: `Reinvent Energies admin ${purpose} code`,
      text: `Your verification code is ${code}. It expires in 10 minutes. If you did not request this, ignore this email.`,
      html: `<p>Your Reinvent Energies admin verification code is:</p><p style="font-size:28px;font-weight:bold;letter-spacing:8px">${code}</p><p>It expires in 10 minutes. If you did not request this, ignore this email.</p>`,
    });
  } finally {
    transport.close();
  }
}

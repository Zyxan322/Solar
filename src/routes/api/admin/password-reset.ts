import { createFileRoute } from "@tanstack/react-router";
import {
  createEmailVerificationCode,
  getAdminAccountSummary,
  invalidateAdminSessions,
  updateAdminCredentials,
  verifyEmailCode,
} from "@/lib/admin-auth";
import { isAdminEmailConfigured, sendAdminVerificationEmail } from "@/lib/admin-email";

export const Route = createFileRoute("/api/admin/password-reset")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as {
          action?: "request-code" | "reset";
          email?: string;
          code?: string;
          newPassword?: string;
        };
        const email = body.email?.trim().toLowerCase() || "";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return Response.json({ error: "Enter a valid email address." }, { status: 400 });
        }
        const account = getAdminAccountSummary();

        if (body.action === "request-code") {
          if (!account || account.email.toLowerCase() !== email) {
            return Response.json({ sent: true });
          }
          if (!isAdminEmailConfigured()) {
            return Response.json(
              { error: "Gmail delivery is not configured on the server." },
              { status: 503 },
            );
          }
          const verification = createEmailVerificationCode(email);
          if (verification.error)
            return Response.json({ error: verification.error }, { status: 429 });
          try {
            await sendAdminVerificationEmail(email, verification.code, "password reset");
          } catch (error) {
            console.error("Unable to send admin password reset email.", error);
            return Response.json(
              { error: "Gmail could not send the reset code. Check server SMTP settings." },
              { status: 502 },
            );
          }
          return Response.json({ sent: true });
        }

        if (body.action === "reset") {
          if (!account || account.email.toLowerCase() !== email) {
            return Response.json(
              { error: "The reset request is invalid or expired." },
              { status: 400 },
            );
          }
          if (!body.code || !body.newPassword || body.newPassword.length < 12) {
            return Response.json(
              { error: "Enter the email code and a password of at least 12 characters." },
              { status: 400 },
            );
          }
          if (!verifyEmailCode(body.code, email)) {
            return Response.json(
              { error: "The reset code is invalid, expired or already used." },
              { status: 400 },
            );
          }
          try {
            updateAdminCredentials({ password: body.newPassword });
            invalidateAdminSessions();
            return Response.json({ reset: true });
          } catch (error) {
            console.error("Unable to reset admin password.", error);
            return Response.json({ error: "Unable to reset the admin password." }, { status: 500 });
          }
        }
        return Response.json({ error: "Unsupported password reset action." }, { status: 400 });
      },
    },
  },
});

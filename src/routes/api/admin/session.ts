import { createFileRoute } from "@tanstack/react-router";
import {
  clearLoginFailures,
  createSession,
  getLoginRateLimit,
  getSession,
  recordLoginFailure,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export const Route = createFileRoute("/api/admin/session")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const session = getSession(request);
        return Response.json({ authenticated: Boolean(session), role: session?.role });
      },
      POST: async ({ request }) => {
        const body = (await request.json()) as {
          identifier?: string;
          email?: string;
          password?: string;
        };
        const identifier = body.identifier || body.email;
        if (!identifier || !body.password) {
          return Response.json(
            { error: "Username/email and password are required." },
            { status: 400 },
          );
        }
        const retryAfter = getLoginRateLimit(identifier);
        if (retryAfter > 0) {
          return Response.json(
            { error: "Too many sign-in attempts. Try again later." },
            { status: 429, headers: { "retry-after": String(retryAfter) } },
          );
        }
        if (!verifyAdminCredentials(identifier, body.password)) {
          recordLoginFailure(identifier);
          return Response.json({ error: "Invalid credentials." }, { status: 401 });
        }
        clearLoginFailures(identifier);
        const token = createSession();
        const secureCookie = new URL(request.url).protocol === "https:" ? "; Secure" : "";
        return new Response(JSON.stringify({ authenticated: true }), {
          status: 200,
          headers: {
            "content-type": "application/json",
            "set-cookie": `admin_session=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800${secureCookie}`,
          },
        });
      },
      DELETE: async () =>
        new Response(null, {
          status: 204,
          headers: { "set-cookie": "admin_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0" },
        }),
    },
  },
});

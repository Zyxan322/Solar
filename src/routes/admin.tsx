import { createFileRoute } from "@tanstack/react-router";
import { AdminApp } from "@/components/admin/admin-app";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin Dashboard | Reinvent Energies" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

function AdminPage() {
  return <AdminApp />;
}

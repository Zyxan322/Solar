import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  BarChart3,
  Boxes,
  ChevronRight,
  Eye,
  EyeOff,
  LayoutDashboard,
  LogOut,
  Menu,
  PackagePlus,
  Search,
  Settings,
  ShoppingBag,
  SlidersHorizontal,
  Tags,
  Upload,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import logoImage from "@/assets/logo.jpg";

type Product = {
  id: string;
  name: string;
  categoryId: string;
  brandId?: string;
  model?: string;
  sku?: string;
  summary: string;
  specs: string[];
  specifications: Record<string, string>;
  price?: number;
  currency: string;
  contactForPrice: boolean;
  showPrice: boolean;
  status: "published" | "draft";
  featured: boolean;
  stock: number;
  lowStock: number;
  alt: string;
  image: string;
};

type CatalogBrand = {
  id: string;
  name: string;
  status: "active" | "draft";
  logo?: string;
  website?: string;
};
type CatalogCategory = { id: string; label: string; status: "active" | "draft" };
type SiteSettings = {
  companyName: string;
  tagline: string;
  phone: string;
  additionalPhone: string;
  whatsapp: string;
  email: string;
  address: string;
  headOfficeAddress: string;
  logo: string;
  currency: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  seoTitle: string;
  seoDescription: string;
};
type AdminAccount = { username: string; email: string };

const emptyProduct: Partial<Product> = {
  name: "",
  categoryId: "solar-panels",
  summary: "",
  specs: [],
  specifications: {},
  price: undefined,
  currency: "PKR",
  contactForPrice: false,
  showPrice: true,
  status: "draft",
  featured: false,
  stock: 0,
  lowStock: 5,
  alt: "",
};

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: ShoppingBag },
  { id: "categories", label: "Categories", icon: Tags },
  { id: "inventory", label: "Inventory", icon: Boxes },
  { id: "brands", label: "Brands", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export function AdminApp() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "forgot" | "reset">("login");
  const [resetCode, setResetCode] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [resetConfirm, setResetConfirm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editor, setEditor] = useState<Partial<Product> | null>(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [brands, setBrands] = useState<CatalogBrand[]>([]);
  const [categories, setCategories] = useState<CatalogCategory[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [account, setAccount] = useState<AdminAccount | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [accountBusy, setAccountBusy] = useState(false);

  const refreshCatalog = () => {
    fetch("/api/admin/catalog")
      .then((response) => (response.ok ? response.json() : null))
      .then(
        (
          data: {
            brands: CatalogBrand[];
            categories: CatalogCategory[];
            settings: SiteSettings;
          } | null,
        ) => {
          if (!data) return;
          setBrands(data.brands);
          setCategories(data.categories);
          setSettings(data.settings);
        },
      );
  };

  useEffect(() => {
    fetch("/api/admin/session")
      .then((response) => response.json())
      .then((data: { authenticated: boolean }) => setAuthenticated(data.authenticated))
      .catch(() => setAuthenticated(false));
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    refreshCatalog();
    fetch("/api/admin/account")
      .then((response) =>
        response.ok ? response.json() : Promise.reject(new Error("Unable to load admin account")),
      )
      .then((data: AdminAccount) => {
        setAccount(data);
        setNewUsername(data.username);
        setNewEmail(data.email);
      })
      .catch((error: Error) => toast.error(error.message));
    fetch("/api/admin/products")
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load products");
        return response.json();
      })
      .then((data: Product[]) => setProducts(data))
      .catch((error) => toast.error(error.message));
  }, [authenticated]);

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setLoggingIn(true);
    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ identifier: email, password }),
      });
      if (!response.ok) {
        const body = await response.json();
        toast.error(body.error || "Login failed");
        return;
      }
      setAuthenticated(true);
      toast.success("Welcome to the admin dashboard");
    } catch {
      toast.error("Could not reach the server to sign in.");
    } finally {
      setLoggingIn(false);
    }
  };

  const requestPasswordReset = async (event: FormEvent) => {
    event.preventDefault();
    setLoggingIn(true);
    try {
      const response = await fetch("/api/admin/password-reset", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "request-code", email }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        toast.error(result.error || "Unable to request password reset.");
        return;
      }
      setAuthMode("reset");
      toast.success("If that email is registered, a reset code has been sent.");
    } catch {
      toast.error("Could not reach the server to request a reset code.");
    } finally {
      setLoggingIn(false);
    }
  };

  const resetAdminPassword = async (event: FormEvent) => {
    event.preventDefault();
    if (resetPassword !== resetConfirm) {
      toast.error("New password and confirmation do not match.");
      return;
    }
    if (resetPassword.length < 12) {
      toast.error("New password must be at least 12 characters.");
      return;
    }
    setLoggingIn(true);
    try {
      const response = await fetch("/api/admin/password-reset", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "reset",
          email,
          code: resetCode,
          newPassword: resetPassword,
        }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        toast.error(result.error || "Unable to reset password.");
        return;
      }
      setPassword("");
      setResetCode("");
      setResetPassword("");
      setResetConfirm("");
      setAuthMode("login");
      toast.success("Password reset. Sign in with your new password.");
    } catch {
      toast.error("Could not reach the server to reset your password.");
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/session", { method: "DELETE" });
    setAuthenticated(false);
  };

  const sendAccountCode = async (event: FormEvent) => {
    event.preventDefault();
    setAccountBusy(true);
    try {
      const response = await fetch("/api/admin/account", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "send-code",
          currentPassword,
          newEmail:
            newEmail.trim() && newEmail.trim().toLowerCase() !== account?.email.toLowerCase()
              ? newEmail.trim()
              : undefined,
        }),
      });
      const result = (await response.json()) as { error?: string; recipient?: string };
      if (!response.ok) {
        toast.error(result.error || "Could not send verification code");
        return;
      }
      setCodeSent(true);
      toast.success(`Verification code sent to ${result.recipient}`);
    } catch {
      toast.error("Could not reach the server to send a verification code.");
    } finally {
      setAccountBusy(false);
    }
  };

  const changeAdminAccount = async (event: FormEvent) => {
    event.preventDefault();
    if (!account) return;
    if (newPassword && newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }
    if (newPassword && newPassword.length < 12) {
      toast.error("New password must be at least 12 characters.");
      return;
    }
    if (newUsername.trim() === account.username && !newPassword) {
      toast.error("Enter a new username or password.");
      return;
    }
    setAccountBusy(true);
    try {
      const response = await fetch("/api/admin/account", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "update",
          code: emailCode,
          username: newUsername.trim() === account.username ? undefined : newUsername.trim(),
          email:
            newEmail.trim().toLowerCase() === account.email.toLowerCase()
              ? undefined
              : newEmail.trim(),
          newPassword: newPassword || undefined,
        }),
      });
      const result = (await response.json()) as AdminAccount & { error?: string };
      if (!response.ok) {
        toast.error(result.error || "Could not update account");
        return;
      }
      setAccount(result);
      setNewUsername(result.username);
      setNewEmail(result.email);
      setEmail(result.username);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setEmailCode("");
      setCodeSent(false);
      if (newPassword) setAuthenticated(false);
      toast.success("Admin account updated. Use the new credentials next time you sign in.");
    } catch {
      toast.error("Could not reach the server to update the admin account.");
    } finally {
      setAccountBusy(false);
    }
  };

  const saveProduct = async (event: FormEvent) => {
    event.preventDefault();
    if (!editor) return;
    const existing = Boolean(editor.id);
    const response = await fetch(
      existing ? `/api/admin/products/${editor.id}` : "/api/admin/products",
      {
        method: existing ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(editor),
      },
    );
    if (!response.ok) {
      toast.error("Unable to save product");
      return;
    }
    const saved = (await response.json()) as Product;
    setProducts((current) =>
      existing
        ? current.map((product) => (product.id === saved.id ? saved : product))
        : [saved, ...current],
    );
    setEditor(null);
    toast.success(existing ? "Product updated" : "Product created");
  };

  const deleteProduct = async (id: string) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    const response = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (response.ok) {
      setProducts((current) => current.filter((product) => product.id !== id));
      toast.success("Product deleted");
    }
  };

  const bulkAction = async (changes: Record<string, unknown>) => {
    if (!selected.size) return;
    const response = await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ids: [...selected], changes }),
    });
    if (!response.ok) return toast.error("Bulk update failed");
    setProducts((current) =>
      current.map((product) =>
        selected.has(product.id) ? ({ ...product, ...changes } as Product) : product,
      ),
    );
    setSelected(new Set());
    toast.success("Selected products updated");
  };

  const saveCatalog = async (
    nextBrands = brands,
    nextCategories = categories,
    nextSettings = settings,
  ) => {
    const response = await fetch("/api/admin/catalog", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        brands: nextBrands,
        categories: nextCategories,
        settings: nextSettings,
      }),
    });
    if (!response.ok) return false;
    const data = (await response.json()) as {
      brands: CatalogBrand[];
      categories: CatalogCategory[];
      settings: SiteSettings;
    };
    setBrands(data.brands);
    setCategories(data.categories);
    setSettings(data.settings);
    return true;
  };

  const updateInventory = async (productId: string, stock: number) => {
    const response = await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ids: [productId], changes: { stock } }),
    });
    if (response.ok) toast.success("Inventory updated");
  };

  const exportCsv = () => {
    const header = [
      "id",
      "name",
      "categoryId",
      "brandId",
      "model",
      "sku",
      "price",
      "stock",
      "status",
    ];
    const rows = products.map((product) =>
      header
        .map((key) => JSON.stringify((product as unknown as Record<string, unknown>)[key] ?? ""))
        .join(","),
    );
    const blob = new Blob([[header.join(","), ...rows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "reinvent-energies-products.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const visibleProducts = useMemo(
    () => products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())),
    [products, search],
  );
  const published = products.filter((product) => product.status === "published").length;
  const drafts = products.length - published;
  const outOfStock = products.filter((product) => product.stock <= 0).length;

  if (authenticated === null) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,#064e3b_0,#020617_42%,#020617_100%)] px-4">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/90 p-7 text-white shadow-2xl sm:p-9">
          <img
            src={logoImage}
            alt="Reinvent Energies"
            className="mx-auto h-16 w-16 rounded-2xl bg-white object-contain p-1"
          />
          <p className="mt-6 text-center text-xs font-bold tracking-[0.24em] text-emerald-400">
            REINVENT ENERGIES
          </p>
          <h1 className="mt-2 text-center text-2xl font-semibold">
            {authMode === "login"
              ? "Admin sign in"
              : authMode === "forgot"
                ? "Forgot password"
                : "Reset password"}
          </h1>
          <form
            onSubmit={
              authMode === "login"
                ? login
                : authMode === "forgot"
                  ? requestPasswordReset
                  : resetAdminPassword
            }
            className="mt-8 space-y-4"
          >
            <label className="block text-sm font-medium text-slate-300">
              {authMode === "login" ? "Username or email" : "Admin email"}
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type={authMode === "login" ? "text" : "email"}
                autoComplete={authMode === "login" ? "username" : "email"}
                required
                readOnly={authMode === "reset"}
                className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none focus:border-emerald-500 read-only:opacity-70"
              />
            </label>
            {authMode === "login" ? (
              <label className="block text-sm font-medium text-slate-300">
                Password
                <div className="mt-2 flex rounded-xl border border-white/10 bg-white/5 focus-within:border-emerald-500">
                  <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="h-12 min-w-0 flex-1 bg-transparent px-4 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="px-3 text-slate-400"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </label>
            ) : null}
            {authMode === "reset" ? (
              <>
                <label className="block text-sm font-medium text-slate-300">
                  Email code
                  <input
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    required
                    value={resetCode}
                    onChange={(event) =>
                      setResetCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 tracking-[0.3em] text-white outline-none focus:border-emerald-500"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-300">
                  New password (minimum 12 characters)
                  <input
                    type="password"
                    autoComplete="new-password"
                    minLength={12}
                    required
                    value={resetPassword}
                    onChange={(event) => setResetPassword(event.target.value)}
                    className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none focus:border-emerald-500"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-300">
                  Confirm new password
                  <input
                    type="password"
                    autoComplete="new-password"
                    minLength={12}
                    required
                    value={resetConfirm}
                    onChange={(event) => setResetConfirm(event.target.value)}
                    className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none focus:border-emerald-500"
                  />
                </label>
              </>
            ) : null}
            <button
              disabled={loggingIn}
              className="h-12 w-full rounded-xl bg-emerald-600 font-semibold hover:bg-emerald-500 disabled:opacity-60"
            >
              {loggingIn
                ? "Please wait..."
                : authMode === "login"
                  ? "Sign in"
                  : authMode === "forgot"
                    ? "Send reset code"
                    : "Reset password"}
            </button>
            {authMode === "login" ? (
              <button
                type="button"
                onClick={() => setAuthMode("forgot")}
                className="w-full text-sm text-emerald-300 hover:text-white"
              >
                Forgot password?
              </button>
            ) : null}
            {authMode !== "login" ? (
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className="w-full text-sm text-emerald-300 hover:text-white"
              >
                Back to sign in
              </button>
            ) : null}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {sidebarOpen ? (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-950 text-white transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-20 items-center gap-3 px-5">
          <img
            src={logoImage}
            alt="Reinvent Energies"
            className="h-11 w-11 rounded-xl bg-white object-contain p-1"
          />
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-emerald-400">REINVENT</p>
            <p className="text-sm font-semibold">Administration</p>
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  setSidebarOpen(false);
                }}
                className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium transition ${active === item.id ? "bg-emerald-600 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <button
          onClick={logout}
          className="m-3 flex h-11 items-center gap-3 rounded-xl px-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-7">
          <button
            className="grid h-10 w-10 place-items-center rounded-lg border lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="text-xs text-slate-500">Reinvent Energies</p>
            <h1 className="text-lg font-semibold">
              {navItems.find((item) => item.id === active)?.label}
            </h1>
          </div>
          <button
            onClick={() => setEditor(emptyProduct)}
            className="ml-auto inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-700 px-3 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            <PackagePlus className="h-4 w-4" />
            <span className="hidden sm:inline">Add product</span>
          </button>
        </header>

        <main className="p-4 sm:p-7">
          {active === "dashboard" ? (
            <>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Total products", products.length, "Catalog"],
                  ["Published", published, "Live"],
                  ["Drafts", drafts, "Needs review"],
                  ["Out of stock", outOfStock, "Action required"],
                ].map(([label, value, note]) => (
                  <div
                    key={String(label)}
                    className="rounded-2xl border border-slate-200 bg-white p-5"
                  >
                    <p className="text-sm text-slate-500">{label}</p>
                    <div className="mt-2 flex items-end justify-between">
                      <strong className="text-3xl">{value}</strong>
                      <span className="text-xs text-emerald-700">{note}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold">Recently added</h2>
                    <button
                      onClick={() => setActive("products")}
                      className="text-sm font-medium text-emerald-700"
                    >
                      View all
                    </button>
                  </div>
                  <div className="mt-4 divide-y">
                    {products.slice(0, 6).map((product) => (
                      <button
                        key={product.id}
                        onClick={() => setEditor(product)}
                        className="flex w-full items-center gap-3 py-3 text-left"
                      >
                        <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 text-xs font-bold text-emerald-800">
                          {product.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-slate-500">{product.categoryId}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h2 className="font-semibold">Quick actions</h2>
                  <div className="mt-4 grid gap-2">
                    <button
                      onClick={() => setEditor(emptyProduct)}
                      className="flex h-12 items-center gap-3 rounded-xl border px-4 text-sm font-medium hover:border-emerald-300"
                    >
                      <PackagePlus className="h-4 w-4 text-emerald-700" />
                      Add product
                    </button>
                    <button
                      onClick={exportCsv}
                      className="flex h-12 items-center gap-3 rounded-xl border px-4 text-sm font-medium hover:border-emerald-300"
                    >
                      <Upload className="h-4 w-4 text-emerald-700" />
                      Export CSV
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {active === "products" || active === "inventory" ? (
            <section className="rounded-2xl border border-slate-200 bg-white">
              <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center">
                <div className="flex h-10 flex-1 items-center gap-2 rounded-lg border px-3 sm:max-w-sm">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search products"
                    className="min-w-0 flex-1 text-sm outline-none"
                  />
                </div>
                {selected.size ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => bulkAction({ status: "published" })}
                      className="h-9 rounded-lg border px-3 text-xs font-semibold"
                    >
                      Publish
                    </button>
                    <button
                      onClick={() => bulkAction({ status: "draft" })}
                      className="h-9 rounded-lg border px-3 text-xs font-semibold"
                    >
                      Unpublish
                    </button>
                  </div>
                ) : null}
                <button
                  onClick={exportCsv}
                  className="ml-auto h-10 rounded-lg border px-3 text-xs font-semibold"
                >
                  <Upload className="mr-2 inline h-4 w-4" />
                  Export
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs text-slate-500">
                    <tr>
                      <th className="px-4 py-3">
                        <input
                          type="checkbox"
                          onChange={(event) =>
                            setSelected(
                              event.target.checked
                                ? new Set(visibleProducts.map((product) => product.id))
                                : new Set(),
                            )
                          }
                        />
                      </th>
                      <th className="px-2 py-3">Product</th>
                      <th className="px-3 py-3">Category</th>
                      <th className="px-3 py-3">Price</th>
                      <th className="px-3 py-3">Stock</th>
                      <th className="px-3 py-3">Status</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {visibleProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selected.has(product.id)}
                            onChange={(event) =>
                              setSelected((current) => {
                                const next = new Set(current);
                                if (event.target.checked) next.add(product.id);
                                else next.delete(product.id);
                                return next;
                              })
                            }
                          />
                        </td>
                        <td className="px-2 py-3">
                          <button
                            onClick={() => setEditor(product)}
                            className="max-w-[260px] truncate font-medium hover:text-emerald-700"
                          >
                            {product.name}
                          </button>
                          <p className="text-xs text-slate-500">
                            {product.sku || product.model || product.id}
                          </p>
                        </td>
                        <td className="px-3 py-3 text-slate-600">
                          {categories.find((category) => category.id === product.categoryId)
                            ?.label || product.categoryId}
                        </td>
                        <td className="px-3 py-3">
                          {product.price
                            ? `${product.currency} ${product.price.toLocaleString("en-PK")}`
                            : "On request"}
                        </td>
                        <td className="px-3 py-3">
                          {active === "inventory" ? (
                            <input
                              type="number"
                              value={product.stock}
                              onChange={(event) => {
                                const stock = Number(event.target.value);
                                setProducts((current) =>
                                  current.map((entry) =>
                                    entry.id === product.id ? { ...entry, stock } : entry,
                                  ),
                                );
                              }}
                              onBlur={() => updateInventory(product.id, product.stock)}
                              className="h-9 w-20 rounded-lg border px-2"
                            />
                          ) : (
                            product.stock
                          )}
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${product.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setEditor(product)}
                            className="text-xs font-semibold text-emerald-700"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}

          {active === "categories" ? (
            <section className="rounded-2xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b p-5">
                <div>
                  <h2 className="font-semibold">Product categories</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Changes appear on public category navigation and filters.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const label = window.prompt("Category name");
                    if (!label?.trim()) return;
                    const id = label
                      .toLowerCase()
                      .trim()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-|-$/g, "");
                    const next = [
                      ...categories,
                      { id, label: label.trim(), status: "active" as const },
                    ];
                    saveCatalog(brands, next, settings).then(
                      (ok) => ok && toast.success("Category added"),
                    );
                  }}
                  className="h-10 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white"
                >
                  Add category
                </button>
              </div>
              <div className="divide-y">
                {categories.map((category) => (
                  <div key={category.id} className="flex flex-wrap items-center gap-3 p-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{category.label}</p>
                      <p className="text-xs text-slate-500">{category.id}</p>
                    </div>
                    <button
                      onClick={() => {
                        const label = window.prompt("Category name", category.label)?.trim();
                        if (!label) return;
                        const next = categories.map((entry) =>
                          entry.id === category.id ? { ...entry, label } : entry,
                        );
                        saveCatalog(brands, next, settings).then(
                          (ok) => ok && toast.success("Category updated"),
                        );
                      }}
                      className="h-9 rounded-lg border px-3 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <select
                      value={category.status}
                      onChange={(event) => {
                        const next = categories.map((entry) =>
                          entry.id === category.id
                            ? { ...entry, status: event.target.value as "active" | "draft" }
                            : entry,
                        );
                        saveCatalog(brands, next, settings).then(
                          (ok) => ok && toast.success("Category updated"),
                        );
                      }}
                      className="h-9 rounded-lg border px-3 text-sm"
                    >
                      <option value="active">Active</option>
                      <option value="draft">Hidden</option>
                    </select>
                    <button
                      onClick={() => {
                        if (!window.confirm(`Delete ${category.label}?`)) return;
                        const next = categories.filter((entry) => entry.id !== category.id);
                        saveCatalog(brands, next, settings).then(
                          (ok) => ok && toast.success("Category deleted"),
                        );
                      }}
                      className="h-9 rounded-lg border border-red-200 px-3 text-sm font-medium text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {active === "brands" ? (
            <section className="rounded-2xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b p-5">
                <div>
                  <h2 className="font-semibold">Brands</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Manage the product brand dropdown and public brand filters.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const name = window.prompt("Brand name");
                    if (!name?.trim()) return;
                    const id = name
                      .toLowerCase()
                      .trim()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-|-$/g, "");
                    const next = [...brands, { id, name: name.trim(), status: "active" as const }];
                    saveCatalog(next, categories, settings).then(
                      (ok) => ok && toast.success("Brand added"),
                    );
                  }}
                  className="h-10 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white"
                >
                  Add brand
                </button>
              </div>
              <div className="grid gap-3 p-4 md:grid-cols-2">
                {brands.map((brand) => (
                  <div key={brand.id} className="rounded-xl border p-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-lg bg-slate-100 text-sm font-bold text-emerald-800">
                        {brand.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{brand.name}</p>
                        <p className="truncate text-xs text-slate-500">
                          {brand.website || brand.id}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => {
                          const name = window.prompt("Brand name", brand.name)?.trim();
                          if (!name) return;
                          const website = window
                            .prompt("Brand website", brand.website || "")
                            ?.trim();
                          const next = brands.map((entry) =>
                            entry.id === brand.id
                              ? { ...entry, name, website: website || undefined }
                              : entry,
                          );
                          saveCatalog(next, categories, settings).then(
                            (ok) => ok && toast.success("Brand updated"),
                          );
                        }}
                        className="h-9 flex-1 rounded-lg border text-sm font-medium"
                      >
                        Edit
                      </button>
                      <select
                        value={brand.status}
                        onChange={(event) => {
                          const next = brands.map((entry) =>
                            entry.id === brand.id
                              ? { ...entry, status: event.target.value as "active" | "draft" }
                              : entry,
                          );
                          saveCatalog(next, categories, settings).then(
                            (ok) => ok && toast.success("Brand status updated"),
                          );
                        }}
                        className="h-9 flex-1 rounded-lg border px-2 text-sm"
                      >
                        <option value="active">Active</option>
                        <option value="draft">Hidden</option>
                      </select>
                      <button
                        onClick={() => {
                          if (!window.confirm(`Delete ${brand.name}?`)) return;
                          const next = brands.filter((entry) => entry.id !== brand.id);
                          saveCatalog(next, categories, settings).then(
                            (ok) => ok && toast.success("Brand deleted"),
                          );
                        }}
                        className="h-9 rounded-lg border border-red-200 px-3 text-sm font-medium text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {active === "analytics" ? (
            <section className="grid gap-4 md:grid-cols-3">
              {[
                [
                  "Published products",
                  products.filter((product) => product.status === "published").length,
                ],
                [
                  "Category count",
                  categories.filter((category) => category.status === "active").length,
                ],
                ["Brand count", brands.filter((brand) => brand.status === "active").length],
              ].map(([label, value]) => (
                <div
                  key={String(label)}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <p className="text-sm text-slate-500">{label}</p>
                  <strong className="mt-2 block text-3xl">{value}</strong>
                </div>
              ))}
            </section>
          ) : null}

          {active === "settings" && settings ? (
            <div className="space-y-5">
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (await saveCatalog(brands, categories, settings))
                    toast.success("Website settings saved");
                  else toast.error("Unable to save settings");
                }}
                className="space-y-5"
              >
                <section className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h2 className="font-semibold">Company identity</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <label className="text-sm font-medium">
                      Company name
                      <input
                        value={settings.companyName}
                        onChange={(event) =>
                          setSettings({ ...settings, companyName: event.target.value })
                        }
                        className="mt-2 h-11 w-full rounded-lg border px-3"
                      />
                    </label>
                    <label className="text-sm font-medium">
                      Tagline
                      <input
                        value={settings.tagline}
                        onChange={(event) =>
                          setSettings({ ...settings, tagline: event.target.value })
                        }
                        className="mt-2 h-11 w-full rounded-lg border px-3"
                      />
                    </label>
                    <label className="sm:col-span-2 text-sm font-medium">
                      Website logo
                      <div className="mt-2 flex items-center gap-3 rounded-lg border p-3">
                        <img
                          src={logoImage}
                          alt="Current Reinvent Energies logo"
                          className="h-16 w-16 rounded-lg bg-white object-contain"
                        />
                        <div>
                          <p className="font-medium">Reinvent Energies logo</p>
                          <p className="text-xs text-slate-500">
                            The existing brand logo is active across the website.
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                </section>
                <section className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h2 className="font-semibold">Contact & address</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <label className="text-sm font-medium">
                      Primary phone
                      <input
                        value={settings.phone}
                        onChange={(event) =>
                          setSettings({ ...settings, phone: event.target.value })
                        }
                        className="mt-2 h-11 w-full rounded-lg border px-3"
                      />
                    </label>
                    <label className="text-sm font-medium">
                      Additional phone
                      <input
                        value={settings.additionalPhone}
                        onChange={(event) =>
                          setSettings({ ...settings, additionalPhone: event.target.value })
                        }
                        className="mt-2 h-11 w-full rounded-lg border px-3"
                      />
                    </label>
                    <label className="text-sm font-medium">
                      WhatsApp
                      <input
                        value={settings.whatsapp}
                        onChange={(event) =>
                          setSettings({ ...settings, whatsapp: event.target.value })
                        }
                        className="mt-2 h-11 w-full rounded-lg border px-3"
                      />
                    </label>
                    <label className="text-sm font-medium">
                      Business email
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(event) =>
                          setSettings({ ...settings, email: event.target.value })
                        }
                        className="mt-2 h-11 w-full rounded-lg border px-3"
                      />
                    </label>
                    <label className="text-sm font-medium sm:col-span-2">
                      Office address
                      <textarea
                        rows={2}
                        value={settings.address}
                        onChange={(event) =>
                          setSettings({ ...settings, address: event.target.value })
                        }
                        className="mt-2 w-full rounded-lg border px-3 py-2"
                      />
                    </label>
                    <label className="text-sm font-medium sm:col-span-2">
                      Head office address
                      <textarea
                        rows={2}
                        value={settings.headOfficeAddress}
                        onChange={(event) =>
                          setSettings({ ...settings, headOfficeAddress: event.target.value })
                        }
                        className="mt-2 w-full rounded-lg border px-3 py-2"
                      />
                    </label>
                  </div>
                </section>
                <section className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h2 className="font-semibold">Regional, SEO & social</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <label className="text-sm font-medium">
                      Default currency
                      <select
                        value={settings.currency}
                        onChange={(event) =>
                          setSettings({ ...settings, currency: event.target.value })
                        }
                        className="mt-2 h-11 w-full rounded-lg border px-3"
                      >
                        <option value="PKR">PKR</option>
                        <option value="USD">USD</option>
                      </select>
                    </label>
                    <label className="text-sm font-medium">
                      Facebook
                      <input
                        value={settings.facebook}
                        onChange={(event) =>
                          setSettings({ ...settings, facebook: event.target.value })
                        }
                        className="mt-2 h-11 w-full rounded-lg border px-3"
                      />
                    </label>
                    <label className="text-sm font-medium">
                      Instagram
                      <input
                        value={settings.instagram}
                        onChange={(event) =>
                          setSettings({ ...settings, instagram: event.target.value })
                        }
                        className="mt-2 h-11 w-full rounded-lg border px-3"
                      />
                    </label>
                    <label className="text-sm font-medium">
                      LinkedIn
                      <input
                        value={settings.linkedin}
                        onChange={(event) =>
                          setSettings({ ...settings, linkedin: event.target.value })
                        }
                        className="mt-2 h-11 w-full rounded-lg border px-3"
                      />
                    </label>
                    <label className="text-sm font-medium">
                      YouTube
                      <input
                        value={settings.youtube}
                        onChange={(event) =>
                          setSettings({ ...settings, youtube: event.target.value })
                        }
                        className="mt-2 h-11 w-full rounded-lg border px-3"
                      />
                    </label>
                    <label className="text-sm font-medium sm:col-span-2">
                      SEO title
                      <input
                        value={settings.seoTitle}
                        onChange={(event) =>
                          setSettings({ ...settings, seoTitle: event.target.value })
                        }
                        className="mt-2 h-11 w-full rounded-lg border px-3"
                      />
                    </label>
                    <label className="text-sm font-medium sm:col-span-2">
                      SEO description
                      <textarea
                        rows={3}
                        value={settings.seoDescription}
                        onChange={(event) =>
                          setSettings({ ...settings, seoDescription: event.target.value })
                        }
                        className="mt-2 w-full rounded-lg border px-3 py-2"
                      />
                    </label>
                  </div>
                </section>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="h-11 rounded-lg bg-emerald-700 px-5 text-sm font-semibold text-white"
                  >
                    Save website settings
                  </button>
                </div>
              </form>
              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h2 className="font-semibold">Admin account & security</h2>
                <p className="mt-1 text-sm text-slate-500">
                  A one-time code will be sent to your verified recovery email before account
                  changes are applied.
                </p>
                <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm">
                  <p>
                    <span className="font-medium">Current username:</span>{" "}
                    {account?.username || "Loading..."}
                  </p>
                  <p className="mt-1">
                    <span className="font-medium">Recovery email:</span>{" "}
                    {account?.email || "Loading..."}
                  </p>
                </div>
                <form
                  onSubmit={sendAccountCode}
                  className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end"
                >
                  <label className="text-sm font-medium sm:col-span-2">
                    New account email (leave unchanged to use the current recovery address)
                    <input
                      type="email"
                      required
                      value={newEmail}
                      onChange={(event) => setNewEmail(event.target.value)}
                      className="mt-2 h-11 w-full rounded-lg border px-3"
                    />
                  </label>
                  <label className="text-sm font-medium">
                    Current password
                    <input
                      type="password"
                      autoComplete="current-password"
                      required
                      value={currentPassword}
                      onChange={(event) => setCurrentPassword(event.target.value)}
                      className="mt-2 h-11 w-full rounded-lg border px-3"
                    />
                  </label>
                  <button
                    disabled={accountBusy || !account}
                    className="h-11 rounded-lg border border-emerald-700 px-4 text-sm font-semibold text-emerald-800 disabled:opacity-50"
                  >
                    {accountBusy ? "Please wait..." : "Send verification code"}
                  </button>
                </form>
                {codeSent ? (
                  <form
                    onSubmit={changeAdminAccount}
                    className="mt-5 grid gap-4 border-t pt-5 sm:grid-cols-2"
                  >
                    <label className="text-sm font-medium">
                      Email verification code
                      <input
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        pattern="[0-9]{6}"
                        required
                        value={emailCode}
                        onChange={(event) =>
                          setEmailCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        className="mt-2 h-11 w-full rounded-lg border px-3 tracking-[0.3em]"
                      />
                    </label>
                    <label className="text-sm font-medium">
                      New username
                      <input
                        autoComplete="username"
                        minLength={3}
                        maxLength={32}
                        value={newUsername}
                        onChange={(event) => setNewUsername(event.target.value)}
                        className="mt-2 h-11 w-full rounded-lg border px-3"
                      />
                    </label>
                    <label className="text-sm font-medium">
                      New account email
                      <input
                        type="email"
                        required
                        value={newEmail}
                        onChange={(event) => setNewEmail(event.target.value)}
                        className="mt-2 h-11 w-full rounded-lg border px-3"
                      />
                    </label>
                    <label className="text-sm font-medium">
                      New password (optional, min. 12 characters)
                      <input
                        type="password"
                        autoComplete="new-password"
                        minLength={12}
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        className="mt-2 h-11 w-full rounded-lg border px-3"
                      />
                    </label>
                    <label className="text-sm font-medium">
                      Confirm new password
                      <input
                        type="password"
                        autoComplete="new-password"
                        minLength={newPassword ? 12 : undefined}
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        className="mt-2 h-11 w-full rounded-lg border px-3"
                      />
                    </label>
                    <div className="sm:col-span-2">
                      <button
                        disabled={accountBusy}
                        type="submit"
                        className="h-11 rounded-lg bg-emerald-700 px-5 text-sm font-semibold text-white disabled:opacity-50"
                      >
                        {accountBusy ? "Updating..." : "Verify code & save account"}
                      </button>
                    </div>
                  </form>
                ) : null}
              </section>
            </div>
          ) : null}
        </main>
      </div>

      {editor ? (
        <div className="fixed inset-0 z-[70] flex justify-end bg-slate-950/45">
          <form
            onSubmit={saveProduct}
            className="h-full w-full max-w-2xl overflow-y-auto bg-white shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex h-16 items-center border-b bg-white px-5">
              <div>
                <p className="text-xs text-slate-500">
                  {editor.id ? "Edit product" : "New product"}
                </p>
                <h2 className="font-semibold">{editor.name || "Untitled"}</h2>
              </div>
              <button
                type="button"
                onClick={() => setEditor(null)}
                className="ml-auto grid h-9 w-9 place-items-center rounded-lg border"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-7 p-5 sm:p-7">
              <section className="grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2 text-sm font-medium">
                  Product name
                  <input
                    required
                    value={editor.name || ""}
                    onChange={(event) =>
                      setEditor({ ...editor, name: event.target.value, alt: event.target.value })
                    }
                    className="mt-2 h-11 w-full rounded-lg border px-3"
                  />
                </label>
                <label className="text-sm font-medium">
                  Category
                  <select
                    value={editor.categoryId || "solar-panels"}
                    onChange={(event) => setEditor({ ...editor, categoryId: event.target.value })}
                    className="mt-2 h-11 w-full rounded-lg border px-3"
                  >
                    {categories
                      .filter((category) => category.status === "active")
                      .map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                  </select>
                </label>
                <label className="text-sm font-medium">
                  Brand
                  <select
                    value={editor.brandId || ""}
                    onChange={(event) =>
                      setEditor({ ...editor, brandId: event.target.value || undefined })
                    }
                    className="mt-2 h-11 w-full rounded-lg border px-3"
                  >
                    <option value="">No brand / other</option>
                    {brands
                      .filter((brand) => brand.status === "active")
                      .map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                  </select>
                </label>
                <label className="text-sm font-medium">
                  Model number
                  <input
                    value={editor.model || ""}
                    onChange={(event) => setEditor({ ...editor, model: event.target.value })}
                    className="mt-2 h-11 w-full rounded-lg border px-3"
                  />
                </label>
                <label className="text-sm font-medium">
                  SKU
                  <input
                    value={editor.sku || ""}
                    onChange={(event) => setEditor({ ...editor, sku: event.target.value })}
                    className="mt-2 h-11 w-full rounded-lg border px-3"
                  />
                </label>
                <label className="sm:col-span-2 text-sm font-medium">
                  Short description
                  <textarea
                    rows={3}
                    value={editor.summary || ""}
                    onChange={(event) => setEditor({ ...editor, summary: event.target.value })}
                    className="mt-2 w-full resize-y rounded-lg border px-3 py-2"
                  />
                </label>
              </section>
              <section className="grid gap-4 border-t pt-6 sm:grid-cols-3">
                <h3 className="sm:col-span-3 font-semibold">Pricing & inventory</h3>
                <label className="text-sm font-medium">
                  Regular price
                  <input
                    type="number"
                    value={editor.price ?? ""}
                    onChange={(event) =>
                      setEditor({
                        ...editor,
                        price: event.target.value === "" ? undefined : Number(event.target.value),
                      })
                    }
                    className="mt-2 h-11 w-full rounded-lg border px-3"
                  />
                </label>
                <label className="text-sm font-medium">
                  Stock quantity
                  <input
                    type="number"
                    value={editor.stock ?? 0}
                    onChange={(event) =>
                      setEditor({ ...editor, stock: Number(event.target.value) })
                    }
                    className="mt-2 h-11 w-full rounded-lg border px-3"
                  />
                </label>
                <label className="text-sm font-medium">
                  Low-stock alert
                  <input
                    type="number"
                    value={editor.lowStock ?? 5}
                    onChange={(event) =>
                      setEditor({ ...editor, lowStock: Number(event.target.value) })
                    }
                    className="mt-2 h-11 w-full rounded-lg border px-3"
                  />
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={editor.contactForPrice || false}
                    onChange={(event) =>
                      setEditor({ ...editor, contactForPrice: event.target.checked })
                    }
                  />
                  Contact for price
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={editor.showPrice ?? true}
                    onChange={(event) => setEditor({ ...editor, showPrice: event.target.checked })}
                  />
                  Show price
                </label>
              </section>
              <section className="border-t pt-6">
                <h3 className="font-semibold">Specifications</h3>
                <p className="mt-1 text-xs text-slate-500">One specification per line.</p>
                <textarea
                  rows={7}
                  value={(editor.specs || []).join("\n")}
                  onChange={(event) =>
                    setEditor({
                      ...editor,
                      specs: event.target.value
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean),
                    })
                  }
                  className="mt-3 w-full rounded-lg border px-3 py-2 text-sm"
                />
              </section>
              <section className="grid gap-4 border-t pt-6 sm:grid-cols-2">
                <h3 className="sm:col-span-2 font-semibold">Publishing</h3>
                <label className="text-sm font-medium">
                  Status
                  <select
                    value={editor.status || "draft"}
                    onChange={(event) =>
                      setEditor({ ...editor, status: event.target.value as Product["status"] })
                    }
                    className="mt-2 h-11 w-full rounded-lg border px-3"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </label>
                <label className="flex h-11 items-center gap-2 self-end text-sm">
                  <input
                    type="checkbox"
                    checked={editor.featured || false}
                    onChange={(event) => setEditor({ ...editor, featured: event.target.checked })}
                  />
                  Featured product
                </label>
              </section>
              {editor.id ? (
                <button
                  type="button"
                  onClick={() => deleteProduct(editor.id!)}
                  className="h-11 rounded-lg border border-red-200 px-4 text-sm font-semibold text-red-600"
                >
                  Delete product
                </button>
              ) : null}
            </div>
            <div className="sticky bottom-0 flex h-20 items-center justify-end gap-3 border-t bg-white px-5">
              <button
                type="button"
                onClick={() => setEditor(null)}
                className="h-11 rounded-lg border px-4 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-11 rounded-lg bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Save product
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}

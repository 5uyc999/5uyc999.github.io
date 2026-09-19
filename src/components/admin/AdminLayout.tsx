import { ReactNode, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard, FileText, Image, MessageSquare, Star, HelpCircle,
  Settings, LogOut, Menu, X, Users, LineChart
} from "lucide-react";
import { useState } from "react";
import logoLams from "@/assets/logo-lams.webp";

const navItems = [
  { label: "لوحة التحكم", path: "/admin", icon: LayoutDashboard },
  { label: "الاستفسارات", path: "/admin/inquiries", icon: MessageSquare },
  { label: "العملاء المحتملين", path: "/admin/leads", icon: Users },
  { label: "التتبع التسويقي", path: "/admin/tracking", icon: LineChart },
  { label: "المدونة", path: "/admin/blog", icon: FileText },
  { label: "المعرض", path: "/admin/gallery", icon: Image },
  { label: "آراء العملاء", path: "/admin/testimonials", icon: Star },
  { label: "الأسئلة الشائعة", path: "/admin/faq", icon: HelpCircle },
  { label: "الإعدادات", path: "/admin/settings", icon: Settings },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </Helmet>
      <div className="min-h-screen flex bg-muted" dir="rtl">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 right-0 z-50 w-64 bg-primary text-primary-foreground transform transition-transform lg:translate-x-0 lg:static ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}>
        <div className="p-4 border-b border-primary-foreground/10">
          <div className="flex items-center gap-2">
            <img src={logoLams} alt="لمس" className="h-10 w-10 rounded-lg object-cover" />
            <div>
              <h2 className="font-bold">لوحة التحكم</h2>
              <p className="text-xs opacity-70">مؤسسة لمس</p>
            </div>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-secondary text-secondary-foreground"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 right-4 left-4">
          <button
            onClick={() => { signOut(); navigate("/admin/login"); }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm text-primary-foreground/70 hover:bg-primary-foreground/10 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
          <button className="lg:hidden p-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <h1 className="text-lg font-bold text-foreground">
            {navItems.find(n => n.path === location.pathname)?.label || "لوحة التحكم"}
          </h1>
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
      </div>
    </>
  );
};

export default AdminLayout;

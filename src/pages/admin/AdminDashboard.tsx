import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, FileText, Image, Star, HelpCircle, Bell, Phone, BadgeCheck, Trophy, Banknote } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface RecentInquiry {
  id: string;
  name: string;
  phone: string;
  service_type: string | null;
  is_read: boolean;
  created_at: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState({ inquiries: 0, unread: 0, qualified: 0, won: 0, revenue: 0, posts: 0, images: 0, testimonials: 0, faqs: 0 });
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([]);
  const { toast } = useToast();

  const fetchStats = async () => {
    const [inq, unread, qualified, won, revenueRows, posts, images, test, faqs] = await Promise.all([
      supabase.from("contact_inquiries").select("id", { count: "exact", head: true }),
      supabase.from("contact_inquiries").select("id", { count: "exact", head: true }).eq("is_read", false),
      supabase.from("contact_inquiries").select("id", { count: "exact", head: true }).in("lead_status", ["qualified", "quoted", "won"]),
      supabase.from("contact_inquiries").select("id", { count: "exact", head: true }).eq("lead_status", "won"),
      supabase.from("contact_inquiries").select("sale_value").eq("lead_status", "won"),
      supabase.from("blog_posts").select("id", { count: "exact", head: true }),
      supabase.from("gallery_images").select("id", { count: "exact", head: true }),
      supabase.from("testimonials").select("id", { count: "exact", head: true }),
      supabase.from("faq_items").select("id", { count: "exact", head: true }),
    ]);
    const revenue = (revenueRows.data || []).reduce((sum, row) => sum + Number(row.sale_value || 0), 0);
    setStats({
      inquiries: inq.count || 0,
      unread: unread.count || 0,
      qualified: qualified.count || 0,
      won: won.count || 0,
      revenue,
      posts: posts.count || 0,
      images: images.count || 0,
      testimonials: test.count || 0,
      faqs: faqs.count || 0,
    });
  };

  const fetchRecent = async () => {
    const { data } = await supabase
      .from("contact_inquiries")
      .select("id, name, phone, service_type, is_read, created_at")
      .order("created_at", { ascending: false })
      .limit(5);
    setRecentInquiries((data as RecentInquiry[]) || []);
  };

  useEffect(() => {
    fetchStats();
    fetchRecent();

    // Realtime subscription for new inquiries
    const channel = supabase
      .channel("dashboard-inquiries")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "contact_inquiries" }, (payload) => {
        const newInquiry = payload.new as Partial<RecentInquiry>;
        toast({
          title: "🔔 استفسار جديد!",
          description: `${newInquiry.name || "عميل جديد"} - ${newInquiry.phone || "بدون رقم"}`,
        });
        fetchStats();
        fetchRecent();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const statCards = [
    { label: "الاستفسارات", value: stats.inquiries, sub: stats.unread > 0 ? `${stats.unread} غير مقروء` : null, icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500/10", path: "/admin/inquiries" },
    { label: "عملاء مؤهلون", value: stats.qualified, icon: BadgeCheck, color: "text-emerald-600", bg: "bg-emerald-500/10", path: "/admin/inquiries" },
    { label: "مبيعات", value: stats.won, icon: Trophy, color: "text-green-600", bg: "bg-green-500/10", path: "/admin/inquiries" },
    { label: "إيراد مسجل", value: `${stats.revenue.toLocaleString("ar-SA")} ر.س`, icon: Banknote, color: "text-violet-600", bg: "bg-violet-500/10", path: "/admin/inquiries" },
    { label: "المقالات", value: stats.posts, icon: FileText, color: "text-green-500", bg: "bg-green-500/10", path: "/admin/blog" },
    { label: "الصور", value: stats.images, icon: Image, color: "text-purple-500", bg: "bg-purple-500/10", path: "/admin/gallery" },
    { label: "التقييمات", value: stats.testimonials, icon: Star, color: "text-yellow-500", bg: "bg-yellow-500/10", path: "/admin/testimonials" },
    { label: "الأسئلة الشائعة", value: stats.faqs, icon: HelpCircle, color: "text-orange-500", bg: "bg-orange-500/10", path: "/admin/faq" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">مرحباً بك في لوحة التحكم 👋</h2>
        {stats.unread > 0 && (
          <Link to="/admin/inquiries">
            <Badge className="bg-destructive text-destructive-foreground gap-1 px-3 py-1.5 text-sm animate-pulse">
              <Bell className="h-4 w-4" />
              {stats.unread} استفسار جديد
            </Badge>
          </Link>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link key={card.label} to={card.path}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-5">
                <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </div>
                <span className="text-3xl font-black text-foreground">{card.value}</span>
                <p className="text-sm font-medium text-muted-foreground mt-1">{card.label}</p>
                {card.sub && <p className="text-xs text-destructive font-bold mt-1">{card.sub}</p>}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-foreground">آخر الاستفسارات</h3>
          <Link to="/admin/inquiries" className="text-sm font-bold text-primary hover:text-secondary">عرض الكل</Link>
        </div>
        {recentInquiries.length === 0 ? (
          <Card><CardContent className="p-6 text-center text-muted-foreground">لا توجد استفسارات بعد</CardContent></Card>
        ) : (
          <div className="space-y-2">
            {recentInquiries.map((inq) => (
              <Card key={inq.id} className={!inq.is_read ? "border-secondary bg-secondary/5" : ""}>
                <CardContent className="p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${!inq.is_read ? "bg-secondary" : "bg-muted"}`} />
                    <div>
                      <p className="font-bold text-sm text-foreground">{inq.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" /> {inq.phone}
                        {inq.service_type && <span>• {inq.service_type}</span>}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(inq.created_at).toLocaleDateString("ar-SA", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

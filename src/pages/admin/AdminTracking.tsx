import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, FileText, MousePointerClick, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Interaction {
  id: string;
  event_type: string;
  form_type: string | null;
  current_page: string | null;
  reference_code: string | null;
  first_source: string | null;
  first_medium: string | null;
  first_campaign: string | null;
  first_term: string | null;
  first_gclid: string | null;
  last_source: string | null;
  last_medium: string | null;
  last_campaign: string | null;
  created_at: string;
}

interface LeadOutcome {
  id: string;
  lead_status: string;
  sale_value: number | null;
  first_source: string | null;
  first_medium: string | null;
  first_campaign: string | null;
  last_source: string | null;
  last_medium: string | null;
  last_campaign: string | null;
  created_at: string;
}

const eventLabels: Record<string, string> = {
  phone_click: "ضغط اتصال",
  whatsapp_click: "ضغط واتساب",
  get_quote_click: "ضغط طلب عرض سعر",
  form_submit: "إرسال نموذج",
};

const attributionLabel = (source?: string | null, medium?: string | null) => {
  const safeSource = source || "direct";
  const safeMedium = medium || "(none)";
  if (safeSource === "google" && safeMedium === "cpc") return "Google Ads";
  if (safeSource === "google" && safeMedium === "organic") return "Google Organic";
  if (safeMedium === "referral") return `Referral: ${safeSource}`;
  if (safeSource === "direct") return "Direct";
  return `${safeSource} / ${safeMedium}`;
};

const interactionSourceLabel = (row: Interaction) =>
  attributionLabel(row.last_source || row.first_source, row.last_medium || row.first_medium);

const leadSourceLabel = (row: LeadOutcome) =>
  attributionLabel(row.first_source || row.last_source, row.first_medium || row.last_medium);

const AdminTracking = () => {
  const [rows, setRows] = useState<Interaction[]>([]);
  const [leads, setLeads] = useState<LeadOutcome[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRows = async () => {
    setLoading(true);
    const [interactionResult, leadResult] = await Promise.all([
      supabase
        .from("lead_interactions")
        .select("id,event_type,form_type,current_page,reference_code,first_source,first_medium,first_campaign,first_term,first_gclid,last_source,last_medium,last_campaign,created_at")
        .order("created_at", { ascending: false })
        .limit(500),
      supabase
        .from("contact_inquiries")
        .select("id,lead_status,sale_value,first_source,first_medium,first_campaign,last_source,last_medium,last_campaign,created_at")
        .order("created_at", { ascending: false })
        .limit(5000),
    ]);

    if (interactionResult.error) {
      toast({ title: "تعذر تحميل بيانات التتبع", description: interactionResult.error.message, variant: "destructive" });
    }
    if (leadResult.error) {
      toast({ title: "تعذر تحميل نتائج العملاء", description: leadResult.error.message, variant: "destructive" });
    }

    setRows((interactionResult.data as Interaction[]) || []);
    setLeads((leadResult.data as LeadOutcome[]) || []);
    setLoading(false);
  };

  useEffect(() => { void fetchRows(); }, []);

  const stats = useMemo(() => ({
    phone: rows.filter(r => r.event_type === "phone_click").length,
    whatsapp: rows.filter(r => r.event_type === "whatsapp_click").length,
    quote: rows.filter(r => r.event_type === "get_quote_click").length,
    forms: rows.filter(r => r.event_type === "form_submit").length,
  }), [rows]);

  const sourceStats = useMemo(() => {
    const map = new Map<string, number>();
    rows.forEach((r) => {
      const label = interactionSourceLabel(r);
      map.set(label, (map.get(label) || 0) + 1);
    });
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [rows]);

  const funnelBySource = useMemo(() => {
    const map = new Map<string, { leads: number; qualified: number; sales: number; revenue: number }>();
    leads.forEach((lead) => {
      const label = leadSourceLabel(lead);
      const current = map.get(label) || { leads: 0, qualified: 0, sales: 0, revenue: 0 };
      current.leads += 1;
      if (["qualified", "quoted", "won"].includes(lead.lead_status)) current.qualified += 1;
      if (lead.lead_status === "won") {
        current.sales += 1;
        current.revenue += Number(lead.sale_value || 0);
      }
      map.set(label, current);
    });

    return [...map.entries()]
      .map(([source, values]) => ({ source, ...values }))
      .sort((a, b) => b.revenue - a.revenue || b.sales - a.sales || b.leads - a.leads);
  }, [leads]);

  const cards = [
    { label: "ضغطات الاتصال", value: stats.phone, icon: Phone },
    { label: "ضغطات واتساب", value: stats.whatsapp, icon: MessageCircle },
    { label: "طلب عرض سعر", value: stats.quote, icon: MousePointerClick },
    { label: "نماذج مرسلة", value: stats.forms, icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">التتبع التسويقي</h2>
          <p className="text-sm text-muted-foreground">يسجل ضغطات الهاتف وواتساب وطلبات عرض السعر، ثم يربط العملاء المؤهلين والمبيعات بالمصدر. ضغط الهاتف يعني محاولة اتصال وليس مكالمة مكتملة.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => void fetchRows()} disabled={loading}>
          <RefreshCw className={`ml-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} /> تحديث
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardContent className="p-5">
              <card.icon className="h-5 w-5 text-primary mb-3" />
              <p className="text-3xl font-black">{card.value}</p>
              <p className="text-sm text-muted-foreground">{card.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">قمع العملاء والمبيعات حسب المصدر (First touch)</CardTitle>
          <p className="text-xs text-muted-foreground">يصبح هذا التقرير دقيقاً عندما يتم تحديث حالة كل عميل إلى مؤهل/غير مؤهل/تم البيع وتسجيل قيمة البيع.</p>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">المصدر</TableHead>
                <TableHead className="text-right">Leads</TableHead>
                <TableHead className="text-right">Qualified</TableHead>
                <TableHead className="text-right">Sales</TableHead>
                <TableHead className="text-right">Lead → Sale</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {funnelBySource.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">لا توجد نتائج عملاء بعد</TableCell></TableRow>
              ) : funnelBySource.map((row) => (
                <TableRow key={row.source}>
                  <TableCell className="font-medium whitespace-nowrap">{row.source}</TableCell>
                  <TableCell>{row.leads}</TableCell>
                  <TableCell>{row.qualified}</TableCell>
                  <TableCell>{row.sales}</TableCell>
                  <TableCell>{row.leads ? `${((row.sales / row.leads) * 100).toFixed(1)}%` : "0%"}</TableCell>
                  <TableCell className="font-bold whitespace-nowrap">{row.revenue.toLocaleString("ar-SA")} ر.س</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-base">مصادر التفاعلات</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {sourceStats.length === 0 ? <p className="text-sm text-muted-foreground">لا توجد بيانات بعد</p> : sourceStats.map(([source, count]) => (
              <div key={source} className="flex items-center justify-between text-sm border-b last:border-0 pb-2 last:pb-0">
                <span>{source}</span><strong>{count}</strong>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">آخر التفاعلات</CardTitle></CardHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الحدث</TableHead>
                  <TableHead className="text-right">المصدر</TableHead>
                  <TableHead className="text-right">الحملة</TableHead>
                  <TableHead className="text-right">الصفحة</TableHead>
                  <TableHead className="text-right">المرجع</TableHead>
                  <TableHead className="text-right">الوقت</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.slice(0, 60).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium whitespace-nowrap">{eventLabels[row.event_type] || row.event_type}</TableCell>
                    <TableCell className="text-xs whitespace-nowrap">{interactionSourceLabel(row)}</TableCell>
                    <TableCell className="text-xs max-w-40 truncate">{row.last_campaign || row.first_campaign || "—"}</TableCell>
                    <TableCell className="text-xs max-w-56 truncate" dir="ltr">{row.current_page || "—"}</TableCell>
                    <TableCell className="text-xs" dir="ltr">{row.reference_code || "—"}</TableCell>
                    <TableCell className="text-xs whitespace-nowrap">{new Date(row.created_at).toLocaleString("ar-SA")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminTracking;

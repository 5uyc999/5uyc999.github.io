import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { MessageCircle, Phone, Download, Search, Users, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Lead {
  id: string;
  name: string;
  phone: string;
  service_type: string | null;
  created_at: string;
  lead_status: string;
  quoted_value: number | null;
  sale_value: number | null;
  first_source: string | null;
  first_medium: string | null;
  first_campaign: string | null;
  last_source: string | null;
  last_medium: string | null;
  last_campaign: string | null;
  reference_code: string | null;
}

const statusLabels: Record<string, string> = {
  new: "جديد",
  qualified: "مؤهل",
  unqualified: "غير مؤهل",
  quoted: "تم عرض سعر",
  won: "تم البيع",
  lost: "مفقود",
};

const sourceLabel = (lead: Lead) => {
  const source = lead.last_source || lead.first_source || "direct";
  const medium = lead.last_medium || lead.first_medium || "(none)";
  if (source === "google" && medium === "cpc") return "Google Ads";
  if (source === "google" && medium === "organic") return "Google Organic";
  if (source === "direct") return "Direct";
  return `${source} / ${medium}`;
};

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [manualOpen, setManualOpen] = useState(false);
  const [savingManual, setSavingManual] = useState(false);
  const [manual, setManual] = useState({
    name: "", phone: "", service_type: "", lead_status: "qualified",
    source: "direct", campaign: "", reference_code: "", sale_value: "", admin_notes: "",
  });
  const { toast } = useToast();

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_inquiries")
      .select("id,name,phone,service_type,created_at,lead_status,quoted_value,sale_value,first_source,first_medium,first_campaign,last_source,last_medium,last_campaign,reference_code")
      .order("created_at", { ascending: false });

    if (error) toast({ title: "تعذر تحميل العملاء", description: error.message, variant: "destructive" });

    const seen = new Map<string, Lead>();
    ((data || []) as Lead[]).forEach((d) => {
      const phone = d.phone?.trim();
      if (phone && !seen.has(phone)) seen.set(phone, d);
    });
    setLeads(Array.from(seen.values()));
    setLoading(false);
  };

  useEffect(() => { void fetchLeads(); }, []);

  const filtered = useMemo(() => leads.filter(l =>
    l.name.includes(search) || l.phone.includes(search) || (l.service_type || "").includes(search) || sourceLabel(l).toLowerCase().includes(search.toLowerCase())
  ), [leads, search]);

  const formatWhatsApp = (phone: string) =>
    phone.startsWith("0") ? `966${phone.slice(1)}` : phone.replace(/^\+/, "");

  const exportCSV = () => {
    const header = "الاسم,الهاتف,واتساب,الخدمة,الحالة,المصدر,الحملة,عرض السعر,قيمة البيع,المرجع,التاريخ\n";
    const rows = filtered.map(l =>
      `"${l.name}","${l.phone}","${formatWhatsApp(l.phone)}","${l.service_type || ""}","${statusLabels[l.lead_status] || l.lead_status}","${sourceLabel(l)}","${l.last_campaign || l.first_campaign || ""}","${l.quoted_value ?? ""}","${l.sale_value ?? ""}","${l.reference_code || ""}","${new Date(l.created_at).toLocaleDateString("ar-SA")}"`
    ).join("\n");
    const blob = new Blob(["\uFEFF" + header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: `تم تصدير ${filtered.length} عميل محتمل ✅` });
  };

  const saveManualLead = async () => {
    if (!manual.name.trim() || !manual.phone.trim()) {
      toast({ title: "الاسم ورقم الهاتف مطلوبان", variant: "destructive" });
      return;
    }

    setSavingManual(true);
    let source = "direct";
    let medium = "(none)";
    if (manual.source === "google_ads") { source = "google"; medium = "cpc"; }
    if (manual.source === "google_organic") { source = "google"; medium = "organic"; }
    if (manual.source === "referral") { source = "referral"; medium = "referral"; }

    const { error } = await supabase.from("contact_inquiries").insert({
      name: manual.name.trim(),
      phone: manual.phone.trim(),
      service_type: manual.service_type || null,
      form_type: "manual",
      lead_status: manual.lead_status,
      sale_value: manual.sale_value ? Number(manual.sale_value) : null,
      admin_notes: manual.admin_notes || null,
      reference_code: manual.reference_code || null,
      first_source: source,
      first_medium: medium,
      first_campaign: manual.campaign || null,
      last_source: source,
      last_medium: medium,
      last_campaign: manual.campaign || null,
    });
    setSavingManual(false);

    if (error) {
      toast({ title: "تعذر إضافة العميل", description: error.message, variant: "destructive" });
      return;
    }

    setManualOpen(false);
    setManual({ name: "", phone: "", service_type: "", lead_status: "qualified", source: "direct", campaign: "", reference_code: "", sale_value: "", admin_notes: "" });
    toast({ title: "تمت إضافة العميل ✅" });
    await fetchLeads();
  };

  if (loading) return <div className="space-y-3">{[1,2,3,4,5].map(i => <div key={i} className="h-14 bg-muted animate-pulse rounded-lg" />)}</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">العملاء المحتملون ({leads.length})</h2>
        </div>
        <div className="flex gap-2">
          <Dialog open={manualOpen} onOpenChange={setManualOpen}>
            <DialogTrigger asChild><Button size="sm"><Plus className="ml-2 h-4 w-4" /> إضافة عميل يدوي</Button></DialogTrigger>
            <DialogContent className="max-w-lg" dir="rtl">
              <DialogHeader><DialogTitle className="text-right">إضافة عميل من مكالمة أو واتساب</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div><label className="text-sm block mb-1">الاسم *</label><Input value={manual.name} onChange={e => setManual({ ...manual, name: e.target.value })} /></div>
                  <div><label className="text-sm block mb-1">الهاتف *</label><Input dir="ltr" value={manual.phone} onChange={e => setManual({ ...manual, phone: e.target.value })} /></div>
                </div>
                <div><label className="text-sm block mb-1">الخدمة</label><Input value={manual.service_type} onChange={e => setManual({ ...manual, service_type: e.target.value })} placeholder="مثال: نقل عفش بالرياض" /></div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm block mb-1">المصدر</label>
                    <Select value={manual.source} onValueChange={v => setManual({ ...manual, source: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="direct">Direct / غير معروف</SelectItem>
                        <SelectItem value="google_ads">Google Ads</SelectItem>
                        <SelectItem value="google_organic">Google Organic</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm block mb-1">الحالة</label>
                    <Select value={manual.lead_status} onValueChange={v => setManual({ ...manual, lead_status: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{Object.entries(statusLabels).map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div><label className="text-sm block mb-1">اسم الحملة</label><Input value={manual.campaign} onChange={e => setManual({ ...manual, campaign: e.target.value })} /></div>
                  <div><label className="text-sm block mb-1">مرجع LMS إن وُجد</label><Input dir="ltr" value={manual.reference_code} onChange={e => setManual({ ...manual, reference_code: e.target.value })} placeholder="LMS-..." /></div>
                </div>
                <div><label className="text-sm block mb-1">قيمة البيع إن تم الحجز (ر.س)</label><Input type="number" min="0" value={manual.sale_value} onChange={e => setManual({ ...manual, sale_value: e.target.value })} /></div>
                <div><label className="text-sm block mb-1">ملاحظات</label><Textarea rows={3} value={manual.admin_notes} onChange={e => setManual({ ...manual, admin_notes: e.target.value })} /></div>
                <Button className="w-full" onClick={() => void saveManualLead()} disabled={savingManual}>{savingManual ? "جاري الحفظ..." : "حفظ العميل"}</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={exportCSV} variant="outline" size="sm" disabled={filtered.length === 0}><Download className="ml-2 h-4 w-4" /> تصدير CSV</Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">آخر سجل لكل رقم هاتف. أضف المكالمات/الواتساب يدوياً إذا لم يرسل العميل نموذجاً، ثم حدّث حالته وقيمة البيع من صفحة الاستفسارات.</p>

      <div className="relative max-w-sm"><Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="ابحث بالاسم أو الهاتف أو المصدر..." value={search} onChange={e => setSearch(e.target.value)} className="pr-9" /></div>

      {filtered.length === 0 ? (
        <Card><CardContent className="p-10 text-center text-muted-foreground">لا توجد نتائج مطابقة</CardContent></Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader><TableRow>
                <TableHead className="text-right">الاسم</TableHead><TableHead className="text-right">الهاتف</TableHead><TableHead className="text-right">المصدر</TableHead><TableHead className="text-right">الحالة</TableHead><TableHead className="text-right">الخدمة</TableHead><TableHead className="text-right">قيمة البيع</TableHead><TableHead className="text-right">آخر تواصل</TableHead><TableHead className="text-right">تواصل</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {filtered.map((lead) => (
                  <TableRow key={lead.phone}>
                    <TableCell className="font-bold whitespace-nowrap">{lead.name}</TableCell>
                    <TableCell><span className="text-sm" dir="ltr">{lead.phone}</span></TableCell>
                    <TableCell><span className="text-xs font-medium whitespace-nowrap">{sourceLabel(lead)}</span>{(lead.last_campaign || lead.first_campaign) && <p className="text-[11px] text-muted-foreground max-w-32 truncate">{lead.last_campaign || lead.first_campaign}</p>}</TableCell>
                    <TableCell><Badge variant="outline">{statusLabels[lead.lead_status] || lead.lead_status}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{lead.service_type || "—"}</TableCell>
                    <TableCell className="font-medium whitespace-nowrap">{lead.sale_value ? `${lead.sale_value.toLocaleString("ar-SA")} ر.س` : "—"}</TableCell>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{new Date(lead.created_at).toLocaleDateString("ar-SA", { year: "numeric", month: "short", day: "numeric" })}</TableCell>
                    <TableCell><div className="flex items-center gap-1"><Button size="icon" variant="ghost" className="h-8 w-8" asChild><a href={`https://wa.me/${formatWhatsApp(lead.phone)}`} target="_blank" rel="noopener noreferrer" title="واتساب"><MessageCircle className="h-4 w-4 text-green-600" /></a></Button><Button size="icon" variant="ghost" className="h-8 w-8" asChild><a href={`tel:${lead.phone}`} title="اتصال"><Phone className="h-4 w-4 text-primary" /></a></Button></div></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminLeads;

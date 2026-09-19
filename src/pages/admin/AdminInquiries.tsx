import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Phone, Trash2, MessageCircle, MapPin, Calendar, FileText,
  ChevronLeft, ChevronRight, Save, Megaphone, BadgeDollarSign,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type LeadStatus = "new" | "qualified" | "unqualified" | "quoted" | "won" | "lost";

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  service_type: string | null;
  city: string | null;
  from_neighborhood: string | null;
  to_neighborhood: string | null;
  moving_date: string | null;
  message: string | null;
  is_read: boolean;
  created_at: string;
  form_type: string | null;
  lead_status: LeadStatus;
  quoted_value: number | null;
  sale_value: number | null;
  unqualified_reason: string | null;
  admin_notes: string | null;
  reference_code: string | null;
  first_source: string | null;
  first_medium: string | null;
  first_campaign: string | null;
  first_term: string | null;
  first_gclid: string | null;
  first_landing_page: string | null;
  first_referrer: string | null;
  last_source: string | null;
  last_medium: string | null;
  last_campaign: string | null;
  last_landing_page: string | null;
}

const PAGE_SIZE = 15;

const statusMeta: Record<LeadStatus, { label: string; className: string }> = {
  new: { label: "جديد", className: "bg-blue-500/10 text-blue-700 border-blue-200" },
  qualified: { label: "مؤهل", className: "bg-emerald-500/10 text-emerald-700 border-emerald-200" },
  unqualified: { label: "غير مؤهل", className: "bg-orange-500/10 text-orange-700 border-orange-200" },
  quoted: { label: "تم عرض سعر", className: "bg-violet-500/10 text-violet-700 border-violet-200" },
  won: { label: "تم البيع", className: "bg-green-600/10 text-green-700 border-green-300" },
  lost: { label: "مفقود", className: "bg-red-500/10 text-red-700 border-red-200" },
};

const touchLabel = (source?: string | null, medium?: string | null) => {
  const safeSource = source || "direct";
  const safeMedium = medium || "(none)";
  if (safeSource === "google" && safeMedium === "cpc") return "Google Ads";
  if (safeSource === "google" && safeMedium === "organic") return "Google Organic";
  if (safeMedium === "referral") return `Referral: ${safeSource}`;
  if (safeSource === "direct") return "Direct";
  return `${safeSource} / ${safeMedium}`;
};

const sourceLabel = (inq: Inquiry) =>
  touchLabel(inq.last_source || inq.first_source, inq.last_medium || inq.first_medium);

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | LeadStatus>("all");
  const [page, setPage] = useState(0);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchInquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "تعذر تحميل الاستفسارات", description: error.message, variant: "destructive" });
    }
    setInquiries((data as Inquiry[]) || []);
    setLoading(false);
  };

  useEffect(() => { void fetchInquiries(); }, []);

  const markRead = async (id: string) => {
    await supabase.from("contact_inquiries").update({ is_read: true }).eq("id", id);
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, is_read: true } : i));
  };

  const deleteInquiry = async (id: string) => {
    const { error } = await supabase.from("contact_inquiries").delete().eq("id", id);
    if (error) {
      toast({ title: "تعذر حذف الاستفسار", description: error.message, variant: "destructive" });
      return;
    }
    setInquiries(prev => prev.filter(i => i.id !== id));
    setSelected(null);
    toast({ title: "تم حذف الاستفسار" });
  };

  const saveLead = async () => {
    if (!selected) return;
    setSaving(true);
    const { error } = await supabase
      .from("contact_inquiries")
      .update({
        lead_status: selected.lead_status,
        quoted_value: selected.quoted_value,
        sale_value: selected.sale_value,
        unqualified_reason: selected.unqualified_reason,
        admin_notes: selected.admin_notes,
      })
      .eq("id", selected.id);
    setSaving(false);

    if (error) {
      toast({ title: "تعذر حفظ حالة العميل", description: error.message, variant: "destructive" });
      return;
    }

    setInquiries(prev => prev.map(i => i.id === selected.id ? selected : i));
    toast({ title: "تم حفظ بيانات العميل ✅" });
  };

  const filtered = useMemo(() => inquiries.filter((i) => {
    if (filter === "unread" && i.is_read) return false;
    if (statusFilter !== "all" && i.lead_status !== statusFilter) return false;
    return true;
  }), [inquiries, filter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const unreadCount = inquiries.filter(i => !i.is_read).length;

  const openDetail = (inq: Inquiry) => {
    setSelected(inq);
    if (!inq.is_read) void markRead(inq.id);
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("ar-SA", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

  if (loading) {
    return (
      <div className="space-y-3">
        {[1,2,3,4,5].map(i => <div key={i} className="h-14 bg-muted animate-pulse rounded-lg" />)}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-foreground">الاستفسارات والعملاء ({inquiries.length})</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant={filter === "all" ? "default" : "outline"} onClick={() => { setFilter("all"); setPage(0); }}>
            الكل ({inquiries.length})
          </Button>
          <Button size="sm" variant={filter === "unread" ? "default" : "outline"} onClick={() => { setFilter("unread"); setPage(0); }}>
            غير مقروء ({unreadCount})
          </Button>
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v as typeof statusFilter); setPage(0); }}>
            <SelectTrigger className="w-[150px] h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">كل حالات العميل</SelectItem>
              {Object.entries(statusMeta).map(([value, meta]) => (
                <SelectItem key={value} value={value}>{meta.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card><CardContent className="p-10 text-center text-muted-foreground">لا توجد نتائج مطابقة</CardContent></Card>
      ) : (
        <>
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">العميل</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">المصدر</TableHead>
                    <TableHead className="text-right">الخدمة</TableHead>
                    <TableHead className="text-right">القيمة</TableHead>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginated.map((inq) => (
                    <TableRow key={inq.id} className={`cursor-pointer ${!inq.is_read ? "bg-secondary/5" : "hover:bg-muted/50"}`} onClick={() => openDetail(inq)}>
                      <TableCell>
                        <p className="font-bold whitespace-nowrap">{inq.name}</p>
                        <p className="text-xs text-muted-foreground" dir="ltr">{inq.phone}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusMeta[inq.lead_status]?.className || ""}>
                          {statusMeta[inq.lead_status]?.label || inq.lead_status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-medium whitespace-nowrap">{sourceLabel(inq)}</span>
                        {(inq.last_campaign || inq.first_campaign) && <p className="text-[11px] text-muted-foreground max-w-36 truncate">{inq.last_campaign || inq.first_campaign}</p>}
                      </TableCell>
                      <TableCell>{inq.service_type ? <Badge variant="outline" className="text-xs whitespace-nowrap">{inq.service_type}</Badge> : "—"}</TableCell>
                      <TableCell className="whitespace-nowrap text-sm">
                        {inq.sale_value ? `${inq.sale_value.toLocaleString("ar-SA")} ر.س` : inq.quoted_value ? `عرض: ${inq.quoted_value.toLocaleString("ar-SA")} ر.س` : "—"}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{formatDate(inq.created_at)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                          <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                            <a href={`https://wa.me/${inq.phone.replace(/^0/, "966")}`} target="_blank" rel="noopener noreferrer" title="واتساب"><MessageCircle className="h-4 w-4 text-green-600" /></a>
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                            <a href={`tel:${inq.phone}`} title="اتصال"><Phone className="h-4 w-4 text-primary" /></a>
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => void deleteInquiry(inq.id)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button size="icon" variant="outline" disabled={page === 0} onClick={() => setPage(p => p - 1)}><ChevronRight className="h-4 w-4" /></Button>
              <span className="text-sm text-muted-foreground">{page + 1} / {totalPages}</span>
              <Button size="icon" variant="outline" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}><ChevronLeft className="h-4 w-4" /></Button>
            </div>
          )}
        </>
      )}

      <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
          <DialogHeader><DialogTitle className="text-right">تفاصيل العميل والاستفسار</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-3">
                <div><p className="text-xs text-muted-foreground">الاسم</p><p className="font-bold">{selected.name}</p></div>
                <div><p className="text-xs text-muted-foreground">الهاتف</p><p className="font-bold" dir="ltr">{selected.phone}</p></div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div><p className="text-xs text-muted-foreground mb-1"><MapPin className="inline h-3 w-3" /> النقل من</p><p className="text-sm">{selected.from_neighborhood || "غير محدد"}</p></div>
                <div><p className="text-xs text-muted-foreground mb-1"><MapPin className="inline h-3 w-3" /> النقل إلى</p><p className="text-sm">{selected.to_neighborhood || "غير محدد"}</p></div>
              </div>

              {selected.moving_date && <div><p className="text-xs text-muted-foreground"><Calendar className="inline h-3 w-3" /> موعد النقل</p><p className="text-sm">{new Date(selected.moving_date).toLocaleDateString("ar-SA")}</p></div>}
              {selected.message && <div><p className="text-xs text-muted-foreground"><FileText className="inline h-3 w-3" /> الرسالة</p><p className="text-sm bg-muted rounded-lg p-3">{selected.message}</p></div>}

              <Card>
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-bold flex items-center gap-2"><Megaphone className="h-4 w-4" /> مصدر العميل</h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-muted-foreground">First touch:</span> <strong>{touchLabel(selected.first_source, selected.first_medium)}</strong></div>
                    <div><span className="text-muted-foreground">Last touch:</span> <strong>{touchLabel(selected.last_source, selected.last_medium)}</strong></div>
                    <div><span className="text-muted-foreground">الحملة:</span> {selected.first_campaign || "—"}</div>
                    <div><span className="text-muted-foreground">الكلمة/UTM term:</span> {selected.first_term || "—"}</div>
                    <div className="sm:col-span-2"><span className="text-muted-foreground">Landing page:</span> <span dir="ltr" className="break-all">{selected.first_landing_page || "—"}</span></div>
                    <div><span className="text-muted-foreground">مرجع:</span> <strong dir="ltr">{selected.reference_code || "—"}</strong></div>
                    <div><span className="text-muted-foreground">GCLID:</span> <span dir="ltr" className="break-all text-xs">{selected.first_gclid || "—"}</span></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="p-4 space-y-4">
                  <h3 className="font-bold flex items-center gap-2"><BadgeDollarSign className="h-4 w-4" /> متابعة العميل والبيع</h3>
                  <div>
                    <label className="text-sm font-medium block mb-1">حالة العميل</label>
                    <Select value={selected.lead_status} onValueChange={(v) => setSelected({ ...selected, lead_status: v as LeadStatus })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{Object.entries(statusMeta).map(([value, meta]) => <SelectItem key={value} value={value}>{meta.label}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium block mb-1">قيمة عرض السعر (ر.س)</label>
                      <Input type="number" min="0" step="0.01" value={selected.quoted_value ?? ""} onChange={(e) => setSelected({ ...selected, quoted_value: e.target.value ? Number(e.target.value) : null })} />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">قيمة البيع الفعلية (ر.س)</label>
                      <Input type="number" min="0" step="0.01" value={selected.sale_value ?? ""} onChange={(e) => setSelected({ ...selected, sale_value: e.target.value ? Number(e.target.value) : null })} />
                    </div>
                  </div>
                  {selected.lead_status === "unqualified" && (
                    <div>
                      <label className="text-sm font-medium block mb-1">سبب عدم التأهل</label>
                      <Input placeholder="مثال: يريد بيع أثاث / خارج نطاق الخدمة" value={selected.unqualified_reason || ""} onChange={(e) => setSelected({ ...selected, unqualified_reason: e.target.value })} />
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium block mb-1">ملاحظات الإدارة</label>
                    <Textarea rows={3} placeholder="ملاحظات المتابعة مع العميل..." value={selected.admin_notes || ""} onChange={(e) => setSelected({ ...selected, admin_notes: e.target.value })} />
                  </div>
                  <Button onClick={() => void saveLead()} disabled={saving} className="w-full"><Save className="ml-2 h-4 w-4" />{saving ? "جاري الحفظ..." : "حفظ متابعة العميل"}</Button>
                </CardContent>
              </Card>

              <div className="pt-2 border-t text-xs text-muted-foreground">تاريخ الإرسال: {formatDate(selected.created_at)} · النموذج: {selected.form_type || "غير محدد"}</div>

              <div className="flex gap-2">
                <Button className="flex-1" asChild><a href={`https://wa.me/${selected.phone.replace(/^0/, "966")}`} target="_blank" rel="noopener noreferrer"><MessageCircle className="ml-2 h-4 w-4" /> واتساب</a></Button>
                <Button variant="outline" className="flex-1" asChild><a href={`tel:${selected.phone}`}><Phone className="ml-2 h-4 w-4" /> اتصال</a></Button>
                <Button variant="destructive" size="icon" onClick={() => void deleteInquiry(selected.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInquiries;

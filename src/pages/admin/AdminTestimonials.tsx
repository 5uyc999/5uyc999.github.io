import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Star, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  city: string | null;
  is_visible: boolean;
}

const AdminTestimonials = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ name: "", text: "", rating: 5, city: "" });
  const { toast } = useToast();

  const fetch = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("sort_order");
    setItems((data as Testimonial[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const openNew = () => { setEditing(null); setForm({ name: "", text: "", rating: 5, city: "" }); setDialogOpen(true); };
  const openEdit = (t: Testimonial) => { setEditing(t); setForm({ name: t.name, text: t.text, rating: t.rating, city: t.city || "" }); setDialogOpen(true); };

  const handleSave = async () => {
    if (editing) {
      await supabase.from("testimonials").update(form).eq("id", editing.id);
      toast({ title: "تم التحديث" });
    } else {
      await supabase.from("testimonials").insert({ ...form, sort_order: items.length });
      toast({ title: "تم الإضافة" });
    }
    setDialogOpen(false);
    fetch();
  };

  const deleteItem = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    setItems(prev => prev.filter(i => i.id !== id));
    toast({ title: "تم الحذف" });
  };

  const toggleVisible = async (t: Testimonial) => {
    await supabase.from("testimonials").update({ is_visible: !t.is_visible }).eq("id", t.id);
    setItems(prev => prev.map(i => i.id === t.id ? { ...i, is_visible: !t.is_visible } : i));
    toast({ title: !t.is_visible ? "تم اعتماد التقييم ونشره" : "تم إخفاء التقييم" });
  };

  if (loading) return <div className="text-center py-10">جاري التحميل...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">آراء العملاء ({items.length})</h2>
        <Button onClick={openNew} className="bg-primary font-bold"><Plus className="h-4 w-4 ml-2" /> إضافة تقييم</Button>
      </div>

      {items.map((t) => (
        <Card key={t.id}>
          <CardContent className="p-4 flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-bold">{t.name}</span>
                <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-3 w-3 ${i < t.rating ? "text-secondary fill-secondary" : "text-muted"}`} />)}</div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${t.is_visible ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                  {t.is_visible ? "معتمد ومنشور" : "بانتظار الموافقة"}
                </span>
              </div>
              {t.city && <p className="text-xs text-muted-foreground">{t.city}</p>}
              <p className="text-sm mt-1">{t.text}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button
                size="sm"
                variant={t.is_visible ? "outline" : "default"}
                className={t.is_visible ? "" : "bg-green-600 hover:bg-green-700 text-white font-bold"}
                onClick={() => toggleVisible(t)}
              >
                {t.is_visible ? <><EyeOff className="h-4 w-4 ml-1" />إخفاء</> : <><Eye className="h-4 w-4 ml-1" />موافقة ونشر</>}
              </Button>
              <Button size="icon" variant="ghost" onClick={() => openEdit(t)}><Edit className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteItem(t.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "تعديل" : "إضافة تقييم"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="اسم العميل" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="المدينة" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            <div className="flex items-center gap-2">
              <span className="text-sm">التقييم:</span>
              {[1,2,3,4,5].map(r => <button key={r} onClick={() => setForm({...form, rating: r})}><Star className={`h-5 w-5 ${r <= form.rating ? "text-secondary fill-secondary" : "text-muted"}`} /></button>)}
            </div>
            <Textarea placeholder="نص التقييم" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={3} />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>إلغاء</Button>
              <Button onClick={handleSave} className="bg-primary font-bold">حفظ</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTestimonials;

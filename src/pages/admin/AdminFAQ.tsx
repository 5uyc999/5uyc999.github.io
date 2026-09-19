import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  is_visible: boolean;
  sort_order: number | null;
}

const AdminFAQ = () => {
  const [items, setItems] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<FAQItem | null>(null);
  const [form, setForm] = useState({ question: "", answer: "" });
  const { toast } = useToast();

  const fetch = async () => {
    const { data } = await supabase.from("faq_items").select("*").order("sort_order");
    setItems((data as FAQItem[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const openNew = () => { setEditing(null); setForm({ question: "", answer: "" }); setDialogOpen(true); };
  const openEdit = (item: FAQItem) => { setEditing(item); setForm({ question: item.question, answer: item.answer }); setDialogOpen(true); };

  const handleSave = async () => {
    if (editing) {
      await supabase.from("faq_items").update(form).eq("id", editing.id);
      toast({ title: "تم التحديث" });
    } else {
      await supabase.from("faq_items").insert({ ...form, sort_order: items.length });
      toast({ title: "تم الإضافة" });
    }
    setDialogOpen(false);
    fetch();
  };

  const deleteItem = async (id: string) => {
    await supabase.from("faq_items").delete().eq("id", id);
    setItems(prev => prev.filter(i => i.id !== id));
    toast({ title: "تم الحذف" });
  };

  if (loading) return <div className="text-center py-10">جاري التحميل...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">الأسئلة الشائعة ({items.length})</h2>
        <Button onClick={openNew} className="bg-primary font-bold"><Plus className="h-4 w-4 ml-2" /> سؤال جديد</Button>
      </div>

      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4 flex items-start justify-between">
            <div>
              <p className="font-bold text-foreground">{item.question}</p>
              <p className="text-sm text-muted-foreground mt-1">{item.answer}</p>
            </div>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" onClick={() => openEdit(item)}><Edit className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteItem(item.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "تعديل السؤال" : "سؤال جديد"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="السؤال" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
            <Textarea placeholder="الإجابة" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={4} />
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

export default AdminFAQ;

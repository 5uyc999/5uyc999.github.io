import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { convertToWebP } from "@/lib/imageUtils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface GalleryImage {
  id: string;
  title: string | null;
  alt_text: string | null;
  image_url: string;
  category: string | null;
  is_visible: boolean;
  sort_order: number | null;
}

const categories = ["نقل", "تغليف", "فك وتركيب"];

const AdminGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: "", alt_text: "", category: "نقل" });
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const fetchImages = async () => {
    const { data } = await supabase.from("gallery_images").select("*").order("sort_order");
    setImages((data as GalleryImage[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchImages(); }, []);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    try {
      // Convert to WebP
      const webpBlob = await convertToWebP(file);
      const path = `gallery/${Date.now()}.webp`;

      const { error: uploadError } = await supabase.storage.from("media").upload(path, webpBlob, { contentType: "image/webp" });
      if (uploadError) {
        toast({ title: "خطأ في الرفع", description: uploadError.message, variant: "destructive" });
        setUploading(false);
        return;
      }

      const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);

      await supabase.from("gallery_images").insert({
        title: form.title,
        alt_text: form.alt_text || form.title,
        image_url: urlData.publicUrl,
        category: form.category,
        sort_order: images.length,
      });

      toast({ title: "تم إضافة الصورة (WebP)" });
      setDialogOpen(false);
      setFile(null);
      setForm({ title: "", alt_text: "", category: "نقل" });
      fetchImages();
    } catch (err) {
      toast({ title: "خطأ في تحويل الصورة", variant: "destructive" });
    }
    setUploading(false);
  };

  const deleteImage = async (img: GalleryImage) => {
    // Delete from storage
    const storagePath = img.image_url.split("/media/")[1];
    if (storagePath) await supabase.storage.from("media").remove([storagePath]);
    await supabase.from("gallery_images").delete().eq("id", img.id);
    setImages(prev => prev.filter(i => i.id !== img.id));
    toast({ title: "تم حذف الصورة" });
  };

  const toggleVisibility = async (img: GalleryImage) => {
    await supabase.from("gallery_images").update({ is_visible: !img.is_visible }).eq("id", img.id);
    setImages(prev => prev.map(i => i.id === img.id ? { ...i, is_visible: !i.is_visible } : i));
  };

  if (loading) return <div className="text-center py-10">جاري التحميل...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">المعرض ({images.length} صورة)</h2>
        <Button onClick={() => setDialogOpen(true)} className="bg-primary font-bold"><Plus className="h-4 w-4 ml-2" /> إضافة صورة</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <Card key={img.id} className={`overflow-hidden ${!img.is_visible ? "opacity-50" : ""}`}>
            <img src={img.image_url} alt={img.alt_text || ""} className="w-full h-40 object-cover" />
            <CardContent className="p-3">
              <p className="text-sm font-medium truncate">{img.title || "بدون عنوان"}</p>
              <p className="text-xs text-muted-foreground">{img.category}</p>
              <div className="flex gap-1 mt-2">
                <Button size="sm" variant="ghost" className="text-xs" onClick={() => toggleVisibility(img)}>
                  {img.is_visible ? "إخفاء" : "إظهار"}
                </Button>
                <Button size="sm" variant="ghost" className="text-destructive text-xs" onClick={() => deleteImage(img)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>إضافة صورة جديدة</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">{file ? file.name : "اضغط لاختيار صورة"}</p>
              </label>
            </div>
            <Input placeholder="عنوان الصورة" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Input placeholder="النص البديل (Alt)" value={form.alt_text} onChange={(e) => setForm({ ...form, alt_text: e.target.value })} />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>إلغاء</Button>
              <Button onClick={handleUpload} disabled={!file || uploading} className="bg-primary font-bold">
                {uploading ? "جاري الرفع..." : "رفع وحفظ"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminGallery;

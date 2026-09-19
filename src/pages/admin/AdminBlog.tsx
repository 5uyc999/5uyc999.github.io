import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { convertToWebP } from "@/lib/imageUtils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Upload, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  category: string | null;
  featured_image: string | null;
  tags: string[] | null;
  is_published: boolean;
  created_at: string;
}

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState({
    title: "", slug: "", content: "", excerpt: "", category: "",
    tags: "", is_published: false, featured_image: "",
  });
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const fetchPosts = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setPosts((data as BlogPost[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\u0621-\u064A-]/g, "").slice(0, 80);

  const autoGenerateMeta = (title: string, content: string) => {
    // Auto-generate excerpt from content
    const plainText = content.replace(/[#*\n]/g, " ").replace(/\s+/g, " ").trim();
    const excerpt = plainText.slice(0, 160);

    // Auto-generate tags from title and content
    const keywords = [
      "نقل أثاث", "نقل عفش", "الرياض", "تغليف", "فك وتركيب",
      "شركة نقل", "نقل أثاث بالرياض", "دينا نقل", "نقل عفش بالرياض",
    ];
    const combined = `${title} ${content}`.toLowerCase();
    const matchedTags = keywords.filter(k => combined.includes(k));
    // Add title words as tags
    const titleWords = title.split(/\s+/).filter(w => w.length > 3);
    const allTags = [...new Set([...matchedTags, ...titleWords.slice(0, 3)])];

    return { excerpt, tags: allTags.join(", ") };
  };

  const openNew = () => {
    setEditing(null);
    setForm({ title: "", slug: "", content: "", excerpt: "", category: "", tags: "", is_published: false, featured_image: "" });
    setDialogOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({
      title: post.title,
      slug: post.slug,
      content: post.content || "",
      excerpt: post.excerpt || "",
      category: post.category || "",
      tags: (post.tags || []).join(", "),
      is_published: post.is_published,
      featured_image: post.featured_image || "",
    });
    setDialogOpen(true);
  };

  const handleAutoMeta = () => {
    if (!form.title && !form.content) {
      toast({ title: "اكتب العنوان والمحتوى أولاً", variant: "destructive" });
      return;
    }
    const { excerpt, tags } = autoGenerateMeta(form.title, form.content);
    setForm(prev => ({
      ...prev,
      excerpt: prev.excerpt || excerpt,
      tags: prev.tags || tags,
      slug: prev.slug || generateSlug(prev.title),
    }));
    toast({ title: "تم توليد البيانات تلقائياً ✅" });
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const webpBlob = await convertToWebP(file);
      const path = `blog/${Date.now()}.webp`;
      const { error } = await supabase.storage.from("media").upload(path, webpBlob, { contentType: "image/webp" });
      if (error) {
        toast({ title: "خطأ في رفع الصورة", variant: "destructive" });
        setUploading(false);
        return;
      }
      const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);
      setForm(prev => ({ ...prev, featured_image: urlData.publicUrl }));
    } catch {
      toast({ title: "خطأ في تحويل الصورة", variant: "destructive" });
    }
    setUploading(false);
  };

  const handleSave = async () => {
    const slug = form.slug || generateSlug(form.title);
    const tags = form.tags.split(",").map(t => t.trim()).filter(Boolean);

    // Auto-generate meta if empty
    if (!form.excerpt && form.content) {
      const auto = autoGenerateMeta(form.title, form.content);
      form.excerpt = auto.excerpt;
    }

    const payload = {
      title: form.title,
      slug,
      content: form.content,
      excerpt: form.excerpt,
      category: form.category,
      featured_image: form.featured_image || null,
      tags: tags.length > 0 ? tags : null,
      is_published: form.is_published,
      published_at: form.is_published ? new Date().toISOString() : null,
    };

    if (editing) {
      await supabase.from("blog_posts").update(payload).eq("id", editing.id);
      toast({ title: "تم تحديث المقال" });
    } else {
      await supabase.from("blog_posts").insert(payload);
      toast({ title: "تم إضافة المقال" });
    }
    setDialogOpen(false);
    fetchPosts();
  };

  const deletePost = async (id: string) => {
    await supabase.from("blog_posts").delete().eq("id", id);
    setPosts(prev => prev.filter(p => p.id !== id));
    toast({ title: "تم حذف المقال" });
  };

  if (loading) return <div className="text-center py-10">جاري التحميل...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">المقالات ({posts.length})</h2>
        <Button onClick={openNew} className="bg-primary font-bold"><Plus className="h-4 w-4 ml-2" /> مقال جديد</Button>
      </div>

      {posts.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">لا توجد مقالات بعد. اضغط "مقال جديد" للبدء.</CardContent></Card>
      ) : (
        posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {post.featured_image && (
                  <img src={post.featured_image} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-foreground">{post.title}</span>
                    <Badge variant={post.is_published ? "default" : "secondary"}>
                      {post.is_published ? "منشور" : "مسودة"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{new Date(post.created_at).toLocaleDateString("ar-SA")}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => openEdit(post)}><Edit className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deletePost(post.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "تعديل المقال" : "مقال جديد"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="عنوان المقال" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })} />
            <Input placeholder="الرابط (slug)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} dir="ltr" />
            <Input placeholder="التصنيف" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />

            {/* Featured Image */}
            <div>
              <label className="text-sm font-medium block mb-1">الصورة البارزة</label>
              {form.featured_image && (
                <div className="relative mb-2">
                  <img src={form.featured_image} alt="" className="w-full h-40 rounded-lg object-cover" />
                  <Button size="sm" variant="destructive" className="absolute top-2 left-2" onClick={() => setForm(prev => ({ ...prev, featured_image: "" }))}>حذف</Button>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" id="blog-img" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); }} />
              <label htmlFor="blog-img" className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background text-sm hover:bg-muted">
                <Upload className="h-4 w-4" /> {uploading ? "جاري الرفع..." : "رفع صورة"}
              </label>
            </div>

            <Textarea placeholder="الوصف المختصر (يتم توليده تلقائياً)" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} />
            <Input placeholder="الكلمات المفتاحية (مفصولة بفاصلة)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            <Textarea placeholder="المحتوى (يدعم التنسيق: ## عنوان، **عريض**، - قائمة)" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={12} />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
                نشر المقال
              </label>
              <Button variant="outline" size="sm" onClick={handleAutoMeta} className="gap-1">
                <Wand2 className="h-4 w-4" /> توليد البيانات تلقائياً
              </Button>
            </div>

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

export default AdminBlog;

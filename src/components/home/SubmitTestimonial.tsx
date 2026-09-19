import { useState } from "react";
import { z } from "zod";
import { Star, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(2, "الاسم قصير جداً").max(60, "الاسم طويل"),
  city: z.string().trim().max(60, "اسم المدينة طويل").optional(),
  text: z.string().trim().min(1, "اكتب تقييمك").max(500, "التقييم طويل جداً"),
  rating: z.number().int().min(1).max(5),
});

const SubmitTestimonial = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, city: city || undefined, text, rating });
    if (!parsed.success) {
      toast({ title: "من فضلك راجع البيانات", description: parsed.error.errors[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("testimonials").insert({
      name: parsed.data.name,
      city: parsed.data.city || null,
      text: parsed.data.text,
      rating: parsed.data.rating,
      is_visible: false,
      sort_order: 999,
    });
    setLoading(false);
    if (error) {
      toast({ title: "حدث خطأ", description: "تعذر إرسال التقييم، حاول لاحقاً", variant: "destructive" });
      return;
    }
    setSubmitted(true);
    setName(""); setCity(""); setText(""); setRating(5);
    toast({ title: "شكراً لك!", description: "تم استلام تقييمك وسيظهر بعد المراجعة." });
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="border-2 border-secondary/30 shadow-gold">
            <CardContent className="p-6 md:p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-black text-primary mb-2">شاركنا تجربتك</h2>
                <p className="text-muted-foreground text-sm md:text-base">تقييمك يساعد غيرك ويحفزنا على تقديم الأفضل</p>
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-16 w-16 text-secondary mx-auto mb-3" />
                  <p className="font-bold text-lg text-foreground mb-1">تم إرسال تقييمك بنجاح</p>
                  <p className="text-sm text-muted-foreground mb-4">سيظهر بعد مراجعته من الفريق.</p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>إضافة تقييم آخر</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col items-center gap-2 py-2">
                    <span className="text-sm text-muted-foreground">تقييمك</span>
                    <div className="flex gap-1" dir="ltr">
                      {[1,2,3,4,5].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRating(r)}
                          onMouseEnter={() => setHover(r)}
                          onMouseLeave={() => setHover(0)}
                          className="transition-transform hover:scale-110"
                          aria-label={`${r} نجوم`}
                        >
                          <Star className={`h-8 w-8 md:h-9 md:w-9 ${r <= (hover || rating) ? "text-secondary fill-secondary" : "text-muted stroke-muted-foreground/40"}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input placeholder="الاسم *" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} required />
                    <Input placeholder="المدينة / الحي (اختياري)" value={city} onChange={(e) => setCity(e.target.value)} maxLength={60} />
                  </div>

                  <Textarea placeholder="اكتب رأيك في الخدمة..." value={text} onChange={(e) => setText(e.target.value)} rows={4} maxLength={500} required />
                  <div className="text-xs text-muted-foreground text-left">{text.length}/500</div>

                  <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black h-12 text-base">
                    <Send className="ml-2 h-4 w-4" />
                    {loading ? "جاري الإرسال..." : "إرسال التقييم"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">* يتم مراجعة كل التقييمات قبل نشرها لضمان مصداقيتها.</p>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default SubmitTestimonial;

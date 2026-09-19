import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowLeft } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  featured_image: string | null;
  published_at: string | null;
  created_at: string;
}

const staticPosts: BlogPost[] = [
  {
    id: "s1", slug: "tips-moving-furniture-riyadh",
    title: "10 نصائح ذهبية لنقل الأثاث بأمان في الرياض",
    excerpt: "تعرف على أهم النصائح التي تساعدك في نقل أثاثك بأمان وبدون أي مشاكل سواء كنت تنقل داخل الرياض أو خارجها.",
    published_at: "2026-03-10", created_at: "2026-03-10", category: "نصائح", featured_image: null,
  },
  {
    id: "s2", slug: "how-to-choose-moving-company",
    title: "كيف تختار أفضل شركة نقل أثاث بالرياض؟",
    excerpt: "دليل شامل يساعدك في اختيار شركة نقل الأثاث المناسبة مع أهم المعايير التي يجب مراعاتها.",
    published_at: "2026-03-05", created_at: "2026-03-05", category: "أدلة", featured_image: null,
  },
  {
    id: "s3", slug: "furniture-packing-guide",
    title: "دليل تغليف الأثاث الاحترافي - كل ما تحتاج معرفته",
    excerpt: "تعلم كيفية تغليف أثاثك بشكل احترافي لحمايته من الخدوش والكسور أثناء النقل.",
    published_at: "2026-02-28", created_at: "2026-02-28", category: "أدلة", featured_image: null,
  },
];

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, category, featured_image, published_at, created_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      if (data && data.length > 0) {
        setPosts(data);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const displayPosts = posts.length > 0 ? posts : staticPosts;

  return (
    <>
      <Helmet>
        <title>مدونة نقل الأثاث - نصائح وأدلة شاملة | مؤسسة لمس بالرياض</title>
        <meta name="description" content="مقالات ونصائح احترافية حول نقل الأثاث بالرياض. كيف تختار شركة نقل، نصائح التغليف، أفضل طرق فك وتركيب الأثاث وأكثر." />
        <meta name="keywords" content="مدونة نقل أثاث, نصائح نقل عفش, كيف تختار شركة نقل, نصائح تغليف أثاث, دليل نقل الأثاث, مقالات نقل عفش بالرياض" />
        <link rel="canonical" href="https://lams.sooftit.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lams.sooftit.com/blog" />
        <meta property="og:title" content="مدونة نقل الأثاث - نصائح وأدلة | مؤسسة لمس بالرياض" />
        <meta property="og:description" content="مقالات ونصائح احترافية حول نقل الأثاث بالرياض. كيف تختار شركة نقل، نصائح التغليف، وأكثر." />
        <meta property="og:image" content="https://lams.sooftit.com/og-image.jpg" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:site_name" content="مؤسسة لمس لنقل الأثاث" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="مدونة نقل الأثاث - نصائح وأدلة | مؤسسة لمس" />
        <meta name="twitter:description" content="مقالات ونصائح احترافية حول نقل الأثاث بالرياض." />
        <meta name="twitter:image" content="https://lams.sooftit.com/og-image.jpg" />
      </Helmet>
      <div>
      <section className="bg-navy-gradient text-white py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black mb-4">المدونة</h1>
            <p className="text-lg text-white/80">مقالات ونصائح احترافية في مجال نقل الأثاث</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          {loading ? (
            <div className="text-center py-10 text-muted-foreground">جاري التحميل...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full hover:shadow-gold transition-shadow group overflow-hidden">
                    {post.featured_image && (
                      <img src={post.featured_image} alt={post.title} className="w-full h-48 object-cover" loading="lazy" />
                    )}
                    <CardContent className="p-6">
                      {post.category && (
                        <span className="inline-block bg-secondary/20 text-secondary text-xs font-bold px-3 py-1 rounded-full mb-3">
                          {post.category}
                        </span>
                      )}
                      <h2 className="text-lg font-bold mb-2 group-hover:text-secondary transition-colors">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{new Date(post.published_at || post.created_at).toLocaleDateString("ar-SA")}</span>
                        </div>
                        <Link to={`/blog/${post.slug}`} className="flex items-center gap-1 font-bold text-primary hover:text-secondary">
                          اقرأ المزيد <ArrowLeft className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      </div>
    </>
  );
};

export default Blog;

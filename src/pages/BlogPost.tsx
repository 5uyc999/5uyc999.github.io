import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, ArrowRight, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useCompanySettings } from "@/hooks/useCompanySettings";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  category: string | null;
  featured_image: string | null;
  tags: string[] | null;
  published_at: string | null;
  created_at: string;
}

const ShareButtons = ({ url, title }: { url: string; title: string }) => {
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const socials = [
    { name: "واتساب", color: "bg-[#25D366]", href: `https://wa.me/?text=${encodedTitle}%20${encoded}`, icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    )},
    { name: "فيسبوك", color: "bg-[#1877F2]", href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`, icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    )},
    { name: "تويتر", color: "bg-black", href: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`, icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    )},
    { name: "تيليجرام", color: "bg-[#0088cc]", href: `https://t.me/share/url?url=${encoded}&text=${encodedTitle}`, icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
    )},
    { name: "لينكدإن", color: "bg-[#0A66C2]", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`, icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    )},
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-bold text-muted-foreground flex items-center gap-1"><Share2 className="h-4 w-4" /> مشاركة:</span>
      {socials.map(s => (
        <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className={`${s.color} text-white w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity`} aria-label={`مشاركة عبر ${s.name}`}>
          {s.icon}
        </a>
      ))}
    </div>
  );
};

// SEO overrides for articles that already rank close to page one (titles/meta tuned for CTR
// + contextual internal links). Canonical stays self-referencing to /blog/{slug}.
const POST_SEO: Record<string, { title: string; description: string; links: Array<{ label: string; href: string }> }> = {
  "tarteeb-manzil-jadeed-baad-naql": {
    title: "ترتيب المنزل الجديد بعد النقل | خطة عملية خطوة بخطوة",
    description:
      "كيف ترتب منزلك الجديد بعد نقل العفش؟ ترتيب الغرف حسب الأولوية، فتح الكراتين بالترتيب الصحيح، وإعادة تركيب الأثاث بسرعة ودون فوضى.",
    links: [
      { label: "فك وتركيب الأثاث في المنزل الجديد", href: "/services/assembly-disassembly" },
      { label: "تغليف الأثاث قبل النقل", href: "/services/packing" },
      { label: "نقل أثاث داخل الرياض", href: "/services/moving-inside-riyadh" },
      { label: "قائمة تجهيز المنزل قبل النقل", href: "/guides/moving-checklist-riyadh" },
    ],
  },
  "afdal-waqt-naql-athath-riyadh": {
    title: "أفضل وقت لنقل الأثاث بالرياض | الشهر واليوم والساعة",
    description:
      "متى تنقل عفشك في الرياض؟ أفضل أشهر وأيام وساعات النقل، وتأثير الحرارة والزحام ومواسم الإيجار على الموعد والتكلفة.",
    links: [
      { label: "نقل أثاث داخل الرياض", href: "/services/moving-inside-riyadh" },
      { label: "أسعار نقل العفش بالرياض", href: "/guides/furniture-moving-prices-riyadh" },
      { label: "تغليف الأثاث قبل النقل", href: "/services/packing" },
      { label: "دينا نقل عفش بالرياض", href: "/services/dyna-moving-riyadh" },
    ],
  },
};



const BlogPostPage = () => {
  const { settings: COMPANY } = useCompanySettings();
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      setPost(data as Post | null);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin" /></div>;

  if (!post) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-3xl font-black mb-4">المقال غير موجود</h1>
      <Button asChild><Link to="/blog">العودة للمدونة</Link></Button>
    </div>
  );

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const seo = POST_SEO[post.slug];
  const metaTitle = seo?.title || `${post.title} | مدونة مؤسسة لمس لنقل الأثاث`;
  const metaDescription = seo?.description || post.excerpt || post.title;

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={post.tags ? post.tags.join(", ") : "نقل أثاث بالرياض, مدونة نقل عفش"} />
        <link rel="canonical" href={`https://lams.sooftit.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://lams.sooftit.com/blog/${post.slug}`} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={post.featured_image || "https://lams.sooftit.com/og-image.jpg"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:site_name" content="مؤسسة لمس لنقل الأثاث" />
        <meta property="article:published_time" content={post.published_at || post.created_at} />
        {post.category && <meta property="article:section" content={post.category} />}
        {post.tags && post.tags.map(tag => <meta key={tag} property="article:tag" content={tag} />)}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={post.featured_image || "https://lams.sooftit.com/og-image.jpg"} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "description": post.excerpt || post.title,
          "url": `https://lams.sooftit.com/blog/${post.slug}`,
          "image": post.featured_image || "https://lams.sooftit.com/og-image.jpg",
          "datePublished": post.published_at || post.created_at,
          "author": { "@type": "Organization", "name": "مؤسسة لمس لنقل الأثاث", "url": "https://lams.sooftit.com" },
          "publisher": { "@type": "Organization", "name": "مؤسسة لمس لنقل الأثاث", "logo": { "@type": "ImageObject", "url": "https://lams.sooftit.com/favicon-192.png" } },
          "mainEntityOfPage": { "@type": "WebPage", "@id": `https://lams.sooftit.com/blog/${post.slug}` },
          ...(post.category && { "articleSection": post.category }),
          ...(post.tags && { "keywords": post.tags.join(", ") }),
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://lams.sooftit.com/" },
            { "@type": "ListItem", "position": 2, "name": "المدونة", "item": "https://lams.sooftit.com/blog" },
            { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://lams.sooftit.com/blog/${post.slug}` },
          ]
        })}</script>
      </Helmet>

      <article>
        {/* Hero */}
        <section className="bg-navy-gradient text-white py-16">
          <div className="container max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-6">
                <Link to="/blog" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm">
                  <ArrowRight className="h-4 w-4" /> العودة للمدونة
                </Link>
                {post.category && (
                  <span className="inline-block bg-secondary/20 text-secondary text-xs font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 text-white/70 text-sm">
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(post.published_at || post.created_at).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="container max-w-4xl mt-8">
            <img src={post.featured_image} alt={post.title} className="w-full rounded-2xl shadow-xl object-cover max-h-[500px]" />
          </div>
        )}

        {/* Content */}
        <section className="py-12">
          <div className="container max-w-4xl">
            <div className="prose prose-lg max-w-none text-foreground leading-[2] text-right" dir="rtl"
              dangerouslySetInnerHTML={{ __html: formatContent(post.content || "") }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
                {post.tags.map(tag => (
                  <span key={tag} className="bg-muted text-muted-foreground text-xs font-medium px-3 py-1.5 rounded-full">#{tag}</span>
                ))}
              </div>
            )}

            {seo && (
              <div className="mt-10 rounded-2xl border border-border p-6">
                <h2 className="text-xl font-black mb-4">خدمات وأدلة تكمل هذا المقال</h2>
                <ul className="space-y-2 list-disc pr-6">
                  {seo.links.map((l) => (
                    <li key={l.href}>
                      <Link to={l.href} className="font-bold text-primary hover:text-secondary underline underline-offset-4">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}


            {/* Share */}
            <div className="mt-8 pt-6 border-t border-border">
              <ShareButtons url={currentUrl} title={post.title} />
            </div>

            {/* CTA */}
            <div className="mt-12 bg-gold-gradient rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-black text-primary mb-3">تحتاج خدمة نقل أثاث؟</h3>
              <p className="text-primary/80 mb-6">تواصل معنا الآن واحصل على عرض سعر مجاني</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="bg-primary text-primary-foreground font-bold">
                  <a href={`tel:${COMPANY.phone}`} data-ads-conversion="phone">اتصل الآن</a>
                </Button>
                <Button asChild className="bg-[#25D366] text-white hover:bg-[#25D366]/90 font-bold">
                  <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer" data-ads-conversion="whatsapp">واتساب</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

function formatContent(content: string): string {
  // Convert markdown-like content to HTML
  let html = content
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mt-8 mb-3 text-foreground">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-black mt-10 mb-4 text-foreground">$1</h2>')
    .replace(/^# (.+)$/gm, '<h2 class="text-2xl font-black mt-10 mb-4 text-foreground">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p class="mb-4 text-muted-foreground">')
    .replace(/\n- /g, '</p><li class="mr-6 mb-2 text-muted-foreground list-disc">');
  
  if (!html.startsWith('<')) html = '<p class="mb-4 text-muted-foreground">' + html;
  if (!html.endsWith('>')) html += '</p>';
  
  return html;
}

export default BlogPostPage;

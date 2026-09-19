import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const SITE_URL = "https://lams.sooftit.com";
const SITE_NAME = "مؤسسة لمس لنقل الأثاث";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const DEFAULT_DESCRIPTION = "مؤسسة لمس لنقل الأثاث بالرياض - أفضل شركة نقل أثاث داخل وخارج الرياض مع خدمات فك وتركيب وتغليف احترافية. اتصل الآن 0503689200";

// Static page meta data
const PAGE_META: Record<string, { title: string; description: string; image?: string }> = {
  "/": {
    title: "مؤسسة لمس لنقل الأثاث بالرياض | نقل عفش آمن وسريع",
    description: "مؤسسة لمس أفضل شركة نقل أثاث بالرياض. نقل عفش داخل وخارج الرياض مع فك وتركيب وتغليف احترافي. اتصل الآن 0503689200",
  },
  "/about": {
    title: "من نحن - مؤسسة لمس لنقل الأثاث بالرياض | خبرة +10 سنوات",
    description: "تعرف على مؤسسة لمس لنقل الأثاث بالرياض. خبرة أكثر من 10 سنوات في نقل العفش والأثاث مع فريق محترف وسيارات مجهزة.",
  },
  "/services": {
    title: "خدمات نقل الأثاث بالرياض | فك وتركيب وتغليف | مؤسسة لمس",
    description: "خدمات نقل أثاث احترافية بالرياض: نقل داخلي وخارجي، فك وتركيب، تغليف احترافي، نقل مكاتب. عرض سعر مجاني.",
  },
  "/services/moving-inside-riyadh": {
    title: "نقل أثاث داخل الرياض | مؤسسة لمس لنقل الأثاث",
    description: "نقدم خدمة نقل الأثاث داخل جميع أحياء الرياض بأعلى معايير الجودة والأمان. فريقنا المتخصص يضمن لك تجربة نقل سلسة وسريعة.",
  },
  "/services/moving-outside-riyadh": {
    title: "نقل أثاث خارج الرياض | مؤسسة لمس لنقل الأثاث",
    description: "خدمة نقل أثاث موثوقة من الرياض إلى جميع مدن المملكة العربية السعودية بسيارات مجهزة ومؤمنة.",
  },
  "/services/assembly-disassembly": {
    title: "فك وتركيب الأثاث باحترافية | مؤسسة لمس بالرياض",
    description: "فنيون متخصصون في فك وتركيب جميع أنواع الأثاث بدقة عالية. غرف نوم، مطابخ، مكيفات، ستائر.",
  },
  "/services/packing": {
    title: "تغليف أثاث احترافي | مؤسسة لمس لنقل الأثاث بالرياض",
    description: "تغليف احترافي بمواد عالية الجودة لحماية أثاثك من أي خدش أو كسر أثناء النقل.",
  },
  "/services/office-moving": {
    title: "نقل مكاتب بالرياض | مؤسسة لمس لنقل الأثاث",
    description: "خدمة نقل مكاتب متكاملة تشمل فك وتركيب الأثاث المكتبي، نقل أجهزة الكمبيوتر والطابعات.",
  },
  "/gallery": {
    title: "معرض أعمال نقل الأثاث بالرياض | صور حقيقية | مؤسسة لمس",
    description: "شاهد صور حقيقية من أعمال مؤسسة لمس في نقل وتركيب وتغليف الأثاث بالرياض.",
  },
  "/videos": {
    title: "فيديوهات نقل الأثاث بالرياض | مؤسسة لمس",
    description: "شاهد فيديوهات حقيقية من أعمال مؤسسة لمس في نقل الأثاث بالرياض.",
  },
  "/blog": {
    title: "مدونة نقل الأثاث - نصائح وأدلة شاملة | مؤسسة لمس بالرياض",
    description: "مقالات ونصائح احترافية حول نقل الأثاث بالرياض. كيف تختار شركة نقل، نصائح التغليف، وأكثر.",
  },
  "/testimonials": {
    title: "آراء وتقييمات عملاء مؤسسة لمس لنقل الأثاث بالرياض",
    description: "اقرأ تقييمات عملائنا الحقيقية عن خدمات نقل الأثاث بالرياض. أكثر من 1000 عميل راضٍ.",
  },
  "/faq": {
    title: "الأسئلة الشائعة عن نقل الأثاث بالرياض | مؤسسة لمس",
    description: "إجابات على أكثر الأسئلة شيوعاً حول نقل الأثاث بالرياض: الأسعار، التغليف، فك وتركيب.",
  },
  "/contact": {
    title: "اتصل بنا - مؤسسة لمس لنقل الأثاث بالرياض | 0503689200",
    description: "تواصل مع مؤسسة لمس لنقل الأثاث بالرياض. اتصل أو واتساب للحصول على عرض سعر مجاني.",
  },
  "/get-quote": {
    title: "طلب عرض سعر نقل أثاث بالرياض مجاناً | مؤسسة لمس",
    description: "احصل على عرض سعر مجاني لنقل أثاثك بالرياض. نقل عفش داخل وخارج الرياض مع فك وتركيب وتغليف.",
  },
  "/service-areas": {
    title: "مناطق خدمة نقل الأثاث بالرياض | جميع الأحياء | مؤسسة لمس",
    description: "نغطي جميع أحياء الرياض: شمال، جنوب، شرق، غرب ووسط الرياض. نقل عفش سريع وآمن.",
  },
  "/privacy": {
    title: "سياسة الخصوصية | مؤسسة لمس لنقل الأثاث بالرياض",
    description: "سياسة الخصوصية لموقع مؤسسة لمس لنقل الأثاث بالرياض.",
  },
  "/terms": {
    title: "الشروط والأحكام | مؤسسة لمس لنقل الأثاث بالرياض",
    description: "الشروط والأحكام لخدمات مؤسسة لمس لنقل الأثاث بالرياض.",
  },
};

function generateHTML(meta: { title: string; description: string; image: string; url: string; type?: string; article?: { published_time?: string; section?: string; tags?: string[] } }): string {
  const articleMeta = meta.article ? `
    <meta property="article:published_time" content="${meta.article.published_time || ""}" />
    ${meta.article.section ? `<meta property="article:section" content="${meta.article.section}" />` : ""}
    ${meta.article.tags ? meta.article.tags.map(t => `<meta property="article:tag" content="${t}" />`).join("\n    ") : ""}
  ` : "";

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}" />
  <link rel="canonical" href="${meta.url}" />

  <meta property="og:type" content="${meta.type || "website"}" />
  <meta property="og:url" content="${meta.url}" />
  <meta property="og:title" content="${meta.title}" />
  <meta property="og:description" content="${meta.description}" />
  <meta property="og:image" content="${meta.image}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="ar_SA" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="fb:app_id" content="26328282186824990" />
  ${articleMeta}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${meta.title}" />
  <meta name="twitter:description" content="${meta.description}" />
  <meta name="twitter:image" content="${meta.image}" />

  <meta http-equiv="refresh" content="0;url=${meta.url}" />
</head>
<body>
  <p><a href="${meta.url}">${meta.title}</a></p>
</body>
</html>`;
}

Deno.serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.searchParams.get("path") || "/";

    // Check if it's a blog post
    if (path.startsWith("/blog/") && path.length > 6) {
      const slug = path.replace("/blog/", "");

      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data: post } = await supabase
        .from("blog_posts")
        .select("title, excerpt, featured_image, published_at, created_at, category, tags")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (post) {
        const html = generateHTML({
          title: `${post.title} | مدونة مؤسسة لمس لنقل الأثاث`,
          description: post.excerpt || post.title,
          image: post.featured_image || DEFAULT_OG_IMAGE,
          url: `${SITE_URL}${path}`,
          type: "article",
          article: {
            published_time: post.published_at || post.created_at,
            section: post.category || undefined,
            tags: post.tags || undefined,
          },
        });
        return new Response(html, {
          headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      }
    }

    // Static pages
    const pageMeta = PAGE_META[path] || PAGE_META["/"];
    const html = generateHTML({
      title: pageMeta.title,
      description: pageMeta.description,
      image: pageMeta.image || DEFAULT_OG_IMAGE,
      url: `${SITE_URL}${path}`,
    });

    return new Response(html, {
      headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=3600" },
    });
  } catch (error) {
    const html = generateHTML({
      title: "مؤسسة لمس لنقل الأثاث بالرياض",
      description: DEFAULT_DESCRIPTION,
      image: DEFAULT_OG_IMAGE,
      url: SITE_URL,
    });
    return new Response(html, {
      headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
    });
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all dynamic data in parallel
    const [settingsRes, faqRes, testimonialsRes, blogRes] = await Promise.all([
      supabase.from("company_settings").select("key, value"),
      supabase.from("faq_items").select("question, answer").eq("is_visible", true).order("sort_order"),
      supabase.from("testimonials").select("name, text, city, rating").eq("is_visible", true).order("sort_order").limit(10),
      supabase.from("blog_posts").select("title, excerpt, category").eq("is_published", true).order("created_at", { ascending: false }).limit(10),
    ]);

    // Build settings map
    const s: Record<string, string> = {};
    if (settingsRes.data) for (const r of settingsRes.data) s[r.key] = r.value || "";

    const phone = s["phone"] || "0503689200";
    const whatsapp = s["whatsapp"] || "966503689200";
    const companyName = s["company_name"] || "مؤسسة لمس لنقل الأثاث";
    const workHours = s["work_hours"] || "السبت - الخميس: 8 صباحاً - 10 مساءً";

    // Build FAQ section
    let faqSection = "";
    if (faqRes.data?.length) {
      faqSection = "\n\nالأسئلة الشائعة:\n" + faqRes.data.map((f, i) => `${i + 1}. س: ${f.question}\n   ج: ${f.answer}`).join("\n");
    }

    // Build testimonials section
    let testimonialsSection = "";
    if (testimonialsRes.data?.length) {
      testimonialsSection = "\n\nآراء العملاء:\n" + testimonialsRes.data.map(t => `- ${t.name}${t.city ? ` (${t.city})` : ""}: "${t.text}" - تقييم: ${t.rating}/5`).join("\n");
    }

    // Build blog section
    let blogSection = "";
    if (blogRes.data?.length) {
      blogSection = "\n\nمقالات المدونة المتاحة:\n" + blogRes.data.map(b => `- ${b.title}${b.category ? ` [${b.category}]` : ""}${b.excerpt ? `: ${b.excerpt.slice(0, 80)}` : ""}`).join("\n");
    }

    // Service areas
    const serviceAreas = `
مناطق الخدمة:
- داخل الرياض: جميع الأحياء (شمال، جنوب، شرق، غرب، وسط)
- أحياء مخدومة: النرجس، الياسمين، الرمال، المونسية، العليا، الملقا، حطين، الصحافة، النخيل، الربيع، الورود، السلي، الشفا، العزيزية، المروج، الروضة، النسيم، الخليج، الملك فهد، السويدي، لبن، طويق، الدار البيضاء، نمار، عرقة
- خارج الرياض: جميع مدن المملكة (جدة، مكة، المدينة، الدمام، الخبر، أبها، تبوك، حائل، القصيم، الطائف، وغيرها)`;

    const systemPrompt = `أنت مساعد ${companyName} بالرياض. أنت ودود ومحترف وتساعد العملاء.

معلومات عن المؤسسة:
- الاسم: ${companyName}
- الموقع: الرياض، المملكة العربية السعودية
- الهاتف: ${phone}
- واتساب: ${whatsapp}
- ساعات العمل: ${workHours}

الخدمات المتاحة:
1. نقل أثاث داخل الرياض - نقل احترافي لجميع أحياء الرياض
2. نقل أثاث خارج الرياض - من الرياض لجميع مدن المملكة
3. فك وتركيب الأثاث - فنيون متخصصون بدقة عالية
4. تغليف الأثاث - تغليف بمواد عالية الجودة
5. نقل مكاتب بالرياض - نقل احترافي للشركات والمكاتب

المميزات:
- أمان تام وضمان سلامة الأثاث
- سرعة في التنفيذ
- أسعار منافسة
- فريق متخصص ومدرب
- خبرة طويلة في المجال
- دعم متواصل
${serviceAreas}${faqSection}${testimonialsSection}${blogSection}

قواعد الرد:
- أجب باللغة العربية دائماً
- كن مختصراً ومفيداً
- إذا سأل العميل عن سؤال موجود في الأسئلة الشائعة، أجب من هناك
- إذا سأل العميل عن السعر، أخبره أن الأسعار تعتمد على كمية الأثاث والمسافة وأنصحه بالتواصل للحصول على عرض سعر مجاني
- إذا سأل عن منطقة أو حي معين، تحقق من مناطق الخدمة وأكد أنكم تخدمون هذا الحي
- شجع العميل على التواصل عبر الهاتف أو الواتساب
- لا تختلق معلومات غير موجودة
- يمكنك الإشارة لآراء العملاء الإيجابية عند الحاجة لبناء الثقة
- يمكنك اقتراح مقالات المدونة ذات الصلة إذا سأل العميل عن نصائح`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "عذراً، يرجى المحاولة بعد قليل" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "الخدمة غير متاحة حالياً" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "حدث خطأ" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Terms = () => (
  <>
    <Helmet>
      <title>الشروط والأحكام | مؤسسة لمس لنقل الأثاث بالرياض</title>
      <meta name="description" content="الشروط والأحكام لخدمات مؤسسة لمس لنقل الأثاث بالرياض. تعرف على شروط الخدمة والمسؤولية والإلغاء والأسعار." />
      <link rel="canonical" href="https://lams.sooftit.com/terms" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://lams.sooftit.com/terms" />
      <meta property="og:title" content="الشروط والأحكام | مؤسسة لمس لنقل الأثاث" />
      <meta property="og:description" content="الشروط والأحكام لخدمات مؤسسة لمس لنقل الأثاث بالرياض." />
      <meta property="og:image" content="https://lams.sooftit.com/og-image.jpg" />
      <meta property="og:locale" content="ar_SA" />
      <meta property="og:site_name" content="مؤسسة لمس لنقل الأثاث" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="الشروط والأحكام | مؤسسة لمس لنقل الأثاث" />
      <meta name="twitter:description" content="الشروط والأحكام لخدمات مؤسسة لمس لنقل الأثاث بالرياض." />
      <meta name="twitter:image" content="https://lams.sooftit.com/og-image.jpg" />
    </Helmet>
    <div>
      <section className="bg-navy-gradient text-white py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-black mb-4">الشروط والأحكام</h1>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container max-w-3xl">
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <h2 className="text-2xl font-bold text-foreground">شروط الاستخدام</h2>
            <p>باستخدامك لموقع مؤسسة لمس لنقل الأثاث، فإنك توافق على الالتزام بالشروط والأحكام التالية.</p>
            
            <h2 className="text-2xl font-bold text-foreground">الخدمات</h2>
            <p>تقدم مؤسسة لمس خدمات نقل الأثاث داخل وخارج الرياض وتشمل: النقل، الفك والتركيب، والتغليف. تخضع جميع الخدمات للاتفاق المسبق بين الطرفين على التفاصيل والأسعار.</p>
            
            <h2 className="text-2xl font-bold text-foreground">المسؤولية</h2>
            <p>تلتزم المؤسسة بالحفاظ على سلامة الأثاث أثناء عملية النقل وتتحمل المسؤولية الكاملة عن أي أضرار ناتجة عن إهمال فريق العمل.</p>
            
            <h2 className="text-2xl font-bold text-foreground">الإلغاء والتعديل</h2>
            <p>يمكن للعميل إلغاء أو تعديل الحجز قبل 24 ساعة على الأقل من الموعد المحدد دون أي رسوم إضافية.</p>
            
            <h2 className="text-2xl font-bold text-foreground">الأسعار</h2>
            <p>يتم تحديد الأسعار بناءً على المعاينة وتقدير حجم الأثاث والمسافة. الأسعار المعروضة هي أسعار تقديرية وقد تختلف حسب الظروف الفعلية.</p>
          </div>
        </div>
      </section>
    </div>
  </>
);

export default Terms;

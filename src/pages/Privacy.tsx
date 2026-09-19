import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Privacy = () => (
  <>
    <Helmet>
      <title>سياسة الخصوصية | مؤسسة لمس لنقل الأثاث بالرياض</title>
      <meta name="description" content="سياسة الخصوصية لموقع مؤسسة لمس لنقل الأثاث بالرياض. نحترم خصوصية زوارنا ونلتزم بحماية بياناتهم الشخصية." />
      <link rel="canonical" href="https://lams.sooftit.com/privacy" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://lams.sooftit.com/privacy" />
      <meta property="og:title" content="سياسة الخصوصية | مؤسسة لمس لنقل الأثاث" />
      <meta property="og:description" content="سياسة الخصوصية لموقع مؤسسة لمس لنقل الأثاث بالرياض." />
      <meta property="og:image" content="https://lams.sooftit.com/og-image.jpg" />
      <meta property="og:locale" content="ar_SA" />
      <meta property="og:site_name" content="مؤسسة لمس لنقل الأثاث" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="سياسة الخصوصية | مؤسسة لمس لنقل الأثاث" />
      <meta name="twitter:description" content="سياسة الخصوصية لموقع مؤسسة لمس لنقل الأثاث بالرياض." />
      <meta name="twitter:image" content="https://lams.sooftit.com/og-image.jpg" />
    </Helmet>
    <div>
      <section className="bg-navy-gradient text-white py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-black mb-4">سياسة الخصوصية</h1>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container max-w-3xl prose prose-lg">
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <h2 className="text-2xl font-bold text-foreground">مقدمة</h2>
            <p>نحن في مؤسسة لمس لنقل الأثاث نحترم خصوصية زوار موقعنا الإلكتروني ونلتزم بحماية بياناتهم الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات التي نحصل عليها من خلال موقعنا.</p>
            
            <h2 className="text-2xl font-bold text-foreground">المعلومات التي نجمعها</h2>
            <p>نجمع المعلومات التي تقدمها لنا طوعاً عند ملء نماذج التواصل أو طلب الخدمة، مثل: الاسم، رقم الهاتف، البريد الإلكتروني، ونوع الخدمة المطلوبة.</p>
            
            <h2 className="text-2xl font-bold text-foreground">استخدام المعلومات</h2>
            <p>نستخدم المعلومات المجمعة للتواصل معك بخصوص طلبات الخدمة والاستفسارات، وتحسين خدماتنا وتجربة المستخدم على الموقع.</p>
            
            <h2 className="text-2xl font-bold text-foreground">حماية المعلومات</h2>
            <p>نتخذ إجراءات أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو الاستخدام غير القانوني.</p>
            
            <h2 className="text-2xl font-bold text-foreground">التواصل</h2>
            <p>للاستفسار عن سياسة الخصوصية، يرجى التواصل معنا عبر صفحة اتصل بنا.</p>
          </div>
        </div>
      </section>
    </div>
  </>
);

export default Privacy;

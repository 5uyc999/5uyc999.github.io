import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SectionHeading from "@/components/ui/section-heading";

const Videos = () => {
  return (
    <>
      <Helmet>
        <title>فيديوهات نقل الأثاث بالرياض | مؤسسة لمس</title>
        <meta name="description" content="شاهد فيديوهات حقيقية من أعمال مؤسسة لمس في نقل وتغليف وفك وتركيب الأثاث بالرياض." />
        <meta name="keywords" content="فيديو نقل أثاث, فيديو نقل عفش بالرياض, مقاطع نقل أثاث, فيديو تغليف أثاث" />
        <link rel="canonical" href="https://lams.sooftit.com/videos" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lams.sooftit.com/videos" />
        <meta property="og:title" content="فيديوهات نقل الأثاث بالرياض | مؤسسة لمس" />
        <meta property="og:description" content="شاهد فيديوهات حقيقية من أعمال مؤسسة لمس في نقل الأثاث بالرياض." />
        <meta property="og:image" content="https://lams.sooftit.com/og-image.jpg" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:site_name" content="مؤسسة لمس لنقل الأثاث" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="فيديوهات نقل الأثاث بالرياض | مؤسسة لمس" />
        <meta name="twitter:description" content="شاهد فيديوهات حقيقية من أعمال مؤسسة لمس في نقل الأثاث بالرياض." />
        <meta name="twitter:image" content="https://lams.sooftit.com/og-image.jpg" />
      </Helmet>
      <div>
      <section className="bg-navy-gradient text-white py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black mb-4">الفيديوهات</h1>
            <p className="text-lg text-white/80">شاهد فيديوهات من أعمالنا في نقل الأثاث</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container text-center">
          <div className="bg-muted rounded-2xl p-12">
            <h2 className="text-2xl font-bold mb-4">قريباً</h2>
            <p className="text-muted-foreground">سيتم إضافة فيديوهات من أعمالنا قريباً. تابعونا!</p>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Videos;

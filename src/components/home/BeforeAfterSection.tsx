import SectionHeading from "@/components/ui/section-heading";
import beforeAfter from "@/assets/before-after.webp";

const BeforeAfterSection = () => (
  <section className="py-16 bg-muted">
    <div className="container">
      <SectionHeading title="قبل وبعد النقل" subtitle="شاهد الفرق في احترافية التغليف والترتيب - نضمن لك وصول أثاثك بأمان تام" />
      <div className="overflow-hidden rounded-2xl border border-border shadow-lg bg-muted">
        <img src={beforeAfter} alt="قبل وبعد نقل الأثاث - مؤسسة لمس - تغليف وترتيب احترافي" loading="lazy" decoding="async" width={1678} height={937} className="w-full h-auto object-contain" />
      </div>
    </div>
  </section>
);

export default BeforeAfterSection;

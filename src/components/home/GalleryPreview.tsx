import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/ui/section-heading";
import workersSofa from "@/assets/gallery/workers-sofa.webp";
import chairsWrapped from "@/assets/gallery/chairs-wrapped.webp";
import wardrobeModern from "@/assets/gallery/wardrobe-modern.webp";
import vanityTable from "@/assets/gallery/vanity-table.webp";
import conferenceTable from "@/assets/gallery/conference-table.webp";
import cabinets from "@/assets/gallery/cabinets.webp";

const images = [
  { src: workersSofa, alt: "نقل أثاث احترافي بالرياض" },
  { src: chairsWrapped, alt: "تغليف كراسي بمواد عالية الجودة" },
  { src: wardrobeModern, alt: "تركيب دولاب ملابس حديث" },
  { src: vanityTable, alt: "تركيب تسريحة فاخرة" },
  { src: conferenceTable, alt: "نقل أثاث مكتبي - طاولة اجتماعات" },
  { src: cabinets, alt: "تركيب خزائن احترافي" },
];

const GalleryPreview = () => (
  <section className="py-20 bg-muted">
    <div className="container">
      <SectionHeading title="من أعمالنا" subtitle="نماذج من أعمالنا في نقل وتركيب الأثاث بالرياض" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div key={i} className={`overflow-hidden rounded-xl border border-border group${i >= 4 ? " hidden md:block" : ""}`}>
            <img src={img.src} alt={img.alt} loading="lazy" decoding="async" width={600} height={400} className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button asChild variant="outline" className="font-bold">
          <Link to="/gallery">عرض المعرض الكامل <ChevronLeft className="mr-1 h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  </section>
);

export default GalleryPreview;

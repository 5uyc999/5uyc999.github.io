import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, ZoomIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SectionHeading from "@/components/ui/section-heading";

import cabinets from "@/assets/gallery/cabinets.webp";
import wardrobeModern from "@/assets/gallery/wardrobe-modern.webp";
import wardrobeWood from "@/assets/gallery/wardrobe-wood.webp";
import workersSofa from "@/assets/gallery/workers-sofa.webp";
import chairsWrapped from "@/assets/gallery/chairs-wrapped.webp";
import vanityTable from "@/assets/gallery/vanity-table.webp";
import servicesCollage from "@/assets/gallery/services-collage.webp";
import conferenceTable from "@/assets/gallery/conference-table.webp";

const staticImages = [
  { src: workersSofa, alt: "عمال محترفون ينقلون أثاث بالرياض", category: "نقل" },
  { src: chairsWrapped, alt: "تغليف كراسي احترافي بمواد عالية الجودة", category: "تغليف" },
  { src: cabinets, alt: "تركيب خزائن ودواليب احترافي", category: "فك وتركيب" },
  { src: wardrobeModern, alt: "دولاب ملابس حديث بعد التركيب الاحترافي", category: "فك وتركيب" },
  { src: wardrobeWood, alt: "تركيب دولاب خشبي فاخر", category: "فك وتركيب" },
  { src: vanityTable, alt: "تسريحة فاخرة بعد التركيب", category: "فك وتركيب" },
  { src: conferenceTable, alt: "نقل وتركيب أثاث مكتبي", category: "نقل" },
  { src: servicesCollage, alt: "خدمات نقل أثاث متكاملة", category: "نقل" },
];

interface GalleryItem {
  src: string;
  alt: string;
  category: string;
}

const Gallery = () => {
  const [active, setActive] = useState("الكل");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [images, setImages] = useState<GalleryItem[]>(staticImages);
  const [categories, setCategories] = useState<string[]>(["الكل", "نقل", "تغليف", "فك وتركيب"]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await supabase
        .from("gallery_images")
        .select("image_url, alt_text, category")
        .eq("is_visible", true)
        .order("sort_order");
      if (data && data.length > 0) {
        const dbImages = data.map(d => ({
          src: d.image_url,
          alt: d.alt_text || "",
          category: d.category || "نقل",
        }));
        setImages(dbImages);
        const cats = ["الكل", ...Array.from(new Set(dbImages.map(i => i.category)))];
        setCategories(cats);
      }
    };
    fetchImages();
  }, []);

  const filtered = active === "الكل" ? images : images.filter((img) => img.category === active);

  const navigateLightbox = (dir: number) => {
    if (lightbox === null) return;
    const next = lightbox + dir;
    if (next >= 0 && next < filtered.length) setLightbox(next);
  };

  return (
    <>
      <Helmet>
        <title>معرض أعمال نقل الأثاث بالرياض | صور حقيقية | مؤسسة لمس</title>
        <meta name="description" content="شاهد صور حقيقية من أعمال مؤسسة لمس في نقل وتركيب وتغليف الأثاث بالرياض. نقل عفش احترافي مع فك وتركيب وتغليف." />
        <meta name="keywords" content="معرض نقل أثاث, صور نقل عفش, أعمال نقل أثاث بالرياض, صور فك وتركيب أثاث, صور تغليف أثاث, معرض أعمال مؤسسة لمس" />
        <link rel="canonical" href="https://lams.sooftit.com/gallery" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lams.sooftit.com/gallery" />
        <meta property="og:title" content="معرض أعمال نقل الأثاث بالرياض | مؤسسة لمس" />
        <meta property="og:description" content="شاهد صور حقيقية من أعمال مؤسسة لمس في نقل وتركيب وتغليف الأثاث بالرياض." />
        <meta property="og:image" content="https://lams.sooftit.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:site_name" content="مؤسسة لمس لنقل الأثاث" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="معرض أعمال نقل الأثاث بالرياض | مؤسسة لمس" />
        <meta name="twitter:description" content="شاهد صور حقيقية من أعمال مؤسسة لمس في نقل وتركيب وتغليف الأثاث بالرياض." />
        <meta name="twitter:image" content="https://lams.sooftit.com/og-image.jpg" />
      </Helmet>
      <div>
      <section className="bg-navy-gradient text-white py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black mb-4">معرض أعمالنا</h1>
            <p className="text-lg text-white/80">شاهد نماذج حقيقية من أعمالنا في نقل وتركيب وتغليف الأثاث بالرياض</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  active === cat
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={`${img.alt}-${i}`}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="cursor-pointer group relative overflow-hidden rounded-2xl"
                  onClick={() => setLightbox(i)}
                >
                  <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-white text-sm font-bold">{img.category}</span>
                    <span className="text-white/80 text-xs mt-1 line-clamp-2">{img.alt}</span>
                  </div>
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-50">
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setLightbox(null)}>
            <button className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20" onClick={() => setLightbox(null)}>
              <X className="h-6 w-6" />
            </button>
            {lightbox > 0 && (
              <button className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20" onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}>
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
            {lightbox < filtered.length - 1 && (
              <button className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20" onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}>
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}
            <motion.img key={lightbox} initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} src={filtered[lightbox]?.src} alt={filtered[lightbox]?.alt} className="max-w-[90vw] max-h-[85vh] rounded-xl object-contain shadow-2xl" onClick={(e) => e.stopPropagation()} />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
              {lightbox + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </>
  );
};

export default Gallery;

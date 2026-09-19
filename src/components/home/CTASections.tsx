import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  phone: string;
  whatsapp: string;
}

export const MidCTA = ({ phone }: Props) => (
  <section className="py-16 bg-gold-gradient">
    <div className="container text-center">
      <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">جاهز لنقل أثاثك؟</h2>
      <p className="text-lg text-primary/80 mb-8 max-w-xl mx-auto">
        تواصل معنا الآن واحصل على استشارة مجانية وعرض سعر مناسب لنقل أثاثك بأمان واحتراف
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold px-8 h-14">
          <a href={`tel:${phone}`} data-ads-conversion="phone" aria-label="اتصل بنا الآن">
            <Phone className="ml-2 h-5 w-5" />اتصل الآن
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 text-lg font-bold px-8 h-14">
          <Link to="/contact">طلب عرض سعر</Link>
        </Button>
      </div>
    </div>
  </section>
);

export const FinalCTA = ({ phone, whatsapp }: Props) => (
  <section className="py-20 bg-navy-gradient text-white text-center">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-3xl md:text-4xl font-black mb-4">ابدأ رحلة نقل أثاثك مع لمس اليوم</h2>
        <p className="text-lg text-white/85 mb-8 max-w-xl mx-auto">
          فريقنا المحترف جاهز لخدمتك على مدار الساعة. تواصل معنا الآن واحصل على أفضل تجربة نقل أثاث في الرياض.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg font-bold px-8 h-14 shadow-gold">
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" data-ads-conversion="whatsapp" aria-label="تواصل عبر واتساب">
              <MessageCircle className="ml-2 h-5 w-5" />واتساب الآن
            </a>
          </Button>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg font-bold px-8 h-14">
            <a href={`tel:${phone}`} data-ads-conversion="phone" aria-label="اتصل بنا">
              <Phone className="ml-2 h-5 w-5" />{phone}
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

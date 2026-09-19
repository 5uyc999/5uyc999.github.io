import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompanySettings } from "@/hooks/useCompanySettings";


const GlobalContactCTA = () => {
  const { settings } = useCompanySettings();
  const phone = settings.phone;
  const whatsapp = settings.whatsapp;
  const waDisplay = `0${String(whatsapp).replace(/^966/, "")}`;

  return (
    <section className="bg-primary/5 border-y border-border py-8 md:py-12">
      <div className="container">
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-black text-primary mb-5 md:mb-7">
          تواصل معنا الآن واحصل على عرض سعر فوري
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-stretch gap-3 sm:gap-5 max-w-3xl mx-auto">
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            data-ads-conversion="whatsapp"
            aria-label={`تواصل عبر واتساب ${waDisplay}`}
            
            className="flex-1 md:animate-[bounce-gentle_2s_ease-in-out_infinite]"
          >
            <Button
              asChild
              size="lg"
              className="w-full bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground font-black text-base sm:text-xl h-14 sm:h-16 rounded-2xl shadow-lg border-2 border-primary-foreground/20 hover:scale-[1.03] transition-transform"
            >
              <span className="flex items-center justify-center gap-2">
                <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
                <span dir="ltr" className="font-cairo">{waDisplay}</span>
                <span>واتساب</span>
              </span>
            </Button>
          </a>

          <a
            href={`tel:${phone}`}
            data-ads-conversion="phone"
            aria-label={`اتصل الآن ${phone}`}
            
            className="flex-1 md:animate-[bounce-gentle_2s_ease-in-out_infinite_0.3s]"
          >
            <Button
              asChild
              size="lg"
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-black text-base sm:text-xl h-14 sm:h-16 rounded-2xl shadow-[0_6px_24px_rgba(212,175,55,0.45)] border-2 border-white/20 hover:scale-[1.03] transition-transform"
            >
              <span className="flex items-center justify-center gap-2">
                <Phone className="h-6 w-6 sm:h-7 sm:w-7" />
                <span>اتصل الآن</span>
                <span dir="ltr" className="font-cairo">{phone}</span>
              </span>
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default GlobalContactCTA;

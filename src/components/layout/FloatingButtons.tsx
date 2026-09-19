import { Phone, MessageCircle } from "lucide-react";
import { useCompanySettings } from "@/hooks/useCompanySettings";


const FloatingButtons = () => {
  const { settings } = useCompanySettings();
  const phone = settings.phone;
  const whatsapp = settings.whatsapp;
  const waDisplay = `0${String(whatsapp).replace(/^966/, "")}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 md:hidden">
      <div className="flex items-stretch gap-2 mx-auto max-w-md">
        {/* WhatsApp */}
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          data-ads-conversion="whatsapp"
          aria-label={`تواصل عبر واتساب ${waDisplay}`}
          
          className="flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl bg-whatsapp text-whatsapp-foreground font-black text-sm sm:text-lg shadow-lg border-2 border-primary-foreground/25 hover:scale-[1.04] transition-transform"
        >
          <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 shrink-0" />
          <span className="flex flex-col leading-tight items-start">
            <span className="text-[10px] sm:text-xs font-bold opacity-90">واتساب</span>
            <span dir="ltr" className="font-cairo text-sm sm:text-lg">{waDisplay}</span>
          </span>
        </a>

        {/* Call */}
        <a
          href={`tel:${phone}`}
          data-ads-conversion="phone"
          aria-label={`اتصل الآن ${phone}`}
          
          className="flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl bg-secondary text-secondary-foreground font-black text-sm sm:text-lg shadow-lg border-2 border-primary-foreground/25 hover:scale-[1.04] transition-transform"
        >
          <Phone className="h-6 w-6 sm:h-7 sm:w-7 shrink-0" />
          <span className="flex flex-col leading-tight items-start">
            <span className="text-[10px] sm:text-xs font-bold opacity-90">اتصل الآن</span>
            <span dir="ltr" className="font-cairo text-sm sm:text-lg">{phone}</span>
          </span>
        </a>
      </div>
    </div>
  );
};

export default FloatingButtons;

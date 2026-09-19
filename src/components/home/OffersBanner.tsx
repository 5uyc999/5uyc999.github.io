import { Phone, MessageCircle, MapPin, Sparkles } from "lucide-react";
import { useCompanySettings } from "@/hooks/useCompanySettings";

const OffersBanner = () => {
  const { settings } = useCompanySettings();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[hsl(var(--navy-dark))] text-primary-foreground">
      {/* soft glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      <div className="container relative py-6 sm:py-8 md:py-10">
        {/* Header pill */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-black px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base md:text-lg shadow-lg md:animate-[bounce-gentle_2.5s_ease-in-out_infinite]">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
            عروض لفترة محدودة
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        </div>

        {/* Offers grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {/* Offer 1 */}
          <div className="bg-background/10 backdrop-blur-sm border-2 border-secondary/40 rounded-2xl p-5 sm:p-7 text-center hover:scale-[1.02] transition-transform">
            <h3 className="text-lg sm:text-2xl md:text-3xl font-black mb-3 leading-tight">
              نقل + فك + تركيب + تغليف
            </h3>
            <div className="flex items-baseline justify-center gap-3 flex-wrap">
              <span className="text-4xl sm:text-5xl md:text-6xl font-black text-secondary">
                250
              </span>
              <span className="text-xl sm:text-2xl font-bold text-secondary">
                ريال
              </span>
              <span className="text-lg sm:text-xl line-through opacity-60">
                300 ريال
              </span>
            </div>
          </div>

          {/* Offer 2 */}
          <div className="bg-background/10 backdrop-blur-sm border-2 border-secondary/40 rounded-2xl p-5 sm:p-7 text-center hover:scale-[1.02] transition-transform">
            <h3 className="text-lg sm:text-2xl md:text-3xl font-black mb-3 leading-tight">
              فك وتركيب مكيف سبليت
            </h3>
            <div className="flex items-baseline justify-center gap-3 flex-wrap">
              <span className="text-4xl sm:text-5xl md:text-6xl font-black text-secondary">
                120
              </span>
              <span className="text-xl sm:text-2xl font-bold text-secondary">
                ريال
              </span>
              <span className="text-lg sm:text-xl line-through opacity-60">
                170 ريال
              </span>
            </div>
          </div>

          {/* Offer 3 */}
          <div className="bg-background/10 backdrop-blur-sm border-2 border-secondary/40 rounded-2xl p-5 sm:p-7 text-center hover:scale-[1.02] transition-transform">
            <h3 className="text-lg sm:text-2xl md:text-3xl font-black mb-3 leading-tight">
              تخزين الشهر
            </h3>
            <div className="flex items-baseline justify-center gap-3 flex-wrap">
              <span className="text-4xl sm:text-5xl md:text-6xl font-black text-secondary">
                150
              </span>
              <span className="text-xl sm:text-2xl font-bold text-secondary">
                ريال
              </span>
              <span className="text-lg sm:text-xl line-through opacity-60">
                350 ريال
              </span>
            </div>
            <p className="text-xs sm:text-sm opacity-80 mt-1 font-bold">
              + النقل 250 ريال
            </p>
          </div>
        </div>

        {/* Coverage */}
        <div className="mt-5 sm:mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg font-bold">
          <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
          <span>المناطق المشمولة:</span>
          <span className="bg-secondary/20 border border-secondary/40 rounded-full px-3 sm:px-4 py-1">الرياض</span>
          <span className="bg-secondary/20 border border-secondary/40 rounded-full px-3 sm:px-4 py-1">الخرج</span>
          <span className="bg-secondary/20 border border-secondary/40 rounded-full px-3 sm:px-4 py-1">المزاحمية</span>
        </div>

        {/* CTAs */}
        <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href={`https://wa.me/${settings.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            data-ads-conversion="whatsapp"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground font-black text-base sm:text-lg md:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg border-2 border-primary-foreground/20 transition-transform hover:scale-105"
          >
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            احجز العرض واتساب
          </a>
          <a
            href={`tel:${settings.phone}`}
            data-ads-conversion="phone"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-black text-base sm:text-lg md:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-[0_4px_20px_rgba(212,175,55,0.5)] border-2 border-white/20 transition-transform hover:scale-105"
          >
            <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
            اتصل الآن {settings.phone}
          </a>
        </div>
      </div>
    </section>
  );
};

export default OffersBanner;

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompanySettings } from "@/hooks/useCompanySettings";
import logoLams from "@/assets/logo-header.webp";

const navLinks = [
  { label: "الرئيسية", path: "/" },
  { label: "من نحن", path: "/about" },
  { label: "خدماتنا", path: "/services" },
  { label: "مناطق الخدمة", path: "/service-areas" },
  { label: "معرض الصور", path: "/gallery" },
  { label: "المدونة", path: "/blog" },
  { label: "آراء العملاء", path: "/testimonials" },
  { label: "الأسئلة الشائعة", path: "/faq" },
  { label: "اتصل بنا", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { settings } = useCompanySettings();

  const logo = logoLams;
  const phone = settings.phone;
  const whatsapp = settings.whatsapp;
  const email = settings.email;
  const name = settings.company_name_short || "لمس";

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between py-2 text-sm">
          <a href={`tel:${phone}`} data-ads-conversion="phone" className="flex items-center gap-1 hover:text-secondary transition-colors" aria-label={`اتصل بنا ${phone}`}>
            <Phone className="h-3.5 w-3.5" />
            <span className="font-cairo text-xs sm:text-sm">{phone}</span>
          </a>
          <a href={`mailto:${email}`} className="flex items-center gap-1 hover:text-secondary transition-colors" dir="ltr" aria-label={`أرسل بريد إلكتروني إلى ${email}`}>
            <Mail className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{email}</span>
          </a>
        </div>
      </div>

      <nav className="bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-1">
          <Link to="/" className="flex items-center" aria-label={`${name} - الصفحة الرئيسية`}>
            <img src={logo} alt={`شعار ${name}`} className="h-20 w-auto object-contain" width={80} height={80} fetchPriority="high" decoding="async" />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-base rounded-md transition-colors font-bold ${
                  location.pathname === link.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold">
              <Link to="/get-quote" data-lead-action="get_quote">طلب عرض سعر</Link>
            </Button>
            <Button asChild className="bg-[#25D366] hover:bg-[#1da851] text-white font-bold">
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" data-ads-conversion="whatsapp" aria-label="تواصل عبر واتساب">واتساب</a>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 font-bold">
              <a href={`tel:${phone}`} data-ads-conversion="phone">اتصل الآن</a>
            </Button>
          </div>

          <button className="lg:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)} aria-label="القائمة">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-card animate-fade-in overflow-y-auto" style={{ maxHeight: "calc(100vh - 10rem)" }}>
            <div className="container py-4 pb-20 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-md text-base font-bold transition-colors ${
                    location.pathname === link.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-border space-y-2">
                <Button asChild className="w-full bg-secondary text-secondary-foreground font-bold h-12 text-base">
                  <Link to="/get-quote" data-lead-action="get_quote" onClick={() => setMobileOpen(false)}>طلب عرض سعر</Link>
                </Button>
                <div className="flex gap-2">
                  <Button asChild className="flex-1 bg-[#25D366] hover:bg-[#1da851] text-white font-bold h-12 text-base">
                    <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" data-ads-conversion="whatsapp" aria-label="تواصل عبر واتساب">
                      <MessageCircle className="ml-2 h-5 w-5" />واتساب
                    </a>
                  </Button>
                  <Button asChild className="flex-1 bg-primary font-bold h-12 text-base">
                    <a href={`tel:${phone}`} data-ads-conversion="phone" aria-label="اتصل بنا">
                      <Phone className="ml-2 h-5 w-5" />اتصل الآن
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

    </header>
  );
};

export default Header;

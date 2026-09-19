import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { useCompanySettings } from "@/hooks/useCompanySettings";
import logoLams from "@/assets/logo-new.webp";

const socialIcons: Record<string, React.FC<{ className?: string }>> = {
  facebook: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  ),
  twitter: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  ),
  instagram: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
  ),
  tiktok: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
  ),
  snapchat: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/></svg>
  ),
};

const Footer = () => {
  const { settings } = useCompanySettings();
  const logo = settings.logo_url || logoLams;
  const name = settings.company_name_short || "لمس";
  const fullName = settings.company_name || "مؤسسة لمس لنقل الأثاث";

  const activeSocials = (["facebook", "twitter", "instagram", "tiktok", "snapchat"] as const)
    .filter(key => settings[key] && settings[key] !== "#" && settings[key].trim() !== "")
    .map(key => ({ key, url: settings[key], Icon: socialIcons[key] }));

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt={`شعار ${name}`} className="h-12 w-12 rounded-lg object-cover" width={48} height={48} />
              <div>
                <h3 className="text-lg font-bold">{name}</h3>
                <p className="text-xs text-primary-foreground/90">لنقل الأثاث</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/90 leading-relaxed mb-4">
              {settings.company_description || `${fullName} - شريكك الموثوق في نقل الأثاث داخل وخارج الرياض. نقدم خدمات احترافية تشمل الفك والتركيب والتغليف بأعلى معايير الجودة والأمان.`}
            </p>
            {/* Social icons */}
            {activeSocials.length > 0 && (
              <div className="flex items-center gap-3 mt-4">
                {activeSocials.map(({ key, url, Icon }) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                    aria-label={key}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">روابط سريعة</h3>
            <ul className="space-y-1 text-sm">
              <li><Link to="/" className="text-primary-foreground/90 hover:text-secondary transition-all inline-block py-1">الرئيسية</Link></li>
              <li><Link to="/about" className="text-primary-foreground/90 hover:text-secondary transition-all inline-block py-1">من نحن</Link></li>
              <li><Link to="/services" className="text-primary-foreground/90 hover:text-secondary transition-all inline-block py-1">خدماتنا</Link></li>
              <li><Link to="/gallery" className="text-primary-foreground/90 hover:text-secondary transition-all inline-block py-1">معرض الصور</Link></li>
              <li><Link to="/blog" className="text-primary-foreground/90 hover:text-secondary transition-all inline-block py-1">المدونة</Link></li>
              <li><Link to="/moving-guide" className="text-primary-foreground/90 hover:text-secondary transition-all inline-block py-1">دليل نقل العفش</Link></li>
              <li><Link to="/guides/furniture-moving-prices-riyadh" className="text-primary-foreground/90 hover:text-secondary transition-all inline-block py-1">أسعار نقل العفش بالرياض</Link></li>
              <li><Link to="/service-areas" className="text-primary-foreground/90 hover:text-secondary transition-all inline-block py-1">مناطق الخدمة</Link></li>
              <li><Link to="/contact" className="text-primary-foreground/90 hover:text-secondary transition-all inline-block py-1">اتصل بنا</Link></li>
              <li><Link to="/privacy" className="text-primary-foreground/90 hover:text-secondary transition-all inline-block py-1">سياسة الخصوصية</Link></li>
              <li><Link to="/terms" className="text-primary-foreground/90 hover:text-secondary transition-all inline-block py-1">الشروط والأحكام</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">خدماتنا</h3>
            <ul className="space-y-2 text-sm">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link to={s.slug} className="text-primary-foreground/90 hover:text-secondary transition-all inline-block py-1">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">تواصل معنا</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-secondary shrink-0" />
                <a href={`tel:${settings.phone}`} data-ads-conversion="phone" className="text-primary-foreground/90 hover:text-secondary">{settings.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-secondary shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-primary-foreground/90 hover:text-secondary">{settings.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                <span className="text-primary-foreground/90">{settings.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-secondary shrink-0" />
                <span className="text-primary-foreground/90">{settings.working_hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container py-4 text-center text-sm text-primary-foreground/90">
          <p>جميع الحقوق محفوظة © {new Date().getFullYear()} {fullName}</p>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 bg-primary/95">
        <div className="container py-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-primary-foreground/80">
          <a href="https://www.sooftit.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-secondary/80 font-bold transition-colors" aria-label="SoofT IT Solutions - مطور الموقع">
            SoofT IT Solutions
          </a>
          <span>-</span>
          <a href="https://wa.me/201015881992" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-secondary/80 font-bold transition-colors" aria-label="تواصل مع المطور عبر واتساب">
            WhatsApp: +201015881992
          </a>
          <span>-</span>
          <span>All Copyrights © {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

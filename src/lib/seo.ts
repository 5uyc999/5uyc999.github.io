// SEO constants and helpers
export const SITE_URL = "https://lams.sooftit.com";
export const SITE_NAME = "مؤسسة لمس لنقل الأثاث";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const FB_APP_ID = "26328282186824990";

export interface PageSEO {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
  article?: {
    publishedTime?: string;
    section?: string;
    tags?: string[];
  };
}

export const generatePageMeta = (seo: PageSEO) => ({
  title: seo.title,
  description: seo.description,
  canonical: seo.canonical,
  ogTitle: seo.title,
  ogDescription: seo.description,
  ogImage: seo.ogImage || DEFAULT_OG_IMAGE,
  ogUrl: seo.canonical,
  ogType: seo.ogType || "website",
  twitterCard: "summary_large_image" as const,
  twitterTitle: seo.title,
  twitterDescription: seo.description,
  twitterImage: seo.ogImage || DEFAULT_OG_IMAGE,
  keywords: seo.keywords || "نقل أثاث بالرياض, شركة نقل عفش, نقل أثاث, فك وتركيب أثاث, تغليف أثاث, نقل عفش داخل الرياض, نقل عفش خارج الرياض, دينا نقل عفش, مؤسسة لمس",
});

// Breadcrumb JSON-LD generator
export const generateBreadcrumbLD = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": item.name,
    "item": item.url,
  })),
});

// Article JSON-LD generator for blog posts
export const generateArticleLD = (post: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  category?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": post.title,
  "description": post.description,
  "url": post.url,
  "image": post.image || DEFAULT_OG_IMAGE,
  "datePublished": post.publishedTime,
  "dateModified": post.modifiedTime || post.publishedTime,
  "author": {
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE_URL,
  },
  "publisher": {
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/favicon-192.png`,
    },
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": post.url,
  },
  ...(post.category && { "articleSection": post.category }),
  ...(post.tags && { "keywords": post.tags.join(", ") }),
});

// LocalBusiness JSON-LD (enhanced version)
export const LOCAL_BUSINESS_LD = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  "name": SITE_NAME,
  "alternateName": "Lams Moving",
  "url": SITE_URL,
  "telephone": "+966503689200",
  "email": "lamsryad@gmail.com",
  "description": "مؤسسة لمس لنقل الأثاث - أفضل شركة نقل أثاث داخل وخارج الرياض مع خدمات فك وتركيب وتغليف احترافية",
  "image": DEFAULT_OG_IMAGE,
  "logo": `${SITE_URL}/favicon-192.png`,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "الرياض",
    "addressLocality": "الرياض",
    "addressRegion": "منطقة الرياض",
    "addressCountry": "SA",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "24.7136",
    "longitude": "46.6753",
  },
  "areaServed": [
    { "@type": "City", "name": "الرياض" },
    { "@type": "City", "name": "الخرج" },
    { "@type": "City", "name": "المزاحمية" },
    { "@type": "AdministrativeArea", "name": "منطقة الرياض" },
    { "@type": "Country", "name": "المملكة العربية السعودية" },
  ],
  "serviceType": [
    "نقل أثاث داخل الرياض",
    "نقل أثاث خارج الرياض",
    "فك وتركيب أثاث",
    "تغليف أثاث",
    "نقل مكاتب",
    "نقل عفش",
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    "opens": "08:00",
    "closes": "22:00",
  },
  "priceRange": "$$",
  "sameAs": [],
};

// WebSite JSON-LD with SearchAction
export const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": SITE_NAME,
  "url": SITE_URL,
  "inLanguage": "ar",
  "description": "مؤسسة لمس لنقل الأثاث بالرياض - خدمات نقل عفش احترافية",
};

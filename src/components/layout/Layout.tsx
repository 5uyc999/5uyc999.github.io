import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import FloatingButtons from "./FloatingButtons";
import GlobalContactCTA from "./GlobalContactCTA";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-24 md:pb-0">{children}</main>

      {isHome ? (
        <footer className="border-t border-border bg-background">
          <div className="container py-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} مؤسسة لمس لنقل الأثاث</span>
            <Link to="/service-areas" className="hover:text-primary">
              مناطق الخدمة
            </Link>
            <Link to="/privacy" className="hover:text-primary">
              سياسة الخصوصية
            </Link>
            <Link to="/terms" className="hover:text-primary">
              الشروط والأحكام
            </Link>
          </div>
        </footer>
      ) : (
        <>
          <GlobalContactCTA />
          <Footer />
        </>
      )}

      <FloatingButtons />
    </div>
  );
};

export default Layout;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/layout/Layout";
import ChatbotLauncher from "@/components/ChatbotLauncher";
import { lazy, Suspense, useEffect } from "react";
import { initAdsConversionTracking } from "@/lib/tracking";
import { captureAttribution } from "@/lib/attribution";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Videos = lazy(() => import("./pages/Videos"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const GetQuote = lazy(() => import("./pages/GetQuote"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const LocationService = lazy(() => import("./pages/LocationService"));
const MovingGuide = lazy(() => import("./pages/MovingGuide"));
const SeoGuide = lazy(() => import("./pages/SeoGuide"));
const RiyadhNeighborhood = lazy(() => import("./pages/RiyadhNeighborhood"));
const RiyadhSector = lazy(() => import("./pages/RiyadhSector"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin pages
const AuthProvider = lazy(() =>
  import("@/hooks/useAuth").then((module) => ({ default: module.AuthProvider })),
);
const AdminLayout = lazy(() => import("@/components/admin/AdminLayout"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminInquiries = lazy(() => import("./pages/admin/AdminInquiries"));
const AdminLeads = lazy(() => import("./pages/admin/AdminLeads"));
const AdminTracking = lazy(() => import("./pages/admin/AdminTracking"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog"));
const AdminGallery = lazy(() => import("./pages/admin/AdminGallery"));
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials"));
const AdminFAQ = lazy(() => import("./pages/admin/AdminFAQ"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminSetup = lazy(() => import("./pages/admin/AdminSetup"));
const ResetPassword = lazy(() => import("./pages/admin/ResetPassword"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
});

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => {
  useEffect(() => {
    captureAttribution();
    const cleanup = initAdsConversionTracking();
    return cleanup;
  }, []);

  return (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Public routes */}
              <Route
                path="/"
                element={
                  <Layout>
                    <Index />
                  </Layout>
                }
              />
              <Route
                path="/about"
                element={
                  <Layout>
                    <About />
                  </Layout>
                }
              />
              <Route
                path="/services"
                element={
                  <Layout>
                    <Services />
                  </Layout>
                }
              />
              <Route
                path="/services/:slug"
                element={
                  <Layout>
                    <ServiceDetail />
                  </Layout>
                }
              />
              <Route
                path="/gallery"
                element={
                  <Layout>
                    <Gallery />
                  </Layout>
                }
              />
              <Route
                path="/videos"
                element={
                  <Layout>
                    <Videos />
                  </Layout>
                }
              />
              <Route
                path="/blog"
                element={
                  <Layout>
                    <Blog />
                  </Layout>
                }
              />
              <Route
                path="/blog/:slug"
                element={
                  <Layout>
                    <BlogPost />
                  </Layout>
                }
              />
              <Route
                path="/testimonials"
                element={
                  <Layout>
                    <Testimonials />
                  </Layout>
                }
              />
              <Route
                path="/faq"
                element={
                  <Layout>
                    <FAQ />
                  </Layout>
                }
              />
              <Route
                path="/contact"
                element={
                  <Layout>
                    <Contact />
                  </Layout>
                }
              />
              <Route
                path="/privacy"
                element={
                  <Layout>
                    <Privacy />
                  </Layout>
                }
              />
              <Route
                path="/terms"
                element={
                  <Layout>
                    <Terms />
                  </Layout>
                }
              />
              <Route
                path="/get-quote"
                element={
                  <Layout>
                    <GetQuote />
                  </Layout>
                }
              />
              <Route
                path="/thank-you"
                element={
                  <Layout>
                    <ThankYou />
                  </Layout>
                }
              />
              <Route
                path="/service-areas"
                element={
                  <Layout>
                    <ServiceAreas />
                  </Layout>
                }
              />
              <Route
                path="/areas/riyadh/:slug"
                element={
                  <Layout>
                    <RiyadhSector />
                  </Layout>
                }
              />
              <Route
                path="/areas/:slug"
                element={
                  <Layout>
                    <LocationService />
                  </Layout>
                }
              />
              <Route
                path="/moving-guide"
                element={
                  <Layout>
                    <MovingGuide />
                  </Layout>
                }
              />
              <Route
                path="/guides/:slug"
                element={
                  <Layout>
                    <SeoGuide />
                  </Layout>
                }
              />
              <Route
                path="/riyadh/:slug"
                element={
                  <Layout>
                    <RiyadhNeighborhood />
                  </Layout>
                }
              />

              {/* Admin routes */}
              <Route
                path="/admin/login"
                element={
                  <AuthProvider>
                    <Suspense fallback={<Loading />}>
                      <AdminLogin />
                    </Suspense>
                  </AuthProvider>
                }
              />
              <Route path="/admin/setup" element={<AdminSetup />} />
              <Route
                path="/reset-password"
                element={
                  <AuthProvider>
                    <Suspense fallback={<Loading />}>
                      <ResetPassword />
                    </Suspense>
                  </AuthProvider>
                }
              />
              <Route
                path="/admin"
                element={
                  <AuthProvider>
                    <AdminLayout>
                      <Suspense fallback={<Loading />}>
                        <AdminDashboard />
                      </Suspense>
                    </AdminLayout>
                  </AuthProvider>
                }
              />
              <Route
                path="/admin/inquiries"
                element={
                  <AuthProvider>
                    <AdminLayout>
                      <Suspense fallback={<Loading />}>
                        <AdminInquiries />
                      </Suspense>
                    </AdminLayout>
                  </AuthProvider>
                }
              />
              <Route
                path="/admin/leads"
                element={
                  <AuthProvider>
                    <AdminLayout>
                      <Suspense fallback={<Loading />}>
                        <AdminLeads />
                      </Suspense>
                    </AdminLayout>
                  </AuthProvider>
                }
              />
              <Route
                path="/admin/tracking"
                element={
                  <AuthProvider>
                    <AdminLayout>
                      <Suspense fallback={<Loading />}>
                        <AdminTracking />
                      </Suspense>
                    </AdminLayout>
                  </AuthProvider>
                }
              />
              <Route
                path="/admin/blog"
                element={
                  <AuthProvider>
                    <AdminLayout>
                      <Suspense fallback={<Loading />}>
                        <AdminBlog />
                      </Suspense>
                    </AdminLayout>
                  </AuthProvider>
                }
              />
              <Route
                path="/admin/gallery"
                element={
                  <AuthProvider>
                    <AdminLayout>
                      <Suspense fallback={<Loading />}>
                        <AdminGallery />
                      </Suspense>
                    </AdminLayout>
                  </AuthProvider>
                }
              />
              <Route
                path="/admin/testimonials"
                element={
                  <AuthProvider>
                    <AdminLayout>
                      <Suspense fallback={<Loading />}>
                        <AdminTestimonials />
                      </Suspense>
                    </AdminLayout>
                  </AuthProvider>
                }
              />
              <Route
                path="/admin/faq"
                element={
                  <AuthProvider>
                    <AdminLayout>
                      <Suspense fallback={<Loading />}>
                        <AdminFAQ />
                      </Suspense>
                    </AdminLayout>
                  </AuthProvider>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <AuthProvider>
                    <AdminLayout>
                      <Suspense fallback={<Loading />}>
                        <AdminSettings />
                      </Suspense>
                    </AdminLayout>
                  </AuthProvider>
                }
              />

              <Route
                path="*"
                element={
                  <Layout>
                    <NotFound />
                  </Layout>
                }
              />
            </Routes>
            <ChatbotLauncher />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
  );
};

export default App;

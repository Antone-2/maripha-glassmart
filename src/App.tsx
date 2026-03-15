import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PageLoader } from "@/components/LoadingSkeleton";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/SEO";
import LiveChat from "@/components/LiveChat";
import CookieConsent from "@/components/CookieConsent";
import AgeVerification from "@/components/AgeVerification";

// Lazy load all pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const Services = lazy(() => import("./pages/Services"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Quote = lazy(() => import("./pages/Quote"));
const Contact = lazy(() => import("./pages/Contact"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const ReturnPolicy = lazy(() => import("./pages/ReturnPolicy"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Blog = lazy(() => import("./pages/Blog"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Verify = lazy(() => import("./pages/Verify"));
const Profile = lazy(() => import("./pages/Profile"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <OrganizationSchema />
            <LocalBusinessSchema />
            <Toaster />
            <Sonner />
            <LiveChat />
            <CookieConsent />
            <AgeVerification />
            <BrowserRouter>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/quote" element={<Quote />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/return-policy" element={<ReturnPolicy />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<Blog />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/verify/:token" element={<Verify />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

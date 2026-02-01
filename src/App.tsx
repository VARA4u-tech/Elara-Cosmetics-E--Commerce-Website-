import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "@/context/CartContext";
import { CompareProvider } from "@/context/CompareContext";
import { AudioProvider } from "@/context/AudioContext";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AboutPage from "./pages/AboutPage";
import WishlistPage from "./pages/WishlistPage";
import StoreLocatorPage from "./pages/StoreLocatorPage";
import AccountPage from "./pages/AccountPage";
import AccountProfile from "./pages/AccountProfile";
import ContactPage from "./pages/ContactPage";
import ComparePage from "./pages/ComparePage";
import ScalpCareRoutinePage from "./pages/ScalpCareRoutinePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/stores" element={<StoreLocatorPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/profile" element={<AccountProfile />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/scalp-care-routine" element={<ScalpCareRoutinePage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

import ScrollToTop from "@/components/layout/ScrollToTop";

// ... existing imports

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <CompareProvider>
        <AudioProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <ScrollToTop />
              <AnimatedRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </AudioProvider>
      </CompareProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;

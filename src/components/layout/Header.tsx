import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import SearchModal from "@/components/ui/SearchModal";
import MainHeader from "./MainHeader";
import CategoryNav from "./CategoryNav";
import MobileHeader from "./MobileHeader";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setIsCartOpen, totalItems } = useCart();

  // Scroll detection for shrinking header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change & lock scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          "bg-background/95 backdrop-blur-md",
          isScrolled ? "shadow-sm" : "",
        )}
      >
        {/* Main Desktop Header */}
        <MainHeader 
          isScrolled={isScrolled} 
          setIsSearchOpen={setIsSearchOpen} 
          setIsCartOpen={setIsCartOpen}
          totalItems={totalItems} 
        />

        {/* Desktop Category Navigation */}
        <CategoryNav />

        {/* Mobile Header Top Strip */}
        <MobileHeader 
          isScrolled={isScrolled} 
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          setIsSearchOpen={setIsSearchOpen}
          setIsCartOpen={setIsCartOpen}
          totalItems={totalItems}
        />
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        setIsSearchOpen={setIsSearchOpen}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Header;

import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingBag, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import logoImage from "@/assets/logo-transparent.png";
import { useCart } from "@/context/CartContext";

interface MobileHeaderProps {
  isScrolled: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setIsSearchOpen: (isOpen: boolean) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  totalItems: number;
}

const MobileHeader = ({
  isScrolled,
  setIsMobileMenuOpen,
  setIsSearchOpen,
  setIsCartOpen,
  totalItems,
}: MobileHeaderProps) => {
  return (
    <div className="lg:hidden border-b border-border/30">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-300",
            isScrolled ? "h-14" : "h-16",
          )}
        >
          {/* Left - Menu Button */}
          <button
            className="p-2 -ml-2 hover:bg-muted/50 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Center - Logo */}
          <Link to="/" className="flex items-center justify-center">
            <img
              src={logoImage}
              alt="Elara Cosmetics"
              className={cn(
                "w-auto object-contain transition-all duration-300",
                isScrolled ? "h-12" : "h-14",
              )}
            />
          </Link>

          {/* Right - Icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-muted/50 rounded-md transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              to="/account"
              className="hidden sm:flex p-2 hover:bg-muted/50 rounded-md transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              to="/wishlist"
              className="hidden sm:flex p-2 hover:bg-muted/50 rounded-md transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-muted/50 rounded-md transition-colors relative"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-primary text-primary-foreground text-[10px] min-w-[16px] h-4 rounded-full flex items-center justify-center font-medium px-1">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;

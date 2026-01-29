import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingBag, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import logoImage from "@/assets/logo-transparent.png";
import { useCart } from "@/context/CartContext";

interface MainHeaderProps {
  isScrolled: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  totalItems: number;
}

const MainHeader = ({ 
  isScrolled, 
  setIsSearchOpen, 
  setIsCartOpen, 
  totalItems 
}: MainHeaderProps) => {
  return (
    <div className="hidden lg:block border-b border-border/30">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "grid grid-cols-[1fr_auto_1fr] items-center gap-8 transition-all duration-300",
            isScrolled ? "py-1" : "py-1.5",
          )}
        >
          {/* Left - Search Bar */}
          <div className="flex items-center justify-start flex-1">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 group"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs uppercase tracking-widest font-medium text-muted-foreground group-hover:text-primary transition-colors border-b border-transparent group-hover:border-primary pb-0.5">
                Search
              </span>
            </button>
          </div>

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

          {/* Right - Account Icons */}
          <div className="flex items-center justify-end gap-1">
            <Link 
              to="/stores" 
              className="flex items-center gap-2 px-2.5 py-1.5 text-[13px] text-foreground hover:text-primary transition-colors" 
              aria-label="Find a Store"
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden xl:inline">Stores</span>
            </Link>
            <Link
              to="/account"
              className="flex items-center gap-2 px-2.5 py-1.5 text-[13px] text-foreground hover:text-primary transition-colors"
              aria-label="Account"
            >
              <User className="w-4 h-4" />
              <span className="hidden xl:inline">Account</span>
            </Link>
            <Link
              to="/wishlist"
              className="flex items-center gap-2 px-2.5 py-1.5 text-[13px] text-foreground hover:text-primary transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden xl:inline">Wishlist</span>
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 text-[13px] text-foreground hover:text-primary transition-colors relative"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xl:inline">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 left-5 xl:static xl:ml-0 bg-primary text-primary-foreground text-[10px] min-w-[17px] h-[17px] rounded-full flex items-center justify-center font-medium px-1">
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

export default MainHeader;

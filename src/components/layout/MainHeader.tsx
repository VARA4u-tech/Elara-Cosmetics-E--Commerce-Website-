import { Link } from "react-router-dom";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  MapPin,
  ChevronDown,
} from "lucide-react";
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
  totalItems,
}: MainHeaderProps) => {
  return (
    <div className="hidden lg:block border-b border-border/10 bg-white">
      <div className="container mx-auto px-6">
        <div
          className={cn(
            "grid grid-cols-[1fr_auto_1fr] items-center gap-6 transition-all duration-300",
            isScrolled ? "py-1.5" : "py-2.5",
          )}
        >
          {/* Left - Functional Links */}
          <div className="flex items-center justify-start gap-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-8" strokeWidth={1.5} />
            </button>
            <Link
              to="/stores"
              className="text-[15px] uppercase tracking-[0.15em] font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Stores
            </Link>
          </div>

          {/* Center - Logo */}
          <Link
            to="/"
            className="flex flex-col items-center justify-center group"
          >
            <img
              src={logoImage}
              alt="Elara Cosmetics"
              className={cn(
                "w-auto object-contain transition-all duration-500",
                isScrolled ? "h-12" : "h-20",
              )}
            />
          </Link>

          {/* Right - Account & Cart */}
          <div className="flex items-center justify-end gap-6">
            <Link
              to="/account"
              className="text-[15px] uppercase tracking-[0.15em] font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Account
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-foreground hover:text-primary transition-colors group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-8" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-black text-white text-[9px] min-w-[16px] h-[16px] rounded-full flex items-center justify-center font-medium">
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

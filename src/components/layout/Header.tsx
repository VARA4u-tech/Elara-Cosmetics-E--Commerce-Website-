import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, MapPin, Phone } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/products";
import { cn } from "@/lib/utils";
import SearchModal from "@/components/ui/SearchModal";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { setIsCartOpen, totalItems } = useCart();

  const handleMouseEnter = (categoryId: string) => {
    setActiveDropdown(categoryId);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        {/* Top Bar - Desktop Only */}
        <div className="hidden lg:block border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-10 text-xs">
              <div className="flex items-center gap-6 text-muted-foreground">
                <a href="tel:+911800102666" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Phone className="w-3 h-3" />
                  <span>1800-102-6666</span>
                </a>
                <Link to="/stores" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <MapPin className="w-3 h-3" />
                  <span>Find a Store</span>
                </Link>
              </div>
              <div className="flex items-center gap-6 text-muted-foreground">
                <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
                <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-medium text-foreground tracking-wide">
                <span className="text-primary">Forest</span> Essentials
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(category.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={`/category/${category.id}`}
                    className="flex items-center gap-1 py-6 text-sm uppercase tracking-luxury font-medium text-foreground hover:text-primary transition-colors underline-animation"
                  >
                    {category.name}
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        activeDropdown === category.id && "rotate-180"
                      )}
                    />
                  </Link>

                  {/* Dropdown Menu */}
                  <div
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 bg-background border border-border shadow-luxury-lg min-w-[220px] py-4 transition-all duration-200",
                      activeDropdown === category.id
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                    )}
                  >
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        to={`/category/${category.id}?subcategory=${sub.toLowerCase()}`}
                        className="block px-6 py-2 text-sm text-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                      >
                        {sub}
                      </Link>
                    ))}
                    <div className="border-t border-border mt-2 pt-2 px-6">
                      <Link
                        to={`/category/${category.id}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        View All {category.name}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:text-primary transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link to="/account" className="hidden sm:block p-2 hover:text-primary transition-colors" aria-label="Account">
                <User className="w-5 h-5" />
              </Link>
              <Link to="/wishlist" className="hidden sm:block p-2 hover:text-primary transition-colors" aria-label="Wishlist">
                <Heart className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:text-primary transition-colors relative"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden fixed inset-0 top-[65px] md:top-[81px] bg-background z-50 transition-transform duration-300 overflow-hidden",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="p-4 overflow-y-auto h-full pb-24">
            {/* Mobile Search */}
            <div 
              className="relative mb-6"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
            >
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-3 border border-border rounded-sm text-sm focus:outline-none focus:border-primary cursor-pointer"
                readOnly
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>

            {/* Mobile Categories */}
            {categories.map((category) => (
              <div key={category.id} className="border-b border-border">
                <Link
                  to={`/category/${category.id}`}
                  className="block py-4 text-lg font-serif text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              </div>
            ))}

            {/* Mobile Quick Links */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs uppercase tracking-luxury text-muted-foreground mb-4">Quick Links</p>
              <div className="space-y-3">
                <Link
                  to="/about"
                  className="block text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/stores"
                  className="block text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Find a Store
                </Link>
                <Link
                  to="/contact"
                  className="block text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Mobile Account Links */}
            <div className="mt-6 pt-6 border-t border-border space-y-3">
              <Link
                to="/account"
                className="flex items-center gap-3 text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>My Account</span>
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center gap-3 text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </Link>
            </div>

            {/* Mobile Contact */}
            <div className="mt-6 pt-6 border-t border-border">
              <a href="tel:+911800102666" className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5" />
                <span>1800-102-6666</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
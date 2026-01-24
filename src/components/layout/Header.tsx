import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, MapPin, Phone, Gift, Sparkles, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { categories, products } from "@/data/products";
import { cn } from "@/lib/utils";
import SearchModal from "@/components/ui/SearchModal";
import logoImage from "@/assets/logo.png";

// Extended navigation with more categories
const mainNavigation = [
  { id: "offers", name: "Offers", href: "/category/face?tag=sale", highlight: true },
  { id: "bestsellers", name: "Best Sellers", href: "/category/face?sort=bestselling" },
  ...categories,
  { id: "travel", name: "Travel Minis", href: "/category/gifting" },
  { id: "men", name: "Men", href: "/category/body" },
];

// Featured products for mega menu
const getFeaturedProducts = (categoryId: string) => {
  return products.filter((p) => p.category === categoryId).slice(0, 2);
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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

  const handleMouseEnter = (categoryId: string) => {
    setActiveDropdown(categoryId);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  // Check if item has subcategories (is a category object)
  const hasSubcategories = (item: any) => {
    return item.subcategories && item.subcategories.length > 0;
  };

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 bg-background border-b border-border transition-all duration-300",
        isScrolled && "shadow-md"
      )}>
        {/* Top Utility Bar - Hidden when scrolled */}
        <div className={cn(
          "hidden lg:block bg-secondary/50 border-b border-border/50 transition-all duration-300 overflow-hidden",
          isScrolled ? "h-0 opacity-0" : "h-9 opacity-100"
        )}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-9 text-xs">
              <div className="flex items-center gap-6 text-muted-foreground">
                <a href="tel:+911800102666" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Phone className="w-3 h-3" />
                  <span>1800-102-6666</span>
                </a>
                <Link to="/stores" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <MapPin className="w-3 h-3" />
                  <span>Store Locator</span>
                </Link>
              </div>
              <div className="flex items-center gap-6 text-muted-foreground">
                <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
                <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
                <Link to="/account" className="hover:text-primary transition-colors">My Account</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header with Centered Logo */}
        <div className="container mx-auto px-4">
          <div className={cn(
            "flex items-center justify-between transition-all duration-300",
            isScrolled ? "h-14 md:h-16" : "h-16 md:h-20"
          )}>
            {/* Left Side - Mobile Menu & Search */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                className="p-2 -ml-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:text-primary transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Left Side - Desktop Search & Store */}
            <div className="hidden lg:flex items-center gap-4 w-48">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>

            {/* Centered Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:flex-1 lg:flex lg:justify-center group">
              <div className="relative py-1">
                {/* Subtle background glow for blending */}
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-transparent opacity-90 blur-sm -z-10" />
                <img 
                  src={logoImage} 
                  alt="Elara Cosmetics" 
                  className={cn(
                    "w-auto object-contain drop-shadow-sm transition-all duration-300 group-hover:scale-[1.02]",
                    isScrolled 
                      ? "h-10 sm:h-11 md:h-12" 
                      : "h-14 sm:h-16 md:h-20"
                  )}
                  style={{ 
                    mixBlendMode: 'multiply',
                    filter: 'contrast(1.05)'
                  }}
                />
              </div>
            </Link>

            {/* Right Side - Icons */}
            <div className="flex items-center justify-end gap-1 sm:gap-3 w-48">
              <Link to="/account" className="hidden sm:flex p-2 hover:text-primary transition-colors" aria-label="Account">
                <User className="w-5 h-5" />
              </Link>
              <Link to="/wishlist" className="hidden sm:flex p-2 hover:text-primary transition-colors" aria-label="Wishlist">
                <Heart className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:text-primary transition-colors relative"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Bar */}
        <nav className={cn(
          "hidden lg:block border-t border-border/50 bg-background transition-all duration-300",
          isScrolled && "border-t-0"
        )}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-1 xl:gap-2">
              {mainNavigation.map((item) => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => hasSubcategories(item) ? handleMouseEnter(item.id) : null}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={'href' in item ? item.href : `/category/${item.id}`}
                    className={cn(
                      "flex items-center gap-1 px-3 xl:px-4 text-xs xl:text-sm uppercase tracking-luxury font-medium transition-all underline-animation",
                      isScrolled ? "py-2.5" : "py-4",
                      'highlight' in item && item.highlight 
                        ? "text-primary" 
                        : "text-foreground hover:text-primary"
                    )}
                  >
                    {item.name}
                    {hasSubcategories(item) && (
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform duration-200",
                          activeDropdown === item.id && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* Enhanced Mega Menu for categories */}
                  {hasSubcategories(item) && 'subcategories' in item && 'image' in item && (
                    <div
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 bg-background border border-border shadow-luxury-lg w-[600px] transition-all duration-200 z-50",
                        activeDropdown === item.id
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      )}
                    >
                      <div className="grid grid-cols-3 gap-0">
                        {/* Category Image */}
                        <div className="col-span-1 relative overflow-hidden">
                          <img
                            src={(item as any).image}
                            alt={item.name}
                            className="w-full h-full object-cover min-h-[280px]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4 text-background">
                            <p className="font-serif text-lg mb-1">{item.name}</p>
                            <Link
                              to={`/category/${item.id}`}
                              className="text-xs uppercase tracking-luxury flex items-center gap-1 hover:underline"
                            >
                              View All
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>

                        {/* Subcategories */}
                        <div className="col-span-1 p-5 border-l border-border">
                          <p className="text-xs uppercase tracking-wide-luxury text-primary font-medium mb-4">
                            Shop by Category
                          </p>
                          <div className="space-y-2">
                            {(item as any).subcategories.slice(0, 7).map((sub: string) => (
                              <Link
                                key={sub}
                                to={`/category/${item.id}?subcategory=${sub.toLowerCase()}`}
                                className="block text-sm text-foreground hover:text-primary transition-colors py-1"
                              >
                                {sub}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Featured Products */}
                        <div className="col-span-1 p-5 border-l border-border bg-secondary/30">
                          <p className="text-xs uppercase tracking-wide-luxury text-primary font-medium mb-4">
                            Featured
                          </p>
                          <div className="space-y-4">
                            {getFeaturedProducts(item.id).map((product) => (
                              <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                className="flex gap-3 group"
                              >
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-16 h-16 object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-serif line-clamp-2 group-hover:text-primary transition-colors">
                                    {product.name}
                                  </p>
                                  <p className="text-xs text-primary mt-1">
                                    ₹{product.price.toLocaleString()}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-foreground/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Menu Drawer */}
        <div
          className={cn(
            "lg:hidden fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-background z-50 transition-transform duration-300 ease-out shadow-luxury-lg",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="relative">
              <img 
                src={logoImage} 
                alt="Elara Cosmetics" 
                className="h-12 w-auto object-contain"
                style={{ 
                  mixBlendMode: 'multiply',
                  filter: 'contrast(1.05)'
                }}
              />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 -mr-2 hover:text-primary transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto h-[calc(100%-65px)] pb-20">
            {/* Promo Banner */}
            <div className="bg-primary/10 p-4 text-center">
              <p className="text-sm font-medium text-primary flex items-center justify-center gap-2">
                <Gift className="w-4 h-4" />
                Special Offers Available
              </p>
            </div>

            {/* Mobile Search */}
            <div className="p-4">
              <div 
                className="relative"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-3 border border-border text-sm focus:outline-none focus:border-primary cursor-pointer bg-secondary/30"
                  readOnly
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {/* Featured Links */}
            <div className="flex gap-2 px-4 pb-4">
              <Link
                to="/category/face?tag=sale"
                className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground text-xs uppercase tracking-luxury text-center font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Sparkles className="w-3.5 h-3.5 inline-block mr-1.5" />
                Offers
              </Link>
              <Link
                to="/category/face?sort=bestselling"
                className="flex-1 px-4 py-2.5 border border-primary text-primary text-xs uppercase tracking-luxury text-center font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Best Sellers
              </Link>
            </div>

            {/* Mobile Categories */}
            <div className="px-4">
              <p className="text-xs uppercase tracking-luxury text-muted-foreground mb-3">Shop by Category</p>
              {categories.map((category) => (
                <div key={category.id} className="border-b border-border">
                  <Link
                    to={`/category/${category.id}`}
                    className="flex items-center justify-between py-3.5 text-base font-serif text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.name}
                    <ChevronDown className="w-4 h-4 text-muted-foreground -rotate-90" />
                  </Link>
                </div>
              ))}

              {/* Additional Categories */}
              <div className="border-b border-border">
                <Link
                  to="/category/gifting"
                  className="flex items-center justify-between py-3.5 text-base font-serif text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Travel Minis
                  <ChevronDown className="w-4 h-4 text-muted-foreground -rotate-90" />
                </Link>
              </div>
              <div className="border-b border-border">
                <Link
                  to="/category/body"
                  className="flex items-center justify-between py-3.5 text-base font-serif text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Men
                  <ChevronDown className="w-4 h-4 text-muted-foreground -rotate-90" />
                </Link>
              </div>
            </div>

            {/* Mobile Quick Links */}
            <div className="mt-6 px-4">
              <p className="text-xs uppercase tracking-luxury text-muted-foreground mb-3">Quick Links</p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/about"
                  className="p-3 border border-border text-center text-sm hover:border-primary hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/stores"
                  className="p-3 border border-border text-center text-sm hover:border-primary hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Find a Store
                </Link>
                <Link
                  to="/contact"
                  className="p-3 border border-border text-center text-sm hover:border-primary hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
                <Link
                  to="/account"
                  className="p-3 border border-border text-center text-sm hover:border-primary hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Account
                </Link>
              </div>
            </div>

            {/* Mobile Account Links */}
            <div className="mt-6 pt-6 px-4 border-t border-border space-y-3">
              <Link
                to="/account"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Login / Register</span>
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </Link>
            </div>

            {/* Mobile Contact */}
            <div className="mt-6 mx-4 p-4 bg-secondary/50 border border-border">
              <p className="text-xs uppercase tracking-luxury text-muted-foreground mb-3">Need Help?</p>
              <a href="tel:+911800102666" className="flex items-center gap-3 text-foreground mb-2 hover:text-primary transition-colors">
                <Phone className="w-5 h-5 text-primary" />
                <span className="font-medium">1800-102-6666</span>
              </a>
              <p className="text-xs text-muted-foreground">Mon-Sat: 9AM - 9PM IST</p>
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
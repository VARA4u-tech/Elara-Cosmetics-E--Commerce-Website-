import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, ChevronRight, MapPin, Phone, Gift, Sparkles, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { categories, products } from "@/data/products";
import { cn } from "@/lib/utils";
import SearchModal from "@/components/ui/SearchModal";
import logoImage from "@/assets/logo-transparent.png";
import { AnimatePresence, motion } from "framer-motion";

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
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
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

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleMouseEnter = (categoryId: string) => {
    setActiveDropdown(categoryId);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileCategory = (categoryId: string) => {
    setExpandedMobileCategory(expandedMobileCategory === categoryId ? null : categoryId);
  };

  // Check if item has subcategories (is a category object)
  const hasSubcategories = (item: any) => {
    return item.subcategories && item.subcategories.length > 0;
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setExpandedMobileCategory(null);
  };

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        "bg-background/95 backdrop-blur-md",
        isScrolled ? "shadow-sm" : ""
      )}>
        {/* Top Utility Bar - Desktop Only (thin secondary info) */}
        <div className={cn(
          "hidden lg:block bg-muted/40 transition-all duration-300 overflow-hidden",
          isScrolled ? "h-0 opacity-0" : "h-8 opacity-100"
        )}>
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-8 text-xs text-muted-foreground">
              <div className="flex items-center gap-5">
                <a href="tel:+918019156646" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Phone className="w-3 h-3" />
                  <span>+91 8019156646</span>
                </a>
                <span className="w-px h-3 bg-border" />
                <Link to="/stores" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <MapPin className="w-3 h-3" />
                  <span>Store Locator</span>
                </Link>
              </div>
              <div className="flex items-center gap-5">
                <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
                <span className="w-px h-3 bg-border" />
                <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Desktop Header - Logo, Search, Icons, and Navigation in one bar */}
        <div className="hidden lg:block border-b border-border/30">
          <div className="container mx-auto px-6">
            <div className={cn(
              "grid grid-cols-[1fr_auto_1fr] items-center gap-8 transition-all duration-300",
              isScrolled ? "py-2" : "py-3"
            )}>
              {/* Left - Search Bar */}
              <div className="flex items-center">
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-2.5 px-4 py-2 border border-border rounded-sm text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors w-full max-w-[260px]"
                >
                  <Search className="w-4 h-4" />
                  <span>Search products...</span>
                </button>
              </div>

              {/* Center - Logo */}
              <Link to="/" className="flex items-center justify-center">
                <img 
                  src={logoImage} 
                  alt="Elara Cosmetics" 
                  className={cn(
                    "w-auto object-contain transition-all duration-300",
                    isScrolled ? "h-12" : "h-16"
                  )}
                />
              </Link>

              {/* Right - Account Icons */}
              <div className="flex items-center justify-end gap-1">
                <Link 
                  to="/account" 
                  className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:text-primary transition-colors" 
                >
                  <User className="w-4 h-4" />
                  <span className="hidden xl:inline">Account</span>
                </Link>
                <Link 
                  to="/wishlist" 
                  className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:text-primary transition-colors" 
                >
                  <Heart className="w-4 h-4" />
                  <span className="hidden xl:inline">Wishlist</span>
                </Link>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:text-primary transition-colors relative"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="hidden xl:inline">Cart</span>
                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 left-5 xl:static xl:ml-0 bg-primary text-primary-foreground text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-medium px-1">
                      {totalItems > 99 ? "99+" : totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Desktop Navigation - Single horizontal menu */}
            <nav className="flex items-center justify-center border-t border-border/20 -mx-6 px-6">
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
                      "flex items-center gap-1 px-4 py-3 text-[13px] uppercase tracking-wide font-medium transition-colors",
                      "hover:text-primary border-b-2 border-transparent hover:border-primary",
                      'highlight' in item && item.highlight 
                        ? "text-primary" 
                        : "text-foreground"
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

                  {/* Mega Menu for categories with subcategories */}
                  {hasSubcategories(item) && 'subcategories' in item && 'image' in item && (
                    <div
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 bg-background border border-border shadow-xl rounded-sm w-[540px] transition-all duration-200 z-50",
                        activeDropdown === item.id
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2 pointer-events-none"
                      )}
                    >
                      <div className="grid grid-cols-3 gap-0">
                        {/* Category Image */}
                        <div className="col-span-1 relative overflow-hidden">
                          <img
                            src={(item as any).image}
                            alt={item.name}
                            className="w-full h-full object-cover min-h-[240px]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4 text-background">
                            <p className="font-serif text-lg mb-1">{item.name}</p>
                            <Link
                              to={`/category/${item.id}`}
                              className="text-xs uppercase tracking-wider flex items-center gap-1 hover:underline"
                            >
                              View All
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>

                        {/* Subcategories */}
                        <div className="col-span-1 p-4 border-l border-border">
                          <p className="text-xs uppercase tracking-wider text-primary font-medium mb-3">
                            Shop by Category
                          </p>
                          <div className="space-y-1.5">
                            {(item as any).subcategories.slice(0, 7).map((sub: string) => (
                              <Link
                                key={sub}
                                to={`/category/${item.id}?subcategory=${sub.toLowerCase()}`}
                                className="block text-sm text-foreground hover:text-primary transition-colors py-0.5"
                              >
                                {sub}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Featured Products */}
                        <div className="col-span-1 p-4 border-l border-border bg-muted/30">
                          <p className="text-xs uppercase tracking-wider text-primary font-medium mb-3">
                            Featured
                          </p>
                          <div className="space-y-3">
                            {getFeaturedProducts(item.id).map((product) => (
                              <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                className="flex gap-2.5 group"
                              >
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-12 h-12 object-cover rounded-sm"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                                    {product.name}
                                  </p>
                                  <p className="text-xs text-primary mt-0.5">
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
            </nav>
          </div>
        </div>

        {/* Mobile & Tablet Header */}
        <div className="lg:hidden border-b border-border/30">
          <div className="container mx-auto px-4">
            <div className={cn(
              "flex items-center justify-between transition-all duration-300",
              isScrolled ? "h-14" : "h-16"
            )}>
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
                    isScrolled ? "h-10" : "h-12"
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
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-foreground/60 z-50"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="lg:hidden fixed top-0 left-0 h-full w-[85%] max-w-[360px] bg-background z-50 flex flex-col shadow-2xl"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
              <img 
                src={logoImage} 
                alt="Elara Cosmetics" 
                className="h-10 w-auto object-contain"
              />
              <button
                onClick={closeMobileMenu}
                className="p-2 -mr-2 hover:bg-muted/50 rounded-md transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Promo Banner */}
              <div className="bg-primary/10 px-4 py-3">
                <p className="text-sm font-medium text-primary flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  Special Offers Available
                </p>
              </div>

              {/* Mobile Search */}
              <div className="p-4">
                <button 
                  className="w-full flex items-center gap-3 px-4 py-3 border border-border rounded-sm text-sm text-muted-foreground bg-muted/30 hover:border-primary transition-colors"
                  onClick={() => {
                    closeMobileMenu();
                    setIsSearchOpen(true);
                  }}
                >
                  <Search className="w-4 h-4" />
                  <span>Search products...</span>
                </button>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex gap-2 px-4 pb-4">
                <Link
                  to="/category/face?tag=sale"
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-primary text-primary-foreground text-xs uppercase tracking-wider font-medium rounded-sm"
                  onClick={closeMobileMenu}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Offers
                </Link>
                <Link
                  to="/category/face?sort=bestselling"
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 border border-primary text-primary text-xs uppercase tracking-wider font-medium rounded-sm"
                  onClick={closeMobileMenu}
                >
                  Best Sellers
                </Link>
              </div>

              {/* Categories */}
              <div className="px-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">Shop by Category</p>
                <div className="border-t border-border">
                  {categories.map((category) => (
                    <div key={category.id} className="border-b border-border">
                      {hasSubcategories(category) ? (
                        <>
                          <button
                            onClick={() => toggleMobileCategory(category.id)}
                            className="w-full flex items-center justify-between py-3.5 text-base text-foreground hover:text-primary transition-colors"
                          >
                            <span className="font-medium">{category.name}</span>
                            <ChevronDown 
                              className={cn(
                                "w-4 h-4 text-muted-foreground transition-transform duration-200",
                                expandedMobileCategory === category.id && "rotate-180"
                              )}
                            />
                          </button>
                          <AnimatePresence>
                            {expandedMobileCategory === category.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pb-3 pl-4 space-y-2">
                                  <Link
                                    to={`/category/${category.id}`}
                                    className="block py-2 text-sm text-primary font-medium hover:underline"
                                    onClick={closeMobileMenu}
                                  >
                                    View All {category.name}
                                  </Link>
                                  {category.subcategories?.map((sub) => (
                                    <Link
                                      key={sub}
                                      to={`/category/${category.id}?subcategory=${sub.toLowerCase()}`}
                                      className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                      onClick={closeMobileMenu}
                                    >
                                      {sub}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          to={`/category/${category.id}`}
                          className="flex items-center justify-between py-3.5 text-base font-medium text-foreground hover:text-primary transition-colors"
                          onClick={closeMobileMenu}
                        >
                          {category.name}
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </Link>
                      )}
                    </div>
                  ))}

                  {/* Additional Navigation */}
                  <Link
                    to="/category/gifting"
                    className="flex items-center justify-between py-3.5 text-base font-medium text-foreground hover:text-primary transition-colors border-b border-border"
                    onClick={closeMobileMenu}
                  >
                    Travel Minis
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                  <Link
                    to="/category/body"
                    className="flex items-center justify-between py-3.5 text-base font-medium text-foreground hover:text-primary transition-colors border-b border-border"
                    onClick={closeMobileMenu}
                  >
                    Men
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-6 px-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">Quick Links</p>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/about"
                    className="p-3 border border-border text-center text-sm font-medium hover:border-primary hover:text-primary transition-colors rounded-sm"
                    onClick={closeMobileMenu}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/stores"
                    className="p-3 border border-border text-center text-sm font-medium hover:border-primary hover:text-primary transition-colors rounded-sm"
                    onClick={closeMobileMenu}
                  >
                    Find a Store
                  </Link>
                  <Link
                    to="/contact"
                    className="p-3 border border-border text-center text-sm font-medium hover:border-primary hover:text-primary transition-colors rounded-sm"
                    onClick={closeMobileMenu}
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/account"
                    className="p-3 border border-border text-center text-sm font-medium hover:border-primary hover:text-primary transition-colors rounded-sm"
                    onClick={closeMobileMenu}
                  >
                    My Account
                  </Link>
                </div>
              </div>

              {/* Account Links */}
              <div className="mt-6 pt-4 mx-4 border-t border-border space-y-1">
                <Link
                  to="/account"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors py-2.5"
                  onClick={closeMobileMenu}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Login / Register</span>
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors py-2.5"
                  onClick={closeMobileMenu}
                >
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">Wishlist</span>
                </Link>
              </div>

              {/* Contact Info */}
              <div className="mt-6 mx-4 mb-6 p-4 bg-muted/50 border border-border rounded-sm">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-medium">Need Help?</p>
                <a href="tel:+918019156646" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="font-medium">+91 8019156646</span>
                </a>
                <p className="text-xs text-muted-foreground mt-2">Mon-Sat: 9AM - 9PM IST</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;

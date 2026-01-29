import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, X, Gift, Sparkles, ChevronDown, ChevronRight, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { categories } from "@/data/products";
import logoImage from "@/assets/logo-transparent.png";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  setIsSearchOpen: (isOpen: boolean) => void;
}

const MobileMenu = ({ isOpen, onClose, setIsSearchOpen }: MobileMenuProps) => {
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);

  const toggleMobileCategory = (categoryId: string) => {
    setExpandedMobileCategory(
      expandedMobileCategory === categoryId ? null : categoryId,
    );
  };

  // Check if item has subcategories (is a category object)
  const hasSubcategories = (item: any) => {
    return item.subcategories && item.subcategories.length > 0;
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-foreground/60 z-50"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
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
                onClick={onClose}
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
                    onClose();
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
                  onClick={onClose}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Offers
                </Link>
                <Link
                  to="/category/face?sort=bestselling"
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 border border-primary text-primary text-xs uppercase tracking-wider font-medium rounded-sm"
                  onClick={onClose}
                >
                  Best Sellers
                </Link>
              </div>

              {/* Categories */}
              <div className="px-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                  Shop by Category
                </p>
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
                                expandedMobileCategory === category.id &&
                                  "rotate-180",
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
                                    onClick={onClose}
                                  >
                                    View All {category.name}
                                  </Link>
                                  {category.subcategories?.map((sub) => (
                                    <Link
                                      key={sub}
                                      to={`/category/${category.id}?subcategory=${sub.toLowerCase()}`}
                                      className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                      onClick={onClose}
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
                          onClick={onClose}
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
                    onClick={onClose}
                  >
                    Travel Minis
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                  <Link
                    to="/category/body"
                    className="flex items-center justify-between py-3.5 text-base font-medium text-foreground hover:text-primary transition-colors border-b border-border"
                    onClick={onClose}
                  >
                    Men
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-6 px-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                  Quick Links
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/about"
                    className="p-3 border border-border text-center text-sm font-medium hover:border-primary hover:text-primary transition-colors rounded-sm"
                    onClick={onClose}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/stores"
                    className="p-3 border border-border text-center text-sm font-medium hover:border-primary hover:text-primary transition-colors rounded-sm"
                    onClick={onClose}
                  >
                    Find a Store
                  </Link>
                  <Link
                    to="/contact"
                    className="p-3 border border-border text-center text-sm font-medium hover:border-primary hover:text-primary transition-colors rounded-sm"
                    onClick={onClose}
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/account"
                    className="p-3 border border-border text-center text-sm font-medium hover:border-primary hover:text-primary transition-colors rounded-sm"
                    onClick={onClose}
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
                  onClick={onClose}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Login / Register</span>
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors py-2.5"
                  onClick={onClose}
                >
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">Wishlist</span>
                </Link>
              </div>

              {/* Contact Info */}
              <div className="mt-6 mx-4 mb-6 p-4 bg-muted/50 border border-border rounded-sm">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-medium">
                  Need Help?
                </p>
                <a
                  href="tel:+918019156646"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="font-medium">+91 8019156646</span>
                </a>
                <p className="text-xs text-muted-foreground mt-2">
                  Mon-Sat: 9AM - 9PM IST
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;

import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories, products } from "@/data/products";

// Navigation items - only categories with actual products
const navItems = [
  { id: "face", name: "Face", href: "/category/face" },
  { id: "bath-body", name: "Bath & Body", href: "/category/body" },
  { id: "hair", name: "Hair", href: "/category/hair" },
  { id: "wellness", name: "Wellness", href: "/category/wellness" },
  { id: "makeup", name: "Makeup", href: "/category/makeup" },
  { id: "gifting", name: "Gifting", href: "/category/gifting", badge: "NEW" },
  { id: "about", name: "About Us", href: "/about" },
];

// Helper to get featured products for mega menu
const getFeaturedProducts = (categoryId: string) => {
  return products.filter((p) => p.category === categoryId).slice(0, 2);
};

const CategoryNav = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Helper to find category data
  const getCategoryData = (id: string) => {
    // Map custom IDs to actual data IDs if needed
    const map: Record<string, string> = {
      "bath-body": "body",
      travel: "gifting", // Use gifting for travel for now
    };
    const lookupId = map[id] || id;
    return categories.find((c) => c.id === lookupId);
  };

  const hasDropdown = (id: string) => {
    return !!getCategoryData(id);
  };

  return (
    <div className="hidden lg:block border-t border-b border-border/10 bg-white/50 backdrop-blur-sm relative z-40">
      <div className="container mx-auto px-4">
        <nav
          className="flex items-center justify-center gap-3 lg:gap-4 xl:gap-6 w-full py-2 lg:flex-nowrap"
          onMouseLeave={() => setActiveDropdown(null)}
        >
          {navItems.map((item) => (
            <div
              key={item.id}
              className="relative group shrink-0 h-full flex items-center"
              onMouseEnter={() => setActiveDropdown(item.id)}
            >
              <Link
                to={item.href}
                className={cn(
                  "flex flex-col items-center justify-center relative py-2",
                  activeDropdown === item.id
                    ? "text-black"
                    : "text-foreground/75",
                )}
              >
                {item.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C5A065] text-white text-[8px] font-bold px-1.5 py-[1px] rounded-[1px] leading-tight tracking-wider shadow-sm whitespace-nowrap">
                    {item.badge}
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-[#C5A065]"></span>
                  </span>
                )}
                <span className="text-xs uppercase tracking-[0.15em] font-medium hover:text-primary transition-colors border-b-2 border-transparent group-hover:border-primary/20 pb-1">
                  {item.name}
                </span>
              </Link>

              {/* Mega Menu Dropdown */}
              {activeDropdown === item.id && hasDropdown(item.id) && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px]"
                  style={{ transform: "translateX(-50%)" }}
                >
                  <div className="bg-white border border-border/20 shadow-xl rounded-sm p-0 grid grid-cols-12 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Left: Subcategories List */}
                    <div className="col-span-4 bg-muted/20 p-5 border-r border-border/10">
                      <h4 className="text-xs uppercase tracking-widest text-primary font-bold mb-4">
                        {item.name} Collection
                      </h4>
                      <ul className="space-y-2">
                        {getCategoryData(item.id)?.subcategories.map((sub) => (
                          <li key={sub}>
                            <Link
                              to={`${item.href}?sub=${sub.toLowerCase()}`}
                              className="text-sm text-foreground/80 hover:text-primary transition-colors block py-0.5 leading-relaxed"
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                        <li className="pt-2 mt-2 border-t border-border/10">
                          <Link
                            to={item.href}
                            className="text-xs uppercase tracking-wider font-medium text-foreground hover:text-primary underline decoration-foreground/30 hover:decoration-primary transition-colors block"
                          >
                            View All
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Middle: Featured Image/Content */}
                    <div className="col-span-8 p-5">
                      <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-4">
                        Highlights
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {getFeaturedProducts(getCategoryData(item.id)?.id || "")
                          .slice(0, 2)
                          .map((product) => (
                            <Link
                              key={product.id}
                              to={`/product/${product.id}`}
                              className="group block"
                            >
                              <div className="aspect-[3/4] overflow-hidden rounded-sm bg-muted mb-2 relative">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              </div>
                              <h5 className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors leading-tight">
                                {product.name}
                              </h5>
                              <p className="text-xs text-muted-foreground">
                                ₹{product.price.toLocaleString()}
                              </p>
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
  );
};

export default CategoryNav;

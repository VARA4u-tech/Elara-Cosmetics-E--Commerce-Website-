import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories, products } from "@/data/products";

// Navigation items matching the reference image exactly
const navItems = [
  { id: "customised", name: "Customised Skincare", href: "/category/customised", badge: "NEW" },
  { id: "face", name: "Face", href: "/category/face" },
  { id: "bath-body", name: "Bath & Body", href: "/category/body" },
  { id: "hair", name: "Hair", href: "/category/hair" },
  { id: "makeup", name: "Makeup", href: "/category/makeup" },
  { id: "gifting", name: "Gifting", href: "/category/gifting", badge: "NEW" },
  { id: "travel", name: "Travel Minis", href: "/category/travel-minis" },
  { id: "baby", name: "Baby Care", href: "/category/baby-care" },
  { id: "men", name: "Men", href: "/category/men" },
  { id: "fragrance", name: "Fragrance", href: "/category/fragrance" },
  { id: "about", name: "About Us", href: "/about" },
  { id: "exclusives", name: "Exclusives!", href: "/category/exclusives" },
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
      "travel": "gifting", // Use gifting for travel for now
    };
    const lookupId = map[id] || id;
    return categories.find(c => c.id === lookupId);
  };

  const hasDropdown = (id: string) => {
    return !!getCategoryData(id);
  };

  return (
    <div className="hidden lg:block border-t border-b border-border/10 bg-white/50 backdrop-blur-sm relative z-40">
      <div className="container mx-auto px-4">
        <nav
          className="flex items-center justify-center gap-4 lg:gap-6 xl:gap-8 w-full py-3 lg:flex-nowrap"
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
                  activeDropdown === item.id ? "text-black" : "text-foreground/75"
                )}
              >
                {item.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C5A065] text-white text-[8px] font-bold px-1.5 py-[1px] rounded-[1px] leading-tight tracking-wider shadow-sm whitespace-nowrap">
                    {item.badge}
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-[#C5A065]"></span>
                  </span>
                )}
                <span className="text-[11px] uppercase tracking-[0.15em] font-medium hover:text-black transition-colors border-b-2 border-transparent group-hover:border-black/10 pb-1">
                  {item.name}
                </span>
              </Link>

              {/* Mega Menu Dropdown */}
              {activeDropdown === item.id && hasDropdown(item.id) && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px]"
                  style={{ transform: 'translateX(-50%)' }}
                >
                  <div className="bg-white border border-border/20 shadow-xl rounded-sm p-0 grid grid-cols-12 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">

                    {/* Left: Subcategories List */}
                    <div className="col-span-4 bg-muted/20 p-5 border-r border-border/10">
                      <h4 className="text-[10px] uppercase tracking-widest text-primary font-bold mb-4">
                        {item.name} Collection
                      </h4>
                      <ul className="space-y-2">
                        {getCategoryData(item.id)?.subcategories.map(sub => (
                          <li key={sub}>
                            <Link
                              to={`${item.href}?sub=${sub.toLowerCase()}`}
                              className="text-[12px] text-foreground/80 hover:text-primary transition-colors block py-0.5"
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                        <li className="pt-2 mt-2 border-t border-border/10">
                          <Link
                            to={item.href}
                            className="text-[11px] uppercase tracking-wider font-medium text-black underline decoration-black/30 hover:decoration-black block"
                          >
                            View All
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Middle: Featured Image/Content */}
                    <div className="col-span-8 p-5">
                      <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-4">
                        Highlights
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {getFeaturedProducts(getCategoryData(item.id)?.id || "").slice(0, 2).map((product) => (
                          <Link key={product.id} to={`/product/${product.id}`} className="group block">
                            <div className="aspect-[3/4] overflow-hidden rounded-sm bg-muted mb-2 relative">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                            <h5 className="text-[12px] font-medium line-clamp-1 group-hover:text-primary transition-colors">
                              {product.name}
                            </h5>
                            <p className="text-[11px] text-muted-foreground">
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

import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories, products } from "@/data/products";

// Extended navigation with more categories
const mainNavigation = [
  {
    id: "offers",
    name: "Offers",
    href: "/category/face?tag=sale",
    highlight: true,
  },
  {
    id: "bestsellers",
    name: "Best Sellers",
    href: "/category/face?sort=bestselling",
  },
  ...categories,
  { id: "travel", name: "Travel Minis", href: "/category/gifting" },
  { id: "men", name: "Men", href: "/category/body" },
];

// Featured products for mega menu
const getFeaturedProducts = (categoryId: string) => {
  return products.filter((p) => p.category === categoryId).slice(0, 2);
};

const CategoryNav = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
    <div className="hidden lg:block border-t border-border/20">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
      {mainNavigation.map((item) => (
        <div
          key={item.id}
          className="relative"
          onMouseEnter={() =>
            hasSubcategories(item) ? handleMouseEnter(item.id) : null
          }
          onMouseLeave={handleMouseLeave}
        >
          <Link
            to={"href" in item ? item.href : `/category/${item.id}`}
            className={cn(
              "flex items-center gap-1 px-4 py-2 text-[13px] uppercase tracking-[0.15em] font-medium transition-colors relative group",
              'highlight' in item && item.highlight 
                ? "text-primary" 
                : "text-foreground hover:text-primary"
            )}
          >
            {item.name}
            <span className={cn(
              "absolute bottom-2 left-5 right-5 h-px bg-primary transform scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 group-hover:origin-left",
              'highlight' in item && item.highlight && "scale-x-100 origin-left"
            )} />
            {hasSubcategories(item) && (
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform duration-200",
                  activeDropdown === item.id && "rotate-180",
                )}
              />
            )}
          </Link>

          {/* Mega Menu for categories with subcategories */}
          {hasSubcategories(item) &&
            "subcategories" in item &&
            "image" in item && (
              <div
                className={cn(
                  "absolute top-full left-1/2 -translate-x-1/2 bg-background border border-border shadow-xl rounded-sm w-[540px] transition-all duration-200 z-50",
                  activeDropdown === item.id
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none",
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
                      <p className="font-serif text-lg mb-1">
                        {item.name}
                      </p>
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
                      {(item as any).subcategories
                        .slice(0, 7)
                        .map((sub: string) => (
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
  );
};

export default CategoryNav;

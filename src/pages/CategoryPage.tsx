import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { Filter, X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/ui/PageTransition";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductCard from "@/components/product/ProductCard";
import FilterSidebar from "@/components/product/FilterSidebar";
import { categories, getProductsByCategory } from "@/data/products";
import { cn } from "@/lib/utils";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [sortBy, setSortBy] = useState("bestselling");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);
  
  const category = categories.find((c) => c.id === categoryId);
  const allProducts = getProductsByCategory(categoryId || "");

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    if (selectedSubcategory) {
      filtered = filtered.filter(p => p.subcategory === selectedSubcategory);
    }

    if (selectedConcerns.length > 0) {
      filtered = filtered.filter(p => 
        p.concern?.some(c => selectedConcerns.includes(c))
      );
    }

    if (priceRange[0] !== 0 || priceRange[1] !== Infinity) {
      filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered = [...filtered].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        filtered = [...filtered].sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    return filtered;
  }, [allProducts, selectedSubcategory, selectedConcerns, priceRange, sortBy]);

  const clearAllFilters = () => {
    setSelectedSubcategory(null);
    setSelectedConcerns([]);
    setPriceRange([0, Infinity]);
  };

  if (!category) {
    return <Layout><PageTransition><div className="container mx-auto px-4 py-20 text-center">Category not found</div></PageTransition></Layout>;
  }

  return (
    <Layout>
      <PageTransition>
      {/* Category Hero */}
      <div className="relative bg-secondary/30 py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={category.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Breadcrumbs items={[{ label: category.name }]} />
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">{category.name}</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover our curated collection of {category.name.toLowerCase()} care products, crafted with ancient Ayurvedic wisdom
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              subcategories={category.subcategories}
              selectedSubcategory={selectedSubcategory}
              onSubcategoryChange={setSelectedSubcategory}
              selectedConcerns={selectedConcerns}
              onConcernsChange={setSelectedConcerns}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              onClearAll={clearAllFilters}
            />
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground">{filteredProducts.length} products</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowMobileFilter(true)}
                  className="lg:hidden flex items-center gap-2 text-sm uppercase tracking-luxury"
                >
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-border px-4 py-2 text-sm bg-background focus:outline-none focus:border-primary"
                >
                  <option value="bestselling">Bestselling</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No products match your filters</p>
                <button onClick={clearAllFilters} className="btn-outline-luxury">Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <div className={cn("fixed inset-0 z-50 lg:hidden transition-opacity", showMobileFilter ? "opacity-100 visible" : "opacity-0 invisible")}>
        <div className="absolute inset-0 bg-foreground/50" onClick={() => setShowMobileFilter(false)} />
        <div className={cn("absolute right-0 top-0 h-full w-80 bg-background p-6 overflow-y-auto transition-transform", showMobileFilter ? "translate-x-0" : "translate-x-full")}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-serif">Filters</h3>
            <button onClick={() => setShowMobileFilter(false)}><X className="w-5 h-5" /></button>
          </div>
          <FilterSidebar
            subcategories={category.subcategories}
            selectedSubcategory={selectedSubcategory}
            onSubcategoryChange={setSelectedSubcategory}
            selectedConcerns={selectedConcerns}
            onConcernsChange={setSelectedConcerns}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            onClearAll={clearAllFilters}
          />
        </div>
      </div>
      </PageTransition>
    </Layout>
  );
};

export default CategoryPage;

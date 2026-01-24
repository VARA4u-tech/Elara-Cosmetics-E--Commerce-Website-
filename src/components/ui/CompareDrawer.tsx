import { X, ArrowRight, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { useCompare } from "@/context/CompareContext";
import { formatPrice } from "@/data/products";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const CompareDrawer = () => {
  const { compareItems, removeFromCompare, clearCompare, isCompareOpen, setIsCompareOpen } = useCompare();

  if (compareItems.length === 0) {
    return null;
  }

  return (
    <>
      {/* Floating Compare Button */}
      {!isCompareOpen && compareItems.length > 0 && (
        <button
          onClick={() => setIsCompareOpen(true)}
          className="fixed bottom-24 left-6 z-40 flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground shadow-luxury-lg hover:bg-accent transition-colors"
        >
          <Scale className="w-4 h-4" />
          <span className="text-sm font-medium">Compare ({compareItems.length})</span>
        </button>
      )}

      {/* Compare Sheet */}
      <Sheet open={isCompareOpen} onOpenChange={setIsCompareOpen}>
        <SheetContent side="bottom" className="h-auto max-h-[80vh]">
          <SheetHeader className="pb-4 border-b border-border">
            <div className="flex items-center justify-between">
              <SheetTitle className="font-serif text-xl flex items-center gap-2">
                <Scale className="w-5 h-5 text-primary" />
                Compare Products ({compareItems.length}/3)
              </SheetTitle>
              <button
                onClick={clearCompare}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Clear All
              </button>
            </div>
          </SheetHeader>

          <div className="py-6">
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {compareItems.map((product) => (
                <div
                  key={product.id}
                  className="relative border border-border p-4 bg-card"
                >
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute top-2 right-2 p-1 bg-background border border-border hover:border-destructive hover:text-destructive transition-colors"
                    aria-label="Remove from compare"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm line-clamp-2 mb-1">
                        {product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-1">
                        {product.size}
                      </p>
                      <p className="font-medium text-primary">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Empty Slots */}
              {Array.from({ length: 3 - compareItems.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="border border-dashed border-border p-4 flex items-center justify-center min-h-[100px]"
                >
                  <p className="text-sm text-muted-foreground">
                    Add product to compare
                  </p>
                </div>
              ))}
            </div>

            {/* Compare Button */}
            {compareItems.length >= 2 && (
              <div className="flex justify-center">
                <Link
                  to="/compare"
                  onClick={() => setIsCompareOpen(false)}
                  className="btn-luxury flex items-center gap-2"
                >
                  Compare Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {compareItems.length < 2 && (
              <p className="text-center text-sm text-muted-foreground">
                Add at least 2 products to compare
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CompareDrawer;

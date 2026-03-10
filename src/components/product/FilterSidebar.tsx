import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { concerns } from "@/data/products";

interface FilterSidebarProps {
  subcategories: string[];
  selectedSubcategory: string | null;
  onSubcategoryChange: (subcategory: string | null) => void;
  selectedConcerns: string[];
  onConcernsChange: (concerns: string[]) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  onClearAll: () => void;
}

const priceRanges = [
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 - ₹2,000", min: 1000, max: 2000 },
  { label: "₹2,000 - ₹3,000", min: 2000, max: 3000 },
  { label: "₹3,000 - ₹5,000", min: 3000, max: 5000 },
  { label: "Above ₹5,000", min: 5000, max: Infinity },
];

const FilterSidebar = ({
  subcategories,
  selectedSubcategory,
  onSubcategoryChange,
  selectedConcerns,
  onConcernsChange,
  priceRange,
  onPriceRangeChange,
  onClearAll,
}: FilterSidebarProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "subcategory",
    "concern",
    "price",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  const handleConcernChange = (concern: string) => {
    if (selectedConcerns.includes(concern)) {
      onConcernsChange(selectedConcerns.filter((c) => c !== concern));
    } else {
      onConcernsChange([...selectedConcerns, concern]);
    }
  };

  const hasActiveFilters =
    selectedSubcategory ||
    selectedConcerns.length > 0 ||
    priceRange[0] !== 0 ||
    priceRange[1] !== Infinity;

  return (
    <aside className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <h3 className="text-sm uppercase tracking-luxury font-medium">
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-xs uppercase tracking-luxury text-primary hover:text-accent transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Subcategory Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("subcategory")}
          className="flex items-center justify-between w-full py-2 text-sm uppercase tracking-luxury font-medium"
        >
          Category
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform",
              expandedSections.includes("subcategory") && "rotate-180",
            )}
          />
        </button>
        <div
          className={cn(
            "overflow-hidden transition-all duration-300",
            expandedSections.includes("subcategory")
              ? "max-h-96 opacity-100 mt-3"
              : "max-h-0 opacity-0",
          )}
        >
          <div className="space-y-2">
            <button
              onClick={() => onSubcategoryChange(null)}
              className={cn(
                "block text-sm transition-colors",
                !selectedSubcategory
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              All
            </button>
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => onSubcategoryChange(sub)}
                className={cn(
                  "block text-sm transition-colors",
                  selectedSubcategory === sub
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Concern Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("concern")}
          className="flex items-center justify-between w-full py-2 text-sm uppercase tracking-luxury font-medium"
        >
          Concern
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform",
              expandedSections.includes("concern") && "rotate-180",
            )}
          />
        </button>
        <div
          className={cn(
            "overflow-hidden transition-all duration-300",
            expandedSections.includes("concern")
              ? "max-h-96 opacity-100 mt-3"
              : "max-h-0 opacity-0",
          )}
        >
          <div className="space-y-2">
            {concerns.map((concern) => (
              <label
                key={concern}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div
                  className={cn(
                    "w-4 h-4 border flex items-center justify-center transition-colors",
                    selectedConcerns.includes(concern)
                      ? "bg-primary border-primary"
                      : "border-border group-hover:border-primary",
                  )}
                >
                  {selectedConcerns.includes(concern) && (
                    <svg
                      className="w-3 h-3 text-primary-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm transition-colors",
                    selectedConcerns.includes(concern)
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                  onClick={() => handleConcernChange(concern)}
                >
                  {concern}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full py-2 text-sm uppercase tracking-luxury font-medium"
        >
          Price
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform",
              expandedSections.includes("price") && "rotate-180",
            )}
          />
        </button>
        <div
          className={cn(
            "overflow-hidden transition-all duration-300",
            expandedSections.includes("price")
              ? "max-h-96 opacity-100 mt-3"
              : "max-h-0 opacity-0",
          )}
        >
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <button
                key={range.label}
                onClick={() => onPriceRangeChange([range.min, range.max])}
                className={cn(
                  "block text-sm transition-colors",
                  priceRange[0] === range.min && priceRange[1] === range.max
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-border">
          <p className="text-xs uppercase tracking-luxury text-muted-foreground mb-3">
            Active Filters
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedSubcategory && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-xs">
                {selectedSubcategory}
                <button onClick={() => onSubcategoryChange(null)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedConcerns.map((concern) => (
              <span
                key={concern}
                className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-xs"
              >
                {concern}
                <button onClick={() => handleConcernChange(concern)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {(priceRange[0] !== 0 || priceRange[1] !== Infinity) && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-xs">
                {
                  priceRanges.find(
                    (r) => r.min === priceRange[0] && r.max === priceRange[1],
                  )?.label
                }
                <button onClick={() => onPriceRangeChange([0, Infinity])}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};

export default FilterSidebar;

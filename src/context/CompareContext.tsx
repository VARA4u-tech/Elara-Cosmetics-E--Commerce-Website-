import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/data/products";
import { toast } from "sonner";

interface CompareContextType {
  compareItems: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [compareItems, setCompareItems] = useState<Product[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const addToCompare = (product: Product) => {
    if (compareItems.length >= 3) {
      toast.error("You can compare up to 3 products only");
      return;
    }
    if (compareItems.find((item) => item.id === product.id)) {
      toast.info("Product already in compare list");
      return;
    }
    setCompareItems((prev) => [...prev, product]);
    toast.success(`${product.name} added to compare`);
  };

  const removeFromCompare = (productId: string) => {
    setCompareItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  const isInCompare = (productId: string) => {
    return compareItems.some((item) => item.id === productId);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        isCompareOpen,
        setIsCompareOpen,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
};

import { Link } from "react-router-dom";
import { Heart, Star, Scale } from "lucide-react";
import { Product, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useCompare } from "@/context/CompareContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addItem } = useCart();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();

  const handleCompareClick = () => {
    if (isInCompare(product.id)) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  return (
    <div className={cn("group card-luxury", className)}>
      {/* Image Container */}
      <div className="relative overflow-hidden bg-secondary/20">
        <Link to={`/product/${product.id}`}>
          <div className="aspect-[3/4] img-zoom">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain object-center transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
          {product.isNew && (
            <span className="bg-accent text-accent-foreground text-[10px] uppercase tracking-luxury px-2 py-0.5">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-primary text-primary-foreground text-[10px] uppercase tracking-luxury px-2 py-0.5">
              Bestseller
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-destructive text-destructive-foreground text-[10px] uppercase tracking-luxury px-2 py-0.5">
              Sale
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            className="w-9 h-9 bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart className="w-4 h-4" />
          </button>
          <button 
            onClick={handleCompareClick}
            className={cn(
              "w-9 h-9 backdrop-blur-sm flex items-center justify-center transition-colors",
              isInCompare(product.id)
                ? "bg-primary text-primary-foreground"
                : "bg-background/80 hover:bg-primary hover:text-primary-foreground"
            )}
            aria-label={isInCompare(product.id) ? "Remove from compare" : "Add to compare"}
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add Button */}
        <button
          onClick={() => addItem(product)}
          className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground py-2 text-[10px] uppercase tracking-wider font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-accent hover:text-accent-foreground"
        >
          Add to Bag
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-1.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-3 h-3",
                i < Math.floor(product.rating)
                  ? "fill-primary text-primary"
                  : "fill-muted text-muted"
              )}
            />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">
            ({product.reviews})
          </span>
        </div>

        {/* Title */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-sm leading-snug text-foreground mb-1.5 hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

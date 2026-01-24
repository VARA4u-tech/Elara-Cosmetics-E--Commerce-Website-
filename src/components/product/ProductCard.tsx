import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { Product, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addItem } = useCart();

  return (
    <div className={cn("group card-luxury", className)}>
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <div className="aspect-square img-zoom">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-accent text-accent-foreground text-xs uppercase tracking-luxury px-3 py-1">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-primary text-primary-foreground text-xs uppercase tracking-luxury px-3 py-1">
              Bestseller
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-destructive text-destructive-foreground text-xs uppercase tracking-luxury px-3 py-1">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 w-9 h-9 bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-primary-foreground">
          <Heart className="w-4 h-4" />
        </button>

        {/* Quick Add Button */}
        <button
          onClick={() => addItem(product)}
          className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground py-3 text-sm uppercase tracking-luxury font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-accent hover:text-accent-foreground"
        >
          Add to Bag
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
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
          <span className="text-xs text-muted-foreground ml-1">
            ({product.reviews})
          </span>
        </div>

        {/* Title */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-base leading-snug text-foreground mb-2 hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">
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

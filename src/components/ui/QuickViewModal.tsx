import { useState } from "react";
import { X, Star, Minus, Plus, Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Product, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal = ({ product, isOpen, onClose }: QuickViewModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden">
        <DialogTitle className="sr-only">
          Quick View: {product.name}
        </DialogTitle>
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square bg-secondary/20">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && <span className="badge-new">New</span>}
              {product.isBestseller && (
                <span className="badge-bestseller">Bestseller</span>
              )}
              {product.originalPrice && (
                <span className="badge-sale">Sale</span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col">
            {/* Category */}
            <p className="text-xs uppercase tracking-luxury text-primary mb-2">
              {product.category}
            </p>

            {/* Title */}
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted",
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-serif text-2xl text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
              {product.description}
            </p>

            {/* Size */}
            <p className="text-sm text-muted-foreground mb-6">
              <span className="font-medium text-foreground">Size:</span>{" "}
              {product.size}
            </p>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-secondary transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-secondary transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="btn-luxury flex-1 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag
              </button>
              <button className="icon-btn">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* View Full Details Link */}
            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="text-sm uppercase tracking-luxury text-primary hover:text-accent transition-colors underline-animation self-start mt-auto"
            >
              View Full Details
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;

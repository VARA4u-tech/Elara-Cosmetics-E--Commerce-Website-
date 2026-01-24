import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { getBestsellers, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";

const WishlistPage = () => {
  const { addItem } = useCart();
  // For demo purposes, showing bestsellers as wishlist items
  const wishlistItems = getBestsellers();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Wishlist" }]} />
        
        <div className="flex items-center gap-3 mb-8 mt-4">
          <Heart className="w-6 h-6 text-primary fill-primary" />
          <h1 className="font-serif text-3xl md:text-4xl">My Wishlist</h1>
          <span className="text-muted-foreground">({wishlistItems.length} items)</span>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h2 className="font-serif text-2xl mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">Save your favorite items to revisit them later.</p>
            <Link to="/" className="btn-luxury">Start Shopping</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <div key={product.id} className="group card-luxury">
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
                  
                  {/* Remove Button */}
                  <button 
                    className="absolute top-3 right-3 w-9 h-9 bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && <span className="badge-new">New</span>}
                    {product.isBestseller && <span className="badge-bestseller">Bestseller</span>}
                  </div>
                </div>

                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-serif text-base leading-snug text-foreground mb-2 hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-3">{product.size}</p>
                  
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="font-medium text-foreground">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => addItem(product)}
                      className="flex items-center gap-2 text-sm uppercase tracking-luxury text-primary hover:text-primary/80 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span className="hidden sm:inline">Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WishlistPage;
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Star, Minus, Plus, Heart, Truck, RefreshCw, Shield, Scale } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/ui/PageTransition";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import RelatedProducts from "@/components/product/RelatedProducts";
import CustomerReviewsWithPhotos from "@/components/product/CustomerReviewsWithPhotos";
import { getProductById, getProductsByCategory, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useCompare } from "@/context/CompareContext";
import { cn } from "@/lib/utils";

const ProductPage = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const { addItem } = useCart();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();
  
  const product = getProductById(productId || "");
  const relatedProducts = product 
    ? getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4)
    : [];

  if (!product) {
    return <Layout><PageTransition><div className="container mx-auto px-4 py-20 text-center">Product not found</div></PageTransition></Layout>;
  }

  const handleCompareClick = () => {
    if (isInCompare(product.id)) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const breadcrumbItems = [
    { label: product.category.charAt(0).toUpperCase() + product.category.slice(1), href: `/category/${product.category}` },
    { label: product.name },
  ];

  return (
    <Layout>
      <PageTransition>
        <div className="container mx-auto px-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <ProductImageGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <div>
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.isNew && <span className="badge-new">New</span>}
              {product.isBestseller && <span className="badge-bestseller">Bestseller</span>}
            </div>

            <p className="text-sm text-primary uppercase tracking-luxury mb-2">{product.category}</p>
            <h1 className="font-serif text-3xl md:text-4xl mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted")} />
              ))}
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-serif text-2xl">{formatPrice(product.price)}</span>
              {product.originalPrice && <span className="text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>}
            </div>

            <p className="text-muted-foreground mb-6">{product.description}</p>

            <p className="text-sm mb-6"><span className="font-medium">Size:</span> {product.size}</p>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-border">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-secondary transition-colors"><Minus className="w-4 h-4" /></button>
                <span className="px-6 font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-secondary transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
              <button onClick={() => addItem(product, quantity)} className="btn-luxury flex-1">Add to Bag</button>
              <button className="icon-btn"><Heart className="w-5 h-5" /></button>
              <button 
                onClick={handleCompareClick}
                className={cn(
                  "icon-btn",
                  isInCompare(product.id) && "bg-primary text-primary-foreground border-primary"
                )}
                title={isInCompare(product.id) ? "Remove from compare" : "Add to compare"}
              >
                <Scale className="w-5 h-5" />
              </button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-border mb-6">
              <div className="text-center">
                <Truck className="w-5 h-5 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-5 h-5 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Easy Returns</p>
              </div>
              <div className="text-center">
                <Shield className="w-5 h-5 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">100% Authentic</p>
              </div>
            </div>

            {/* Tabs */}
            <div>
              <div className="flex gap-6 mb-4 border-b border-border">
                {["description", "ingredients", "how to use"].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={cn("text-sm uppercase tracking-luxury pb-3 transition-colors", activeTab === tab ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground")}>
                    {tab}
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {activeTab === "description" && product.description}
                {activeTab === "ingredients" && product.ingredients}
                {activeTab === "how to use" && product.howToUse}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Show customer reviews with before/after photos for face products */}
      {product.category === "face" && <CustomerReviewsWithPhotos />}

      <RelatedProducts products={relatedProducts} />
      </PageTransition>
    </Layout>
  );
};

export default ProductPage;

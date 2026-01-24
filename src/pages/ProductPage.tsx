import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Star, Minus, Plus, Heart } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { getProductById, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";

const ProductPage = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const { addItem } = useCart();
  
  const product = getProductById(productId || "");

  if (!product) {
    return <Layout><div className="container mx-auto px-4 py-20 text-center">Product not found</div></Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="aspect-square">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div>
            <p className="text-sm text-primary uppercase tracking-luxury mb-2">{product.category}</p>
            <h1 className="font-serif text-3xl md:text-4xl mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"}`} />
              ))}
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-serif text-2xl">{formatPrice(product.price)}</span>
              {product.originalPrice && <span className="text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>}
            </div>

            <p className="text-muted-foreground mb-6">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3"><Minus className="w-4 h-4" /></button>
                <span className="px-6">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3"><Plus className="w-4 h-4" /></button>
              </div>
              <button onClick={() => addItem(product, quantity)} className="btn-luxury flex-1">Add to Bag</button>
              <button className="p-3 border border-border"><Heart className="w-5 h-5" /></button>
            </div>

            <div className="border-t border-border pt-6">
              <div className="flex gap-6 mb-4">
                {["description", "ingredients", "how to use"].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`text-sm uppercase tracking-luxury pb-2 ${activeTab === tab ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}>
                    {tab}
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {activeTab === "description" && product.description}
                {activeTab === "ingredients" && product.ingredients}
                {activeTab === "how to use" && product.howToUse}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;

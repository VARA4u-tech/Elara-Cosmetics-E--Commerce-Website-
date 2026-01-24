import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

const CartPage = () => {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-serif text-3xl md:text-4xl mb-8">Shopping Bag</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-6">Your bag is empty</p>
            <Link to="/" className="btn-luxury">Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-6 border-b border-border pb-6">
                  <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover" />
                  <div className="flex-1">
                    <h3 className="font-serif text-lg mb-1">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.product.size}</p>
                    <p className="font-medium">{formatPrice(item.product.price)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                    <div className="flex items-center border border-border">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2"><Minus className="w-3 h-3" /></button>
                      <span className="px-3 text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-2"><Plus className="w-3 h-3" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-secondary/30 p-6">
              <h2 className="font-serif text-xl mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(totalPrice)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>Calculated at checkout</span></div>
              </div>
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between font-medium text-lg"><span>Total</span><span>{formatPrice(totalPrice)}</span></div>
              </div>
              <Link to="/checkout" className="btn-luxury w-full text-center block">Proceed to Checkout</Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;

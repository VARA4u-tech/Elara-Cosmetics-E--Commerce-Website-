import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

const CheckoutPage = () => {
  const { items, totalPrice } = useCart();
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", address: "", city: "", state: "", pincode: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-serif text-3xl md:text-4xl mb-8">Checkout</h1>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-serif text-xl mb-6">Shipping Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="col-span-1 border border-border p-3 bg-background" />
              <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="col-span-1 border border-border p-3 bg-background" />
              <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="col-span-2 border border-border p-3 bg-background" />
              <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="col-span-2 border border-border p-3 bg-background" />
              <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="col-span-2 border border-border p-3 bg-background" />
              <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="border border-border p-3 bg-background" />
              <input name="state" placeholder="State" value={formData.state} onChange={handleChange} className="border border-border p-3 bg-background" />
              <input name="pincode" placeholder="PIN Code" value={formData.pincode} onChange={handleChange} className="col-span-2 border border-border p-3 bg-background" />
            </div>
            
            <h2 className="font-serif text-xl mt-8 mb-6">Payment Method</h2>
            <div className="border border-border p-4 bg-secondary/30 text-center">
              <p className="text-muted-foreground">Payment integration coming soon</p>
              <p className="text-sm text-muted-foreground mt-2">This is a visual mockup</p>
            </div>
          </div>

          <div className="bg-secondary/30 p-6 h-fit">
            <h2 className="font-serif text-xl mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(totalPrice)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>Free</span></div>
              <div className="flex justify-between font-medium text-lg pt-2 border-t border-border"><span>Total</span><span>{formatPrice(totalPrice)}</span></div>
            </div>
            <button className="btn-luxury w-full mt-6">Place Order</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;

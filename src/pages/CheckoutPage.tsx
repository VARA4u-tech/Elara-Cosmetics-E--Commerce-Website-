import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Name, City, State Validation: Allow only alphabets and spaces
    if (
      name === "firstName" ||
      name === "lastName" ||
      name === "city" ||
      name === "state"
    ) {
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
      return;
    }

    // Phone Validation: Allow only numbers, max 10 digits
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, ""); // Remove non-digits
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const generateWhatsAppMessage = () => {
    const customerName = `${formData.firstName} ${formData.lastName}`.trim();
    const orderItems = items
      .map(
        (item) =>
          `• ${item.product.name} (${item.product.size}) x${item.quantity} - ${formatPrice(item.product.price * item.quantity)}`,
      )
      .join("\n");

    const message = `🛒 *New Order from ELARA COSMETICS*

*Customer Details:*
Name: ${customerName || "Not provided"}
Email: ${formData.email || "Not provided"}
Phone: ${formData.phone || "Not provided"}
Pincode: ${formData.pincode || "Not provided"}

*Shipping Address:*
${formData.address || "Not provided"}
${formData.city}, ${formData.state} - ${formData.pincode}

*Order Items:*
${orderItems}

*Order Total:* ${formatPrice(totalPrice)}

Please confirm this order. Thank you! 🙏`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppCheckout = () => {
    // Validate required fields
    if (
      !formData.firstName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.pincode
    ) {
      toast.error(
        "Please fill in required fields: Name, Phone, Address, City, and PIN Code",
      );
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const phoneNumber = "+918019156646"; // Brand WhatsApp number
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");

    // Clear cart and show success
    clearCart();
    toast.success("Redirecting to WhatsApp for order confirmation!");

    // Navigate to home after a short delay
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-serif text-3xl md:text-4xl mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-serif text-xl mb-6">Shipping Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                aria-label="First Name"
                name="firstName"
                placeholder="First Name *"
                value={formData.firstName}
                onChange={handleChange}
                className="col-span-1 border border-border p-3 bg-background"
                required
              />
              <input
                aria-label="Last Name"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="col-span-1 border border-border p-3 bg-background"
              />
              <input
                aria-label="Email Address"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-2 border border-border p-3 bg-background"
              />
              <div className="col-span-2 flex">
                <span className="inline-flex items-center px-3 border border-r-0 border-border bg-secondary/30 text-sm">
                  +91
                </span>
                <input
                  aria-label="Phone Number"
                  name="phone"
                  placeholder="Phone *"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  className="w-full border border-border p-3 bg-background focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <input
                aria-label="Address"
                name="address"
                placeholder="Address *"
                value={formData.address}
                onChange={handleChange}
                className="col-span-2 border border-border p-3 bg-background"
                required
              />
              <input
                aria-label="City"
                name="city"
                placeholder="City *"
                value={formData.city}
                onChange={handleChange}
                className="border border-border p-3 bg-background"
                required
              />
              <input
                aria-label="State"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="border border-border p-3 bg-background"
              />
              <input
                aria-label="PIN Code"
                name="pincode"
                placeholder="PIN Code *"
                value={formData.pincode}
                onChange={handleChange}
                className="col-span-2 border border-border p-3 bg-background"
                required
              />
            </div>

            <div className="mt-8 p-6 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-6 h-6 text-green-600" />
                <h3 className="font-serif text-lg text-green-800 dark:text-green-200">
                  Order via WhatsApp
                </h3>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                Your order details will be sent to our WhatsApp for quick
                confirmation and personalized service. We'll respond promptly to
                confirm your order!
              </p>
            </div>
          </div>

          <div className="bg-secondary/30 p-6 h-fit">
            <h2 className="font-serif text-xl mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-medium text-lg pt-2 border-t border-border">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-4 px-6 flex items-center justify-center gap-3 transition-colors font-medium"
            >
              <MessageCircle className="w-5 h-5" />
              Complete Order via WhatsApp
            </button>
            <p className="text-xs text-center text-muted-foreground mt-3">
              You'll be redirected to WhatsApp to confirm your order
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;

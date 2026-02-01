import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Truck, Clock, Globe, ShieldCheck } from "lucide-react";

const ShippingInfoPage = () => {
  return (
    <Layout>
      <div className="bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Shipping Info" }]} />

          <div className="max-w-4xl mx-auto mt-12">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-wide-luxury text-primary mb-3">
                Customer Service
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
                Shipping & Delivery
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We take utmost care in bringing our Ayurvedic rituals to your
                doorstep with precision and care.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="p-8 bg-secondary/20 rounded-2xl border border-primary/10">
                <Truck className="w-10 h-10 text-primary mb-6" />
                <h3 className="font-serif text-xl mb-4">
                  Domestic Shipping (India)
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Free shipping on orders above ₹1,999.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Standard Shipping: ₹99 for orders below ₹1,999.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Next day delivery available in select metro cities for an
                      additional charge.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-secondary/20 rounded-2xl border border-primary/10">
                <Clock className="w-10 h-10 text-primary mb-6" />
                <h3 className="font-serif text-xl mb-4">Processing Time</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Orders are typically processed within 1-2 business days.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Orders placed on weekends or holidays will be processed on
                      the next business day.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      During sale festive seasons, processing time may extend to
                      3 business days.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="prose prose-stone max-w-none text-muted-foreground">
              <h2 className="font-serif text-2xl text-foreground mb-4">
                Delivery Timelines
              </h2>
              <p className="mb-6">
                Our trusted courier partners (BlueDart, Delhivery, and
                XpressBees) strive to deliver your orders within the following
                estimated timelines:
              </p>
              <ul className="list-disc pl-5 mb-8 space-y-2">
                <li>
                  <strong>Metro Cities:</strong> 2-4 business days
                </li>
                <li>
                  <strong>Tier 1 & 2 Cities:</strong> 3-5 business days
                </li>
                <li>
                  <strong>Rest of India / Rural Areas:</strong> 5-8 business
                  days
                </li>
              </ul>

              <h2 className="font-serif text-2xl text-foreground mb-4">
                Shipping Restrictions
              </h2>
              <p className="mb-6">
                Certain items, such as those containing liquids or pressurized
                containers, may have shipping restrictions to certain pin codes.
                If your order contains a restricted item, you will be notified
                at checkout.
              </p>

              <h2 className="font-serif text-2xl text-foreground mb-4">
                Tracking Your Order
              </h2>
              <p className="mb-6">
                Once your order has been dispatched, you will receive an email
                and SMS with a tracking number and a link to track your order.
                You can also monitor your shipment status through the 'My
                Account' section on our website.
              </p>

              <div className="bg-primary/5 p-8 rounded-xl border-l-4 border-primary mt-12">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <h3 className="font-serif text-xl text-foreground m-0">
                    Secure Packaging
                  </h3>
                </div>
                <p className="text-sm m-0 italic">
                  We use eco-friendly and secure packaging to ensure that your
                  luxurious Elara formulations reach you in pristine condition.
                  If you receive a tampered or damaged package, please do not
                  accept it and contact us immediately.
                </p>
              </div>
            </div>

            <div className="mt-20 text-center">
              <p className="text-sm text-muted-foreground mb-6">
                Need help with your shipment?
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-all"
              >
                Go to Contact Us page <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingInfoPage;

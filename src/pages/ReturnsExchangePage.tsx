import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { RefreshCw, CheckCircle2, AlertCircle, FileText } from "lucide-react";

const ReturnsExchangePage = () => {
  return (
    <Layout>
      <div className="bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Returns & Exchange" }]} />

          <div className="max-w-4xl mx-auto mt-12">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-wide-luxury text-primary mb-3">
                Policy
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
                Returns & Exchanges
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Your satisfaction is our priority. We offer a seamless return
                and exchange process for our royal customers.
              </p>
            </div>

            <div className="space-y-12">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl text-foreground mb-0">
                    General Policy
                  </h2>
                </div>
                <div className="prose prose-stone max-w-none text-muted-foreground">
                  <p>
                    Due to the hygienic nature of our products, we typically do
                    not accept returns on opened or used items. However, we are
                    happy to assist if you have received a damaged, defective,
                    or incorrect product.
                  </p>
                  <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li>Report any issues within 48 hours of delivery.</li>
                    <li>
                      Items must be in their original packaging with all seals
                      intact (if applicable).
                    </li>
                    <li>
                      Exchanges are subject to availability of the product.
                    </li>
                  </ul>
                </div>
              </section>

              <section className="bg-secondary/20 p-8 rounded-2xl border border-primary/10">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  <h2 className="font-serif text-2xl text-foreground mb-0">
                    Eligible Reasons for Return
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-foreground">
                      Damaged in Transit
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      If the product packaging is visibly damaged upon delivery,
                      please document with photos and contact us immediately.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium text-foreground">
                      Defective Formulation
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      In the rare event of a manufacturing defect or unexpected
                      consistency issue.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium text-foreground">
                      Incorrect Item
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      If you received a product different from what you ordered.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium text-foreground">
                      Missing Parts
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      If your order is missing components like droppers or lids.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl text-foreground mb-0">
                    The Return Process
                  </h2>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">
                        Submit Request
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Log in to your account, select the order, and click
                        "Return/Exchange". Alternatively, email us at
                        elaracosmetics2023@gmail.com with your Order ID.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">
                        Upload Documentation
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Please provide clear photos or a short video of the
                        damaged/defective product and the outer packaging.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">
                        Pickup Information
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Once approved, our courier partner will pick up the item
                        within 48-72 hours. Ensure the product is packed
                        securely.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">
                        Resolution
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        After we receive and inspect the item, we will process
                        your refund or ship the replacement within 5-7 business
                        days.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-accent/10 p-8 rounded-2xl border-l-4 border-accent">
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-accent shrink-0" />
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg text-foreground mb-0">
                      Non-Returnable Items
                    </h3>
                    <p className="text-sm text-muted-foreground italic">
                      Please note that clearance sale items, limited edition
                      sets, and gift certificates are not eligible for returns
                      or exchanges unless received in damaged condition.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-20 text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Have more questions about our policy?
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/faqs"
                  className="text-primary hover:underline transition-all"
                >
                  View all FAQs
                </a>
                <span className="text-muted-foreground">|</span>
                <a
                  href="/contact"
                  className="text-primary hover:underline transition-all"
                >
                  Contact Concierge
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReturnsExchangePage;

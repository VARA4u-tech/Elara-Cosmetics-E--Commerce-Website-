import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const faqData = [
  {
    category: "Ordering & Payment",
    items: [
      {
        question: "How do I place an order?",
        answer:
          "Selecting items from our collection, adding them to your cart, and following the checkout process is all it takes to place an order. You can create an account for faster checkout or proceed as a guest.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit and debit cards (Visa, MasterCard, American Express), UPI, and Net Banking. We also offer Cash on Delivery (COD) for eligible pin codes within India.",
      },
      {
        question: "Can I cancel or modify my order?",
        answer:
          "Orders can be modified or cancelled within 2 hours of placement. To do so, please contact our customer care team at +91 8019156646 or email us at elaracosmetics2023@gmail.com.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    items: [
      {
        question: "How long will it take to receive my order?",
        answer:
          "Typically, orders are processed within 24-48 hours. Delivery normally takes 3-7 business days depending on your location. Premium shipping options are available at checkout.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Currently, we only ship within India. We are working on expanding our reach to international royal circles soon.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order is shipped, you will receive a tracking link via email and SMS. You can also track your order directly through your account dashboard on our website.",
      },
    ],
  },
  {
    category: "Products & Ingredients",
    items: [
      {
        question: "Are your products natural and safe?",
        answer:
          "Yes, all Elara Cosmetics products are rooted in pure Ayurveda. We use high-quality botanical extracts and are free from harmful parabens, sulphates, and synthetic fragrances.",
      },
      {
        question: "How should I store my products?",
        answer:
          "To maintain potency, store products in a cool, dry place away from direct sunlight. Ensure lids are tightly closed after each use.",
      },
      {
        question: "Are Elara Cosmetics products tested on animals?",
        answer:
          "Absolutely not. We are a 100% cruelty-free brand. We test our luxurious formulations only on ourselves and willing volunteers.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for unused and unopened products. If you are not satisfied, please contact us for a return authorization.",
      },
      {
        question: "How do I process a refund?",
        answer:
          "Once your return is received and inspected, we will notify you of the approval or rejection of your refund. Approved refunds are processed within 5-7 business days.",
      },
    ],
  },
];

const FAQsPage = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <Layout>
      <div className="bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "FAQs" }]} />

          <div className="max-w-3xl mx-auto mt-12">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-wide-luxury text-primary mb-3">
                Help Center
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-muted-foreground">
                Everything you need to know about Elara Cosmetics rituals and
                services.
              </p>
            </div>

            <div className="space-y-12">
              {faqData.map((section) => (
                <div key={section.category}>
                  <h2 className="font-serif text-2xl mb-6 pb-2 border-b border-primary/20">
                    {section.category}
                  </h2>
                  <div className="space-y-4">
                    {section.items.map((item, idx) => {
                      const itemId = `${section.category}-${idx}`;
                      const isOpen = openItems.includes(itemId);

                      return (
                        <div
                          key={itemId}
                          className="border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/30"
                        >
                          <button
                            onClick={() => toggleItem(itemId)}
                            className="w-full flex items-center justify-between p-5 text-left bg-background hover:bg-secondary/20 transition-colors"
                          >
                            <span className="font-medium text-foreground">
                              {item.question}
                            </span>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                            )}
                          </button>
                          <div
                            className={cn(
                              "overflow-hidden transition-all duration-300 ease-in-out bg-secondary/10",
                              isOpen
                                ? "max-h-96 opacity-100"
                                : "max-h-0 opacity-0",
                            )}
                          >
                            <div className="p-5 text-muted-foreground leading-relaxed border-t border-border/50">
                              {item.answer}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 p-8 bg-accent text-accent-foreground text-center rounded-2xl">
              <h3 className="font-serif text-2xl mb-4">
                Still have questions?
              </h3>
              <p className="mb-8 opacity-90">
                Our royal concierge is here to assist you with any inquiries.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:elaracosmetics2023@gmail.com"
                  className="px-6 py-3 border border-accent-foreground rounded-full hover:bg-accent-foreground hover:text-accent transition-colors"
                >
                  Email Us
                </a>
                <a
                  href="tel:+918019156646"
                  className="px-6 py-3 bg-accent-foreground text-accent rounded-full hover:bg-accent-foreground/90 transition-colors"
                >
                  Call +91 8019156646
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQsPage;

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 1800 102 6666", "Mon-Sat: 9AM - 9PM IST"],
    action: "tel:+911800102666"
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["customercare@forestessentials.com", "Response within 24 hours"],
    action: "mailto:customercare@forestessentials.com"
  },
  {
    icon: MapPin,
    title: "Head Office",
    details: ["A-21, Sector 68, Noida", "Uttar Pradesh, India 201301"],
    action: "#"
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Monday - Saturday", "9:00 AM - 9:00 PM IST"],
    action: "#"
  }
];

const faqs = [
  {
    question: "How can I track my order?",
    answer: "You can track your order by logging into your account and visiting the 'My Orders' section. You'll also receive tracking updates via email and SMS."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy on unopened products. For any quality concerns, please contact our customer care within 7 days of delivery."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to over 30 countries worldwide. International orders typically arrive within 7-14 business days."
  },
  {
    question: "Are your products cruelty-free?",
    answer: "Absolutely. All Forest Essentials products are 100% cruelty-free and never tested on animals. We are proud to be PETA certified."
  }
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Contact Us" }]} />
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mt-4 mb-4">Get in Touch</h1>
          <p className="text-muted-foreground max-w-xl">
            We're here to help with any questions about our products, orders, or Ayurvedic wisdom.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => (
              <a
                key={info.title}
                href={info.action}
                className="group p-6 border border-border hover:border-primary transition-colors text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 border border-primary rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <info.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg mb-2">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-sm text-muted-foreground">{detail}</p>
                ))}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQs */}
      <section className="py-12 md:py-16 bg-cream-dark">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-primary"
                    >
                      <option value="">Select a subject</option>
                      <option value="order">Order Inquiry</option>
                      <option value="product">Product Question</option>
                      <option value="returns">Returns & Refunds</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-primary resize-none"
                  />
                </div>
                <button type="submit" className="btn-luxury flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-border bg-background">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left"
                    >
                      <span className="font-medium">{faq.question}</span>
                      <span className="text-primary text-xl">
                        {expandedFaq === index ? "−" : "+"}
                      </span>
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-4 text-sm text-muted-foreground">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    shop: [
      { name: "Face Care", href: "/category/face" },
      { name: "Body Care", href: "/category/body" },
      { name: "Hair Care", href: "/category/hair" },
      { name: "Wellness", href: "/category/wellness" },
      { name: "Gifting", href: "/category/gifting" },
    ],
    help: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQs", href: "/faqs" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Returns & Exchange", href: "/returns" },
      { name: "Track Order", href: "/track-order" },
    ],
    about: [
      { name: "Our Story", href: "/about" },
      { name: "Ayurveda", href: "/ayurveda" },
      { name: "Ingredients", href: "/ingredients" },
      { name: "Sustainability", href: "/sustainability" },
      { name: "Careers", href: "/careers" },
    ],
    policies: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-accent text-accent-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-accent-foreground/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-2xl md:text-3xl mb-3">
              Join Our Royal Circle
            </h3>
            <p className="text-sm text-accent-foreground/70 mb-6">
              Subscribe for exclusive offers, Ayurvedic wisdom, and first access to new collections.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <button className="btn-luxury whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-6 lg:mb-0">
            <Link to="/" className="inline-block mb-4">
              <h2 className="font-serif text-xl font-medium">
                <span className="text-primary">Forest</span> Essentials
              </h2>
            </Link>
            <p className="text-sm text-accent-foreground/70 mb-6 max-w-xs">
              Luxurious Ayurveda. Experience the ancient wisdom of Indian beauty rituals crafted for modern royalty.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 border border-accent-foreground/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-serif text-lg mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-accent-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-serif text-lg mb-4">Help</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-accent-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-serif text-lg mb-4">About Us</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-accent-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies Links */}
          <div>
            <h4 className="font-serif text-lg mb-4">Policies</h4>
            <ul className="space-y-2">
              {footerLinks.policies.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-accent-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-accent-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-accent-foreground/60">
            <p>© 2024 Forest Essentials. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=40&fit=crop"
                alt="Payment methods"
                className="h-6 opacity-60"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

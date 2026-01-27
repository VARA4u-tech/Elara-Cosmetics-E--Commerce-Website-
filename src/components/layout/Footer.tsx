import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";
import logoImage from "@/assets/logo-transparent.png";

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
      { name: "FAQs", href: "/contact" },
      { name: "Shipping Info", href: "/contact" },
      { name: "Returns & Exchange", href: "/contact" },
      { name: "Track Order", href: "/account" },
    ],
    about: [
      { name: "Our Story", href: "/about" },
      { name: "Store Locator", href: "/stores" },
      { name: "Ingredients", href: "/about" },
      { name: "Sustainability", href: "/about" },
      { name: "Careers", href: "/about" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/elaracosmetic?igsh=Y3ptcTN5OTNmdDUz", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/20">
        <div className="container mx-auto px-4 py-10 md:py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl mb-3 text-background">
              Join Our Royal Circle
            </h3>
            <p className="text-xs sm:text-sm text-background/80 mb-6">
              Subscribe for exclusive offers, Ayurvedic wisdom, and first access to new collections.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-background/60" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-background/10 border border-background/30 text-background placeholder:text-background/60 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <button className="bg-primary text-primary-foreground px-8 py-3 uppercase tracking-[0.2em] text-sm font-medium transition-all duration-300 hover:bg-primary/90 whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Brand Column - Full width on mobile */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
            <Link to="/" className="inline-block mb-4">
              <img 
                src={logoImage} 
                alt="Elara Cosmetics" 
                className="h-20 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-background/80 mb-6 max-w-xs">
              Luxurious Cosmetics. Experience the ancient wisdom of Indian beauty rituals crafted for modern royalty.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <a href="tel:+918019156646" className="flex items-center gap-2 text-sm text-background/80 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span>+91 8019156646</span>
              </a>
              <a href="mailto:elaracosmetics2023@gmail.com" className="flex items-center gap-2 text-sm text-background/80 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span>elaracosmetics2023@gmail.com</span>
              </a>
              <Link to="/stores" className="flex items-center gap-2 text-sm text-background/80 hover:text-primary transition-colors">
                <MapPin className="w-4 h-4" />
                <span>Find a Store</span>
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 sm:w-10 sm:h-10 border border-background/30 text-background/80 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-serif text-base sm:text-lg mb-3 sm:mb-4 text-background">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-xs sm:text-sm text-background/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-serif text-base sm:text-lg mb-3 sm:mb-4 text-background">Help</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-xs sm:text-sm text-background/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-serif text-base sm:text-lg mb-3 sm:mb-4 text-background">About Us</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-xs sm:text-sm text-background/80 hover:text-primary transition-colors"
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
      <div className="border-t border-background/20">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-background/70">
            <p>© 2024 Elara Cosmetics. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs">
              <Link to="/contact" className="text-background/70 hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/contact" className="text-background/70 hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
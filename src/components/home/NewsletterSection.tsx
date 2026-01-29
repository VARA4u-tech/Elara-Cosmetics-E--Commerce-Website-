import { useState } from "react";
import { Send, Check } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section className="py-2 sm:py-3 md:py-4 lg:py-4 bg-primary/10 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-4 sm:mb-6 border border-primary rounded-full flex items-center justify-center">
            <Send className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>

          {/* Content */}
          <h2 className="font-serif text-lg sm:text-lg md:text-xl text-foreground mb-2 sm:mb-2">
            Join Our Community
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto">
            Subscribe to receive exclusive offers, early access to new products, and Ayurvedic beauty wisdom delivered to your inbox
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border border-border bg-background text-sm focus:outline-none focus:border-primary transition-colors"
              required
            />
            <button
              type="submit"
              disabled={isSubmitted}
              className={`btn-luxury flex items-center justify-center gap-2 min-w-[140px] sm:min-w-[160px] ${
                isSubmitted ? "bg-accent" : ""
              }`}
            >
              {isSubmitted ? (
                <>
                  <Check className="w-4 h-4" />
                  Subscribed!
                </>
              ) : (
                <>
                  Subscribe
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Privacy Note */}
          <p className="text-xs text-muted-foreground mt-4 sm:mt-6">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;

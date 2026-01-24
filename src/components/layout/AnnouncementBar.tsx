import { Gift, Truck, RefreshCw } from "lucide-react";

const announcements = [
  { icon: Truck, text: "Free Shipping on Orders Above ₹999" },
  { icon: Gift, text: "Complimentary Gift Wrapping Available" },
  { icon: RefreshCw, text: "Easy 30-Day Returns" },
];

const AnnouncementBar = () => {
  return (
    <div className="bg-accent text-accent-foreground py-2 overflow-hidden">
      <div className="animate-scroll-left flex whitespace-nowrap">
        {[...announcements, ...announcements, ...announcements].map((item, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-2 mx-8 text-xs uppercase tracking-luxury"
          >
            <item.icon className="w-3.5 h-3.5" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;

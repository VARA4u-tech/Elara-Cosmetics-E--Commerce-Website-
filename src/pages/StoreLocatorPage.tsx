import { useState } from "react";
import { MapPin, Phone, Clock, Search, Navigation } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";

const stores = [
  {
    id: 1,
    name: "Elara Cosmetics - Vijayawada",
    address: "MG Road, Governorpet, Vijayawada - 520002, Andhra Pradesh",
    phone: "+91 8019156646",
    hours: "10:00 AM - 9:00 PM",
    city: "Vijayawada",
    type: "Flagship Store",
  },
];

const cities = ["Vijayawada"];

const StoreLocatorPage = () => {
  const [selectedCity, setSelectedCity] = useState("Vijayawada");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStore, setSelectedStore] = useState<number | null>(null);

  const filteredStores = stores.filter((store) => {
    const matchesCity =
      selectedCity === "All Cities" || store.city === selectedCity;
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Store Locator" }]} />
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mt-4 mb-4">
            Find a Store
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Visit our luxurious boutiques to experience the world of Elara
            Cosmetics. Our beauty experts are ready to guide you on your
            Ayurvedic journey.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Filters & List */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-primary"
              />
            </div>

            {/* City Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={cn(
                    "px-4 py-2 text-sm uppercase tracking-luxury border transition-colors",
                    selectedCity === city
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:border-primary",
                  )}
                >
                  {city}
                </button>
              ))}
            </div>

            {/* Store List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  onClick={() => setSelectedStore(store.id)}
                  className={cn(
                    "p-4 border cursor-pointer transition-all",
                    selectedStore === store.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50",
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif text-lg">{store.name}</h3>
                    <span className="text-xs uppercase tracking-luxury text-primary bg-primary/10 px-2 py-1">
                      {store.type}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{store.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span>{store.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span>{store.hours}</span>
                    </div>
                  </div>
                  <button className="mt-4 flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </button>
                </div>
              ))}

              {filteredStores.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No stores found</p>
                </div>
              )}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <div className="bg-secondary/30 h-[400px] lg:h-full min-h-[500px] flex items-center justify-center border border-border">
              <div className="text-center px-4">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-serif text-xl mb-2">Interactive Map</h3>
                <p className="text-muted-foreground text-sm max-w-sm">
                  Map integration placeholder. In production, this would display
                  an interactive map with store locations marked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StoreLocatorPage;

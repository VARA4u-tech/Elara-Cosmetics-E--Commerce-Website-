import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Briefcase, MapPin, Search } from "lucide-react";

const jobOpenings = [
  {
    id: 1,
    title: "Beauty Consultant",
    department: "Retail",
    location: "Vijayawada, AP",
    type: "Full-Time",
    description:
      "Provide personalized Ayurvedic beauty consultations and exceptional service to our boutique guests.",
  },
  {
    id: 2,
    title: "Senior Product Formulator",
    department: "R&D",
    location: "Hyderabad, TS",
    type: "Full-Time",
    description:
      "Lead the development of next-generation luxury Ayurvedic skincare and haircare formulations.",
  },
  {
    id: 3,
    title: "Brand Storyteller",
    department: "Marketing",
    location: "Remote / Mumbai",
    type: "Contract",
    description:
      "Create compelling narratives that honor our heritage while engaging modern beauty enthusiasts.",
  },
  {
    id: 4,
    title: "Supply Chain Coordinator",
    department: "Operations",
    location: "Vijayawada, AP",
    type: "Full-Time",
    description:
      "Manage relationships with our organic farmers and ensure ethical sourcing standards are met.",
  },
];

const CareersPage = () => {
  return (
    <Layout>
      <div className="bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Careers" }]} />

          <div className="mt-12">
            <div className="max-w-4xl mx-auto">
              {/* Hero Section */}
              <div className="text-center mb-20">
                <p className="text-sm uppercase tracking-wide-luxury text-primary mb-3">
                  Join Our Royal Court
                </p>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                  Build a Career in{" "}
                  <span className="italic text-primary">Conscious Luxury</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                  We are looking for passionate individuals who believe in the
                  power of Ayurveda and the art of exceptional service.
                </p>
              </div>

              {/* Culture Section */}
              <div className="grid md:grid-cols-3 gap-8 mb-24">
                <div className="p-6 bg-secondary/20 rounded-2xl text-center space-y-4">
                  <h3 className="font-serif text-xl text-primary">
                    Growth Mindset
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We provide continuous learning opportunities in the field of
                    Ayurveda and luxury management.
                  </p>
                </div>
                <div className="p-6 bg-secondary/20 rounded-2xl text-center space-y-4">
                  <h3 className="font-serif text-xl text-primary">
                    Heritage Hearted
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Work at the intersection of ancient Indian tradition and
                    global beauty innovation.
                  </p>
                </div>
                <div className="p-6 bg-secondary/20 rounded-2xl text-center space-y-4">
                  <h3 className="font-serif text-xl text-primary">
                    Inclusive Circle
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Join a diverse team committed to ethical practices and
                    mutual respect.
                  </p>
                </div>
              </div>

              {/* Search & Filter (Visual Only) */}
              <div className="relative max-w-xl mx-auto mb-12">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for roles (e.g. Marketing, Retail)..."
                  className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-full text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Job Listings */}
              <div className="space-y-6 mb-24">
                <h2 className="font-serif text-2xl text-foreground mb-8">
                  Current Opportunities
                </h2>
                {jobOpenings.map((job) => (
                  <div
                    key={job.id}
                    className="group p-6 md:p-8 bg-background border border-border rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-serif text-xl md:text-2xl text-foreground">
                            {job.title}
                          </h3>
                          <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] uppercase tracking-widest font-bold rounded-full">
                            {job.type}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="w-4 h-4" />
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </div>
                      <button className="px-8 py-3 bg-foreground text-background text-sm font-medium uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all">
                        Apply Now
                      </button>
                    </div>
                    <p className="mt-6 text-muted-foreground leading-relaxed max-w-3xl">
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* General Inquiries */}
              <div className="text-center p-12 bg-accent/10 rounded-3xl border border-accent/20">
                <h3 className="font-serif text-2xl mb-4 text-foreground">
                  Can't find the right role?
                </h3>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                  We are always on the lookout for exceptional talent. Send your
                  portfolio and resume for our future considerations.
                </p>
                <a
                  href="mailto:careers@elaracosmetics.com"
                  className="inline-block border-b-2 border-primary text-primary font-medium hover:text-black hover:border-black transition-all"
                >
                  careers@elaracosmetics.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CareersPage;

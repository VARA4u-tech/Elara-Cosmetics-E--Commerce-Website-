import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const TermsOfServicePage = () => {
  return (
    <Layout>
      <div className="bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Terms of Service" }]} />

          <div className="max-w-4xl mx-auto mt-12 prose prose-stone">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-8">
              Terms of Service
            </h1>

            <p className="text-muted-foreground mb-6">
              Last Updated: January 2024
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-serif text-foreground mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground">
                By accessing or using elaracosmetics.com, you agree to be bound
                by these Terms of Service and all applicable laws and
                regulations.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif text-foreground mb-4">
                2. Use of Site
              </h2>
              <p className="text-muted-foreground">
                You may use our site for lawful purposes only. You are
                prohibited from violating or attempting to violate the security
                of the site.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif text-foreground mb-4">
                3. Intellectual Property
              </h2>
              <p className="text-muted-foreground">
                All content on this site, including text, graphics, logos, and
                images, is the property of Elara Cosmetics and is protected by
                copyright laws.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif text-foreground mb-4">
                4. Product Descriptions
              </h2>
              <p className="text-muted-foreground">
                We attempt to be as accurate as possible with product
                descriptions. However, we do not warrant that product
                descriptions or other content are accurate, complete, reliable,
                current, or error-free.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif text-foreground mb-4">
                5. Limitation of Liability
              </h2>
              <p className="text-muted-foreground">
                Elara Cosmetics shall not be liable for any direct, indirect,
                incidental, or consequential damages resulting from the use or
                inability to use the site or products.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfServicePage;

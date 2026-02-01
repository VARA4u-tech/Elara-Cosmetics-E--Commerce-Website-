import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const PrivacyPolicyPage = () => {
  return (
    <Layout>
      <div className="bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

          <div className="max-w-4xl mx-auto mt-12 prose prose-stone">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-8">
              Privacy Policy
            </h1>

            <p className="text-muted-foreground mb-6">
              Last Updated: January 2024
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-serif text-foreground mb-4">
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground">
                We collect information you provide directly to us, such as when
                you create an account, make a purchase, or sign up for our
                newsletter. This may include your name, email address, shipping
                address, and phone number.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif text-foreground mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-muted-foreground">
                We use the information we collect to process orders, communicate
                with you about your account and purchases, and send you
                marketing communications (if you've opted in). We also use data
                to improve our products and services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif text-foreground mb-4">
                3. Data Security
              </h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif text-foreground mb-4">
                4. Sharing of Information
              </h2>
              <p className="text-muted-foreground">
                We do not sell your personal information to third parties. We
                may share information with trusted service providers who help us
                operate our website and fulfill orders.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif text-foreground mb-4">
                5. Contact Us
              </h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please
                contact us at elaracosmetics2023@gmail.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;

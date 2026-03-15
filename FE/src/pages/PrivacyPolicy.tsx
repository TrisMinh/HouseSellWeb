import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Privacy Policy
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We are committed to protecting your privacy and ensuring your data is handled with care and transparency.
            </p>
          </div>

          <div className="prose prose-lg prose-slate max-w-none">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 mb-12">
              <p className="text-slate-600 mb-0">
                <strong>Last Updated:</strong> October 24, 2023
              </p>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">
                1. Information We Collect
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, update your profile, request customer support, or interact with our real estate listings. This may include:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
                <li>Name, email address, and phone number.</li>
                <li>Property preferences and search history.</li>
                <li>Communications with agents or other users.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">
                2. How We Use Your Information
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, including:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
                <li>Facilitating real estate transactions and connections.</li>
                <li>Sending you technical notices, updates, and support messages.</li>
                <li>Personalizing your experience and providing tailored recommendations.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">
                3. Data Security
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Blue Sky implements industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">
                4. Contact Us
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@bluesky.com" className="text-accent font-medium hover:underline">privacy@bluesky.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

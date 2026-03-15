import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Terms of Service
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Please read these terms carefully before using our services. By accessing Blue Sky, you agree to be bound by these terms.
            </p>
          </div>

          <div className="prose prose-lg prose-slate max-w-none">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 mb-12">
              <p className="text-slate-600 mb-0">
                <strong>Effective Date:</strong> October 24, 2023
              </p>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">
                1. Acceptance of Terms
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                By accessing or using the Blue Sky website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">
                2. Use License
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Permission is granted to temporarily download one copy of the materials (information or software) on Blue Sky's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">
                3. Listing Accuracy
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Real estate listings on Blue Sky are provided for informational purposes. While we strive for accuracy, we do not guarantee the completeness or correctness of property details, prices, or availability. Always verify information directly with the listing agent.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">
                4. User Conduct
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                You agree not to use the service for any unlawful purpose or to solicit others to perform or participate in any unlawful acts. You must not harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">
                5. Governing Law
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;

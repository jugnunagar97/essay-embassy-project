import { FileText } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="animate-fade-in bg-white dark:bg-secondary-900">
      <section className="bg-secondary-50 dark:bg-secondary-800 py-20">
        <div className="container mx-auto px-6 text-center">
          <FileText className="h-16 w-16 mx-auto text-primary-500 mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary-900 dark:text-white">
            Terms & Conditions
          </h1>
          <p className="text-lg text-muted mt-4">Last Updated: July 4, 2025</p>
        </div>
      </section>

      <section className="section container">
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-secondary-600 dark:text-secondary-300">
          
          <p className="border-l-4 border-red-500 pl-4 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-md">
            <strong>Disclaimer:</strong> This is a template and not legal advice. Please replace this content with your own official Terms & Conditions drafted by a legal professional.
          </p>

          <h2>1. Agreement to Terms</h2>
          <p>
            By using our website, essayembassy.com (the "Site"), and the services offered by Essay Embassy ("we," "us," "our"), you agree to be bound by these Terms and Conditions. If you do not agree with all of these terms, you are prohibited from using the site and services.
          </p>

          <h2>2. Our Services</h2>
          <p>
            We provide custom academic writing services, including essays, research papers, and other academic documents, for reference and research purposes only. The work we provide is intended to be used as a model and a guide to help you produce your own original work. You agree not to submit our work as your own.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            You may be required to register for an account to use our services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
          </p>
          
          <h2>4. Payments and Refunds</h2>
          <p>
            All payments for our services must be made in advance. We accept payment through the methods specified on the Site. Our policies regarding refunds are detailed in our separate Refund Policy page.
          </p>

          <h2>5. Intellectual Property Rights</h2>
          <p>
            While you have the right to use the delivered work for personal, non-commercial reference purposes, the full copyright and intellectual property rights for the work remain with Essay Embassy and its writers. You agree not to distribute, publish, transmit, modify, display, or create derivative works from or exploit the contents of this Site or our services without our prior written consent.
          </p>

          <h2>6. Prohibited Activities</h2>
          <p>
            You may not access or use the Site for any purpose other than that for which we make the Site available. Prohibited activity includes, but is not limited to, submitting our work as your own to any academic institution, attempting to impersonate another user, or using any information obtained from the Site in order to harass, abuse, or harm another person.
          </p>

          <h2>7. Governing Law</h2>
          <p>
            These Terms and Conditions and your use of the Site are governed by and construed in accordance with the laws of the Commonwealth of Massachusetts, without regard to its conflict of law principles.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            To resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
            <br />
            Essay Embassy
            <br />
            1309 Beacon Street, Suite 300, Brookline, Massachusetts, 02446
            <br />
            support@essayembassy.com
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;
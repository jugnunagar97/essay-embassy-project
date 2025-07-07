import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="animate-fade-in bg-white dark:bg-secondary-900">
      <section className="bg-secondary-50 dark:bg-secondary-800 py-20">
        <div className="container mx-auto px-6 text-center">
          <Shield className="h-16 w-16 mx-auto text-primary-500 mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted mt-4">Last Updated: July 4, 2025</p>
        </div>
      </section>

      <section className="section container">
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-secondary-600 dark:text-secondary-300">
          
          <p className="border-l-4 border-red-500 pl-4 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-md">
            <strong>Disclaimer:</strong> This is a template and not legal advice. Please replace this content with your own official Privacy Policy drafted by a legal professional.
          </p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to Essay Embassy ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website essayembassy.com. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>

          <h2>2. Collection of Your Information</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
          </p>
          <ul>
            <li>
              <strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as placing an order.
            </li>
            <li>
              <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
            </li>
          </ul>

          <h2>3. Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
          </p>
          <ul>
            <li>Create and manage your account.</li>
            <li>Process your orders and payments.</li>
            <li>Email you regarding your account or order.</li>
            <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
            <li>Improve the efficiency and operation of the Site.</li>
          </ul>

          <h2>4. Disclosure of Your Information</h2>
          <p>
            We do not share, sell, rent or trade your information with third parties for their commercial purposes. We may share information we have collected about you in certain situations, such as with third-party service providers that perform services for us or on our behalf, including payment processing, data analysis, and customer service.
          </p>

          <h2>5. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;
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
          <p className="text-lg text-muted mt-4">Last Updated: July 19, 2025</p>
        </div>
      </section>

      <section className="section container">
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-secondary-600 dark:text-secondary-300">
          
          <h2>1. Our Commitment to Your Privacy</h2>
          <p>
            Welcome to Essay Embassy! We are dedicated to protecting the privacy and confidentiality of our clients. This Privacy Policy explains what information we collect when you use our website (essayembassy.com), how we use that information, and the robust security measures we have in place to safeguard it.
          </p>
          <p>
            By using our academic writing services and accessing our website, you consent to the data practices described in this policy.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            To provide you with our high-quality writing and editing services, we need to collect certain information.
          </p>
          <ul>
            <li>
              <strong>Personal Information:</strong> This includes your name, email address, and other contact details you provide when you create an account or place an order.
            </li>
            <li>
              <strong>Order Details:</strong> We collect information specific to your academic requests, such as the project requirements, subject matter, and any files or sources you upload.
            </li>
            <li>
              <strong>Payment Information:</strong> To process payments securely, we collect payment details like credit/debit card information. Please note: All transactions are processed through a secure, encrypted gateway. We do not store your full credit/debit card numbers on our servers.
            </li>
            <li>
              <strong>Website Usage Data:</strong> We may automatically collect technical information about how you interact with our site. This includes your IP address, browser type, the pages you visit, and the time you spend on our platform. This helps us improve website performance and user experience.
            </li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>
            The information we gather is used exclusively to enhance your experience and deliver the services you request.
          </p>
          <ul>
            <li>
              <strong>Service Delivery:</strong> To fulfill your orders, communicate with you about your projects, and process your payments.
            </li>
            <li>
              <strong>Customer Support:</strong> To respond to your inquiries and provide assistance through our support channels.
            </li>
            <li>
              <strong>Service Improvement:</strong> To analyze website usage data, helping us understand user needs and improve our platform's functionality, content, and layout.
            </li>
            <li>
              <strong>Marketing Communications (with your consent):</strong> We may occasionally send you promotional emails about new services or special offers. You can opt-out of these communications at any time by clicking the "unsubscribe" link in the email or by contacting us directly.
            </li>
          </ul>

          <h2>4. Data Security and Protection</h2>
          <p>
            We take the security of your personal information very seriously. We implement a variety of industry-standard security measures to maintain the safety of your data.
          </p>
          <ul>
            <li>We use SSL (Secure Socket Layer) technology to encrypt sensitive information during transmission.</li>
            <li>Your personal data is stored in secure databases with restricted access.</li>
            <li>We regularly review and update our security protocols to protect against unauthorized access, disclosure, or alteration of your information.</li>
          </ul>

          <h2>5. Information Sharing and Disclosure</h2>
          <p>
            Your trust is paramount. We do not sell, rent, or trade your personal information to third parties for marketing purposes.
          </p>
          <ul>
            <li>
              <strong>Service Providers:</strong> We may share your information with trusted third-party partners who assist us in operating our website, processing payments, or conducting our business (e.g., payment processors, plagiarism checkers). These partners are contractually obligated to keep your information confidential and secure.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may be required to disclose your information if compelled by law, such as in response to a court order or other valid legal process. In such cases, we will only disclose the information that is legally required.
            </li>
          </ul>

          <h2>6. Third-Party Advertising and Cookies</h2>
          <p>
            Our website may use "cookies" to enhance your experience. Cookies are small files placed on your device that help us analyze web traffic and remember your preferences.
          </p>
          <p>
            Some advertisements on our site may be delivered by third-party ad networks. These networks may use their own cookies and similar technologies to collect data about your online activities to provide you with personalized advertising. We do not have access to or control over the information collected by these third parties. You can typically manage your cookie preferences through your browser settings.
          </p>

          <h2>7. Your Rights and Choices</h2>
          <p>
            You have the right to access and control your personal information. If you would like to review, update, or request the deletion of your personal data, please contact us using the information below.
          </p>

          <h2>8. Policy Updates and Modifications</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any modifications will be effective immediately upon being posted on this page. We encourage you to review this policy periodically to stay informed.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or how we handle your data, please do not hesitate to contact us.
          </p>
          <p>
            <strong>Email:</strong> support@essayembassy.com
          </p>
          <p>
            <strong>Mailing Address:</strong> Essay Embassy, 1309 Beacon Street, Suite 300, Brookline, Massachusetts 02446
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
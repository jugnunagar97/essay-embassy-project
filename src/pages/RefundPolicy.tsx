import { RefreshCw } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <div className="animate-fade-in bg-white dark:bg-secondary-900">
      <section className="bg-secondary-50 dark:bg-secondary-800 py-20">
        <div className="container mx-auto px-6 text-center">
          <RefreshCw className="h-16 w-16 mx-auto text-primary-500 mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary-900 dark:text-white">
            Refund and Cancellation Policy
          </h1>
          <p className="text-lg text-muted mt-4">Last Updated: July 19, 2025</p>
        </div>
      </section>

      <section className="section container">
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-secondary-600 dark:text-secondary-300">
          
          <p>
            At Essay Embassy, we are committed to client satisfaction and have a transparent process for cancellations and refunds. This policy outlines the conditions under which a client may be eligible for a refund.
          </p>

          <h2>1. Order Cancellation</h2>
          <p>
            Your ability to cancel an order depends on its status in our system.
          </p>
          
          <h3>Before a Writer is Assigned:</h3>
          <p>
            If you choose to cancel your order before we have assigned it to a writer, you are eligible for a full refund to your original payment method. To cancel, please contact our Support Team immediately.
          </p>

          <h3>After a Writer is Assigned:</h3>
          <p>
            Once an order has been assigned to a writer, they begin working on it immediately. At this stage, the order cannot be canceled, and you are no longer eligible for a refund for cancellation, as we must compensate the writer for the work they have already performed.
          </p>

          <h2>2. Refund Eligibility</h2>
          <p>
            We issue refunds for service-related issues under the following specific circumstances. All refund claims are investigated by our Quality Assurance (QA) Team.
          </p>

          <h3>Late Delivery:</h3>
          <p>
            We take deadlines seriously. If we fail to deliver your order by the specified deadline due to a fault on our end, you may be eligible for a partial refund. The refund amount will be calculated by our team based on the length of the delay and the original deadline.
          </p>
          <p>
            A refund for lateness will not be issued if the delay was caused by:
          </p>
          <ul>
            <li>A delay in your payment.</li>
            <li>A delay in providing essential materials or sources for the order.</li>
            <li>A delay in responding to our questions or requests for clarification.</li>
            <li>Technical issues on your end (e.g., internet provider, browser, or system failure).</li>
          </ul>

          <h3>Quality Does Not Meet Requirements:</h3>
          <p>
            If you believe the final product does not meet your initial order requirements, you must contact our Support Team within 72 hours of receiving the paper. You will be asked to provide specific feedback and examples of where the paper fails to meet your instructions. Our QA Team will conduct a thorough review. If your claim is validated, you may be eligible for a partial or full refund, depending on the severity of the issue.
          </p>

          <h3>Plagiarism:</h3>
          <p>
            We guarantee our papers are original. If you find evidence of plagiarism in your paper, you must provide us with a formal Turnitin.com report as proof. No other plagiarism reports will be accepted. If the plagiarism claim is substantiated, you will be eligible for a full refund.
          </p>

          <h2>3. Situations Not Eligible for a Refund</h2>
          <p>
            Please note that refunds will NOT be issued in the following cases:
          </p>
          <ul>
            <li>You receive a bad grade. Our papers are intended for reference and research purposes only. They are not to be submitted as your own work. Therefore, we do not guarantee any specific grade, and a poor academic result is not a basis for a refund.</li>
            <li>Minor errors that can be corrected through our free revision process.</li>
            <li>Claims related to stylistic choices (e.g., word choice, sentence structure) unless they directly violate the order instructions.</li>
          </ul>

          <h2>4. The Refund Process</h2>
          <ul>
            <li><strong>Contact Support:</strong> To request a refund, please contact our Support Team via email at support@essayembassy.com. Clearly state your order number and the detailed reason for your request, providing any supporting evidence (e.g., plagiarism report, list of unmet requirements).</li>
            <li><strong>Investigation:</strong> Our Quality Assurance Team will investigate your claim within 3-5 business days.</li>
            <li><strong>Resolution:</strong> You will be notified of our decision via email.</li>
            <li><strong>Processing:</strong> If your refund is approved, the funds will be processed within 5-7 business days. The refund can only be sent to the original mode of payment (the card or account you used to pay).</li>
          </ul>

          <p className="border-l-4 border-blue-500 pl-4 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
            <strong>Please Note:</strong> Essay Embassy is not responsible for any fees charged by your bank or payment processor for the transaction.
          </p>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicy;
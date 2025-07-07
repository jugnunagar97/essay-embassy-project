import { RefreshCw } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <div className="animate-fade-in bg-white dark:bg-secondary-900">
      <section className="bg-secondary-50 dark:bg-secondary-800 py-20">
        <div className="container mx-auto px-6 text-center">
          <RefreshCw className="h-16 w-16 mx-auto text-primary-500 mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary-900 dark:text-white">
            Refund Policy
          </h1>
          <p className="text-lg text-muted mt-4">Last Updated: July 5, 2025</p>
        </div>
      </section>

      <section className="section container">
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-secondary-600 dark:text-secondary-300">
          
          <p className="border-l-4 border-red-500 pl-4 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-md">
            <strong>Disclaimer:</strong> This is a template and not legal advice. Please replace this content with your own official Refund Policy drafted by a legal professional.
          </p>

          <h2>1. General Policy</h2>
          <p>
            At Essay Embassy, we strive to provide the highest quality academic writing services. Customer satisfaction is our priority. This policy outlines the circumstances under which we may issue a refund. All refund requests are evaluated on a case-by-case basis.
          </p>

          <h2>2. Full Refunds</h2>
          <p>
            A full refund may be considered in the following situations:
          </p>
          <ul>
            <li>
              <strong>Order Cancellation:</strong> If you cancel your order before a writer has been assigned to it.
            </li>
            <li>
              <strong>Major Service Failure:</strong> In the rare event of a major failure on our part, such as a complete failure to deliver the work or a delivery that is entirely off-topic from the provided instructions.
            </li>
             <li>
              <strong>Accidental Duplicate Order:</strong> If you accidentally place and pay for two identical orders, you are eligible for a full refund on the duplicate order.
            </li>
          </ul>

          <h2>3. Partial Refunds</h2>
          <p>
            A partial refund may be considered in the following situations:
          </p>
          <ul>
            <li>
              <strong>Late Delivery:</strong> If we fail to deliver your order by the specified deadline. The refund amount will be recalculated based on the actual delivery time.
            </li>
            <li>
              <strong>Quality Concerns:</strong> If you are not satisfied with the quality of the work and can provide specific, valid reasons and examples showing that the initial instructions were not followed. In such cases, we first encourage you to use our free revision policy. If you are still not satisfied after revisions, you may be eligible for a partial refund at the discretion of our Quality Assurance department.
            </li>
          </ul>

          <h2>4. No Refund Situations</h2>
          <p>
            We do not issue refunds in the following situations:
          </p>
           <ul>
            <li>
              <strong>Low Grade:</strong> We cannot guarantee a specific grade. The work we provide is intended as a reference and model to help you. Your final grade depends on many factors, including your own understanding and participation in your course.
            </li>
             <li>
              <strong>After Approval:</strong> Once you have approved the final delivered paper and released the payment to the writer, you are no longer eligible for a refund.
            </li>
          </ul>

          <h2>5. How to Request a Refund</h2>
          <p>
            To request a refund, please contact our support team at support@essayembassy.com within 14 days of your order's delivery. Please provide your order number and a detailed explanation of your reason for the request. Our Quality Assurance department will review your claim and respond within 3-5 business days.
          </p>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicy;
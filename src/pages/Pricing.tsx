import { Helmet } from 'react-helmet-async';
import PricingSection from '../components/Pricing/PricingSection';

export default function Pricing() {
  return (
    <>
      <Helmet>
        <title>Pricing — Essay Embassy</title>
        <meta
          name="description"
          content="Transparent per-page pricing for academic writing by level and deadline. No hidden fees — see rates and what is included."
        />
        <link rel="canonical" href="https://essayembassy.com/pricing/" />
      </Helmet>
      <div className="min-h-screen bg-white">
        <PricingSection />
      </div>
    </>
  );
}

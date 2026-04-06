import { Helmet } from 'react-helmet-async';
import HeroSectionV2 from '../components/Hero/HeroSectionV2';
import HowItWorksSection from '../components/HowItWorks/HowItWorksSection';
import SocialProofSection from '../components/SocialProof/SocialProofSection';
import ServicesOverviewSection from '../components/Services/ServicesOverviewSection';
import WhyChooseUsSection from '../components/WhyChooseUs/WhyChooseUsSection';
import WritersSection from '../components/Writers/WritersSection';
import PricingSection from '../components/Pricing/PricingSection';
import FAQSection from '../components/FAQ/FAQSection';

// Main HomeV2 Component
export default function HomeV2() {
    return (
        <>
            <Helmet>
                <title>Essay Embassy - Professional Academic Writing Service | Essays, Research Papers & More</title>
                <meta name="description" content="Get expert academic writing help from 200+ PhD & Master's writers. 100% original, plagiarism-free essays, research papers, and dissertations. Starting at $11/page." />
                <meta name="keywords" content="essay writing service, academic writing, research paper help, dissertation writing, college essays" />
                <link rel="canonical" href="https://essayembassy.com/" />
            </Helmet>

            <div className="min-h-screen bg-white">
                <HeroSectionV2 />
                <HowItWorksSection />
                <SocialProofSection />
                <ServicesOverviewSection />
                <WhyChooseUsSection />
                <WritersSection />
                <PricingSection />
                <FAQSection />

            </div>
        </>
    );
}

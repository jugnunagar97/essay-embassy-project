import React from 'react';
import ScrollableContentPanel from '../ScrollableContentPanel';
import {
  getRegionalStickySeoConfig,
  type RegionalStickySeoId,
} from './regionalStickySeoContent';

type RegionalAssignmentStickySeoSectionProps = {
  region: RegionalStickySeoId;
};

/** Sticky left column + scrollable SEO card panel (matches USA assignment help layout). */
const RegionalAssignmentStickySeoSection: React.FC<RegionalAssignmentStickySeoSectionProps> = ({
  region,
}) => {
  const { cards, schema, heading, description, badges } = getRegionalStickySeoConfig(region);

  return (
    <section className="bg-slate-50 py-12 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <style>{`
        .seo-trust-badge {
          font-size: 12px;
          font-weight: 600;
          background: #EFF6FF;
          color: #1652A0;
          padding: 6px 12px;
          border-radius: 999px;
          white-space: nowrap;
        }
      `}</style>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-12">
          <div className="flex-shrink-0 self-start lg:sticky lg:top-[80px] lg:w-[35%]">
            <h2 className="text-3xl font-black tracking-tight text-[#0B1F42] sm:text-4xl">{heading}</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">{description}</p>

            <div className="mt-6 flex flex-wrap gap-2" aria-label="Service ratings and statistics">
              {badges.map((badge) => (
                <span key={badge} className="seo-trust-badge">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <ScrollableContentPanel
            className="w-full lg:w-[65%]"
            ariaLabel="Assignment help information"
            cards={cards}
            fadeBottomColor="#F8FAFC"
          />
        </div>
      </div>
    </section>
  );
};

export default RegionalAssignmentStickySeoSection;

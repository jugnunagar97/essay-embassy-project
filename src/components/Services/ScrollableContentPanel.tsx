import React from 'react';
import type { ScrollableContentCard } from './scrollableContentPanel.types';

export type ScrollableContentPanelProps = {
  /** Accessible name for the scrollable region. */
  ariaLabel?: string;
  cards: ScrollableContentCard[];
  className?: string;
  /** Bottom fade color (match parent section background). */
  fadeBottomColor?: string;
};

const ScrollableContentPanel: React.FC<ScrollableContentPanelProps> = ({
  ariaLabel = 'Service information',
  cards,
  className = '',
  fadeBottomColor = '#F8FAFC',
}) => {
  const safeFade = fadeBottomColor.replace(/[<>'"]/g, '');

  return (
    <>
      <style>{`
        .seo-scroll-panel-wrapper {
          position: relative;
        }
        .seo-scroll-panel-wrapper::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 64px;
          background: linear-gradient(to bottom, transparent, ${safeFade});
          pointer-events: none;
          z-index: 10;
        }
        .seo-scroll-panel::-webkit-scrollbar {
          width: 4px;
        }
        .seo-scroll-panel::-webkit-scrollbar-track {
          background: transparent;
        }
        .seo-scroll-panel::-webkit-scrollbar-thumb {
          background: rgba(22, 82, 160, 0.4);
          border-radius: 999px;
        }
        .seo-scroll-panel::-webkit-scrollbar-thumb:hover {
          background: rgba(22, 82, 160, 0.7);
        }
        .seo-content-card {
          background: #FFFFFF;
          border: 1px solid rgba(11, 31, 66, 0.08);
          border-radius: 12px;
          padding: 24px 20px;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .seo-content-card:hover {
          box-shadow: 0 4px 20px rgba(22, 82, 160, 0.08);
          transform: translateY(-2px);
        }
        .seo-card-icon {
          width: 36px;
          height: 36px;
          background: #EFF6FF;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          color: #1652A0;
        }
      `}</style>

      <div className={`seo-scroll-panel-wrapper max-w-full min-w-0 w-full ${className}`.trim()}>
        <div
          className="seo-scroll-panel max-w-full h-[380px] overflow-y-scroll overflow-x-hidden pr-2 md:pr-4 lg:h-[520px]"
          role="region"
          aria-label={ariaLabel}
        >
          <div className="grid max-w-full grid-cols-1 gap-5 pb-20 md:grid-cols-2">
            {cards.map(({ id, Icon, heading, body }) => (
              <article key={id} className="seo-content-card flex min-w-0 flex-col">
                <div className="seo-card-icon">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-lg font-bold leading-snug text-[#0B1F42]">{heading}</h3>
                <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollableContentPanel;

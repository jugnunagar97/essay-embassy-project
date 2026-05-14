import React from 'react';

/** Local assets under /public/images — Gmail from Wikimedia; Trustpilot/Instagram paths from Simple Icons (green / gradient applied); Sitejabber wordmark in brand orange. */
const BRAND_IMG = {
  gmail: '/images/gmail-icon.svg',
  google: '/images/google-icon.svg',
  trustpilot: '/images/trustpilot-logo.svg',
  sitejabber: '/images/sitejabber-wordmark.svg',
  instagram: '/images/instagram-gradient.svg',
} as const;

export default function AuthenticTestimonials() {
  return (
    <section className="w-full min-w-0 overflow-x-hidden bg-[#FAFAFA] px-4 py-[80px] font-sans md:px-8">
      <div className="mx-auto mb-12 flex max-w-6xl min-w-0 flex-col items-center text-center">
        <span className="mb-3 text-[11px] font-bold uppercase tracking-widest text-gray-500">Social Proof</span>
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
          Real Words. Real Clients. <br className="hidden md:block" /> Zero Filters.
        </h2>
        <p className="mx-auto max-w-xl text-base font-medium text-gray-600 md:text-lg">
          Screenshots straight from inboxes, chats, and review platforms.
        </p>
      </div>

      <div className="mx-auto grid min-w-0 max-w-5xl auto-rows-max grid-cols-1 items-start gap-4 md:grid-cols-[repeat(3,minmax(0,1fr))] md:gap-[15px]">
        {/* CARD 1: GMAIL */}
        <div className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white font-sans text-[13px] shadow-[0px_4px_16px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg md:col-span-2 md:text-[14px]">
          <div className="flex items-center space-x-4 border-b border-gray-100 bg-white p-3">
            <img
              src={BRAND_IMG.gmail}
              alt=""
              width={24}
              height={24}
              className="h-6 w-6 shrink-0 object-contain"
              decoding="async"
            />
            <div className="text-[12px] text-gray-500">Inbox</div>
          </div>
          <div className="flex flex-col px-5 py-4">
            <h3 className="mb-2 text-[18px] text-[#202124] md:text-[20px]" style={{ fontWeight: 400 }}>
              Re: Final thesis check – you guys saved me
            </h3>

            <div className="mt-2 flex min-w-0 items-start justify-between gap-2">
              <div className="flex min-w-0 items-center space-x-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[14px] font-bold text-blue-700">
                  E
                </div>
                <div className="flex min-w-0 flex-col">
                  <div className="text-[13px] md:text-[14px]">
                    <span className="font-semibold text-black">Emily Parker</span>
                    <span
                      className="ml-2 select-none text-[12px] font-normal text-gray-500 blur-[2px] md:text-[13px]"
                      aria-label="Email hidden for privacy"
                    >
                      &lt;emily.p.42@student.university.edu&gt;
                    </span>
                  </div>
                  <div className="text-[12px] text-gray-500">
                    to me <span className="mx-1">▾</span>
                  </div>
                </div>
              </div>
              <span className="shrink-0 text-[11px] text-gray-500 md:text-[12px]">3 weeks ago</span>
            </div>

            <div className="ml-0 mt-4 pb-4 font-[400] text-[14px] leading-relaxed text-[#222] sm:ml-10">
              Hey guys,
              <br />
              <br />
              Just wanted to drop a quick note. I got my capstone project results back last month and I honestly
              can&apos;t believe it. I got an 85. The depth of research the writer did on the structural mechanics chapter
              was absolutely insane.
              <br />
              <br />
              Literally wouldn&apos;t have graduated on time without this. Expect my sister to order something for her
              psychology module next week lmao.
              <br />
              <br />
              Best,
              <br />
              Emily
            </div>
          </div>
        </div>

        {/* CARD 2: WHATSAPP */}
        <div
          className="-rotate-[0.5deg] flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[20px] border border-gray-100 bg-[#E5DDD5] shadow-[0px_4px_16px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg md:col-span-1 md:row-span-2"
          style={{
            backgroundImage: 'radial-gradient(#d3cbc1 1px, transparent 1px)',
            backgroundSize: '10px 10px',
          }}
        >
          <div className="sticky top-0 z-10 flex h-[60px] min-w-0 shrink-0 items-center bg-[#008069] px-4 shadow-sm">
            <div className="flex h-[16px] w-[10px] shrink-0 items-center text-white">←</div>
            <div className="mx-3 ml-2 flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border-2 border-white/20 bg-gray-300 text-[18px] text-white">
              🎓
            </div>
            <div className="min-w-0 flex-1 overflow-hidden text-white">
              <div className="truncate text-[15px] font-semibold leading-tight">Jake B.</div>
              <div className="mt-[-1px] truncate text-[12px] font-normal text-white/80">
                last seen last Thursday at 9:18 PM
              </div>
            </div>
            <div className="flex shrink-0 space-x-4 text-[18px] text-white">
              📹 📞
            </div>
          </div>

          <div className="flex flex-grow flex-col space-y-[14px] p-4">
            <div className="flex w-full justify-center pb-2">
              <div className="rounded-lg bg-[#D3E8EE] px-3 py-[2px] text-[11.5px] font-medium uppercase text-slate-500">
                Apr 12
              </div>
            </div>

            <div className="flex w-full justify-end">
              <div
                className="relative max-w-[85%] rounded-l-xl rounded-b-xl rounded-tr-[4px] bg-[#DCF8C6] px-2 py-[6px] pl-3 shadow-sm"
                style={{ boxSizing: 'border-box' }}
              >
                <div
                  className="inline-block max-w-full break-words pr-8 text-[14px] leading-snug tracking-[-0.2px] whitespace-pre-wrap text-[#303030]"
                  style={{ fontFamily: '-apple-system, system-ui' }}
                >
                  Hi Jake, just checking if you were happy with the final economics rewrite we delivered yesterday?
                </div>
                <div className="float-right ml-[-30px] mt-[5px] flex h-[14px] w-[35px] items-end justify-end text-right text-[10px] font-semibold text-[#136652]/70">
                  11:32
                  <div className="relative bottom-[1px] ml-[3px] text-[13px] tracking-[-4px] text-[#53BDEB]">
                    ✓✓
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex w-full">
              <div className="relative max-w-[85%] rounded-r-xl rounded-b-xl rounded-tl-[4px] bg-white px-2 py-[6px] pl-3 shadow-sm">
                <div className="inline-block pr-10 text-[14px] leading-[19px] whitespace-pre-wrap text-[#303030]">
                  bro u have no idea.
                  <br />
                  my prof literally said it was the clearest arg he read in my class so far 😭😭
                </div>
                <div className="absolute bottom-1 right-1.5 inline-block pl-[6px] text-[10px] text-gray-400">12:14</div>
              </div>
            </div>

            <div className="relative mt-[2px] flex w-full">
              <div className="relative max-w-[85%] rounded-bl-xl rounded-br-xl rounded-r-xl rounded-tl-[2px] bg-white px-2 py-[6px] pl-3 shadow-sm">
                <div className="inline-block pr-10 text-[14px] leading-[19px] whitespace-pre-wrap text-[#303030]">
                  you guys delivered fast af too. saved my gpa seriously
                </div>
                <div className="absolute bottom-1 right-1.5 inline-block pl-[6px] text-[10px] text-gray-400">12:15</div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: TRUSTPILOT */}
        <div
          className="relative flex min-w-0 rotate-[0.8deg] flex-col border-t-2 border-[#00B67A] bg-white p-[24px] font-sans shadow-[0px_4px_16px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg md:col-span-1"
          style={{ borderRadius: '4px' }}
        >
          <div className="mb-3 flex min-w-0 flex-wrap items-center gap-2">
            <img
              src={BRAND_IMG.trustpilot}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 shrink-0 object-contain"
              decoding="async"
            />
            <span className="text-[15px] font-bold tracking-tight text-[#191919]">Trustpilot</span>
          </div>
          <div className="mb-[6px] flex items-center space-x-[2px]">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex h-5 w-5 items-center justify-center bg-[#00B67A] pb-[2px] text-white">
                ★
              </div>
            ))}
          </div>

          <div className="mb-3 flex items-center text-gray-500">
            <span className="mt-1 flex items-center gap-[4px] rounded-[3px] border border-gray-200 bg-[#E3EDE9]/60 px-1.5 text-[12px] font-semibold text-gray-500/80">
              <span className="relative top-[1px] text-[#00B67A]">✓</span> Verified
            </span>
          </div>

          <h3 className="mb-2 text-[16px] font-[700] leading-tight tracking-tight text-[#1a1a1a]">
            Consistently transparent and strict with native English
          </h3>
          <p
            className="mb-[20px] hyphens-auto text-justify text-[14px] font-medium leading-[22px] text-[#1a1a1a]"
            style={{ opacity: 0.85 }}
          >
            It&apos;s the 3rd time ordering, primarily for deep literature reviews. A bit anxious at first due to sketchy
            sites online, but Essay Embassy communicates instantly. 10/10 layout & perfectly matched standard of my native
            uni context. Zero AI detected on Turnitin as well.
          </p>
          <div className="absolute bottom-4 flex w-[calc(100%-48px)] items-center justify-between text-[13px] font-semibold text-[#6c6c85]">
            <span className="font-bold text-[#1a1a1a]">Marcus R. 🇬🇧</span>
            <span className="text-[12px] font-medium text-gray-500">Oct 14, 2024</span>
          </div>
        </div>

        {/* CARD 4: GOOGLE */}
        <div className="relative flex min-h-[220px] min-w-0 flex-col rounded-lg border border-gray-50 bg-white p-5 shadow-[0px_2px_12px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg md:col-span-1">
          <div className="mb-3 flex w-full items-center justify-between">
            <div className="flex min-w-0 items-center">
              <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#7B1FA2] text-lg font-bold text-white">
                A
              </div>
              <div className="ml-3 flex min-w-0 flex-col">
                <span className="text-[15px] font-[500] text-[#202124]">Austin R.</span>
                <span className="text-[12px] font-[400] tracking-[-0.2px] text-[#70757a]">Local Guide • 14 reviews</span>
              </div>
            </div>
            <img
              src={BRAND_IMG.google}
              alt="Google"
              width={28}
              height={28}
              className="mr-1 h-7 w-7 shrink-0 object-contain"
              decoding="async"
            />
          </div>

          <div className="mb-2 flex items-center gap-0 text-[18px] tracking-widest text-[#F4B400]">
            ★ ★ ★ ★ ★{' '}
            <span className="mt-1 ml-2 block align-middle text-[13px] font-medium leading-[20px] tracking-normal text-[#70757a]">
              4 days ago
            </span>
          </div>

          <p className="text-[14px] font-[400] leading-[20px] text-[#3c4043]">
            The drafting team actually listened to the specific rubric requirements instead of just giving generic waffle.
            Will highly recommend the premium writer option if u are a grad student struggling. They actually read the
            files u upload!
          </p>

          <div className="absolute bottom-4 mt-6 flex w-[calc(100%-40px)] items-center text-[13px] text-[#70757a]">
            <div className="flex cursor-default items-center rounded-[32px] border border-gray-200 bg-[#F8F9FA] px-[12px] py-[6px] hover:bg-gray-50">
              <svg focusable="false" viewBox="0 0 24 24" height="18px" width="18px" className="fill-current text-[#4285F4]">
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
              </svg>
              <span className="ml-1 text-[13px] font-[500] text-black">12 Helpful</span>
            </div>
          </div>
        </div>

        {/* CARD 5: SITEJABBER */}
        <div className="flex min-w-0 flex-col rounded border border-gray-200 bg-white p-6 pb-5 pt-5 font-sans shadow-[0px_4px_16px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg md:col-span-2">
          <div className="mb-[4px] space-y-3 border-b border-gray-100 pb-3">
            <div className="flex min-w-0 items-center justify-between gap-3">
              <img
                src={BRAND_IMG.sitejabber}
                alt="Sitejabber"
                className="h-6 w-auto min-w-0 max-w-[min(160px,55vw)] object-contain object-left md:h-7 md:max-w-[180px]"
                decoding="async"
              />
              <div className="shrink-0 text-[18px] font-[900] tracking-[0px] text-[#FF6600]">★ ★ ★ ★ ★</div>
            </div>
            <div className="flex min-w-0 items-center gap-[6px]">
              <div className="h-[32px] w-[32px] shrink-0 overflow-hidden rounded-full bg-slate-200" />
              <div className="min-w-0">
                <div className="text-[15px] font-[600] leading-tight text-gray-900">sarah_writes8</div>
                <div className="text-[12px] font-semibold tracking-[-0.3px] text-gray-500">Austin, TX, US</div>
              </div>
            </div>
          </div>

          <h3 className="mb-2 pt-[10px] text-[18px] font-[600] text-[#111827]">
            Literally the only writing service I&apos;ll ever trust with my GPA.
          </h3>

          <p
            className="hyphens-auto break-words pb-5 pr-2 text-[14px] font-[400] leading-snug text-gray-800"
            style={{ wordBreak: 'break-word' }}
          >
            Tried multiple writing providers before (not gonna name drop them but most suck with non-English outsourced
            AI bs). Essay Embassy is totally completely different. Communication felt genuine. Real writers fixing
            citations exactly correctly in Harvard Style and integrating scholarly articles seamlessly. Support actually
            responses at 2am which saved me since my deadline was in 4hrs lmao. If u need help, actually trust these guys
            over the mega mills online. Quality is raw, unfiltered accuracy. Highly recommend their 24hr premium speed.
          </p>

          <div className="mt-auto mt-2 flex items-center gap-4 border-t border-gray-100 pt-1 text-[#4b5563]">
            <span className="flex items-center gap-[5px] rounded border border-[#FFD9C6] bg-[#FFF2ED] px-[6px] py-[1px] text-[13px] font-[500] text-[#FF6600]">
              ✓ Verified Buyer
            </span>
            <span className="flex gap-[2px] text-[13px] font-[600]">
              👍 Helpful <span className="ml-1 font-normal text-gray-400"> (16)</span>
            </span>
          </div>
        </div>

        {/* CARD 6: INSTAGRAM DM */}
        <div
          className="-rotate-[1.5deg] flex min-h-[230px] min-w-0 flex-col justify-end overflow-hidden rounded-2xl border-[1px] border-gray-200 bg-white px-3 pb-4 pt-[10px] font-sans shadow-[0px_4px_16px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg md:col-span-1 md:min-h-[280px]"
        >
          <div className="mt-1 mb-5 flex w-full items-center justify-center gap-2 border-b border-gray-50 px-1 pb-2">
            <img
              src={BRAND_IMG.instagram}
              alt=""
              width={22}
              height={22}
              className="h-[22px] w-[22px] shrink-0 object-contain"
              decoding="async"
            />
            <div className="text-[15px] font-[600] text-gray-800">m_scott9</div>
          </div>

          <div className="flex w-full justify-center pb-3 text-[12px] font-semibold text-[#a8a8a8]">Wednesday 8:12 PM</div>

          <div className="relative mb-2 mt-auto flex h-full w-full flex-grow-0 flex-col items-end justify-end gap-2 self-end pr-2">
            <div className="max-w-[85%] rounded-2xl bg-[#efefef] px-3 py-[8px] text-[14px] leading-[18px] text-[#000]">
              bro your service is literally goated 😭🙏 sent it directly to the portal as is!
            </div>

            <div className="relative max-w-[80%] rounded-[18px] bg-[#efefef] px-[12px] py-[8px] pr-8 text-[14px] leading-[18px] text-[#000]">
              the tutor actually commented &quot;excellent structural logic on Q4&quot; haha. definitely bookmarking u for
              next year ty❤️
            </div>
            <div className="mr-[2px] mt-1 text-[11px] text-[#A0A0A0]">Seen</div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-[48px] flex max-w-4xl min-w-0 flex-col items-center">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-4 px-4 font-bold text-gray-500 md:gap-8">
          <div className="flex min-w-[80px] flex-col items-center gap-[4px]">
            <img
              src={BRAND_IMG.google}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
              decoding="async"
            />
            <span className="text-[11px]">4.9 ⭐ (850+)</span>
          </div>
          <div className="block h-6 w-[1px] shrink-0 bg-gray-200" />
          <div className="flex min-w-[80px] flex-col items-center gap-[4px]">
            <img
              src={BRAND_IMG.trustpilot}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
              decoding="async"
            />
            <span className="text-[11px]">4.8 ⭐ (600+)</span>
          </div>
          <div className="hidden h-6 w-[1px] shrink-0 bg-gray-200 md:block" />
          <div className="flex min-w-[80px] flex-col items-center gap-[4px]">
            <img
              src={BRAND_IMG.sitejabber}
              alt=""
              className="h-5 w-auto max-w-[104px] object-contain"
              decoding="async"
            />
            <span className="text-[11px]">4.9 ⭐ (520+)</span>
          </div>
        </div>
        <span className="mt-3 flex w-full justify-center bg-transparent text-center text-[13px] font-[500] tracking-wide text-gray-400 backdrop-blur">
          Showing 6 of 2,400+ verified reviews across platforms. Names protected for privacy.
        </span>
      </div>
    </section>
  );
}

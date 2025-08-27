import { Link } from 'react-router-dom';

const CompareContrastEssay = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Compare & Contrast Essay Writing Service
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Expert academic writers build structured, insightful comparisons with clear criteria, balanced analysis, and precise citations.
          </p>
          <Link
            to="/order-now"
            className="inline-block bg-white text-primary-600 font-bold px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition-colors"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* What Makes Our Compare & Contrast Service Special */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What Makes Our Compare & Contrast Service Special?</h2>
          <p className="text-lg text-gray-600 mb-6">Criteria‑led comparisons with balanced analysis, synthesized insights, and clear recommendations where appropriate. We tailor scope and depth for high school, undergraduate, and postgraduate students across the US, UK, Canada, Australia, and Europe. Experience: <strong>7+ years</strong>, <strong>500+ writers</strong>, <strong>10,262+</strong> successful orders. <Link to="/order-now" className="text-primary-600 underline">Order Now</Link>.</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow"><div className="font-semibold text-gray-900 mb-2">Criteria & thesis clarity</div><div className="text-gray-600">We define evaluation criteria up‑front and align each section to a defensible thesis.</div></div>
            <div className="bg-white p-6 rounded-xl shadow"><div className="font-semibold text-gray-900 mb-2">Evidence & citations</div><div className="text-gray-600">Peer‑reviewed sources and course texts with APA/MLA/Chicago referencing on request.</div></div>
            <div className="bg-white p-6 rounded-xl shadow"><div className="font-semibold text-gray-900 mb-2">Synthesis, not summary</div><div className="text-gray-600">We go beyond lists—highlighting significance and recommending positions when needed.</div></div>
          </div>
        </div>
      </section>

      {/* Track Record */
      }
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white rounded-xl p-6 shadow"><div className="text-3xl font-bold text-emerald-600">7+</div><div className="text-gray-600">Years in business</div></div>
            <div className="bg-white rounded-xl p-6 shadow"><div className="text-3xl font-bold text-emerald-600">500+</div><div className="text-gray-600">Professional writers</div></div>
            <div className="bg-white rounded-xl p-6 shadow"><div className="text-3xl font-bold text-emerald-600">10,262+</div><div className="text-gray-600">Successful orders completed</div></div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What Students Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-700 mb-4">“They set clear criteria and compared theories without getting lost in summary. The synthesis section sealed it.”</p>
              <div className="text-sm text-gray-600">Client: Hannah Q. • Order ID: EE-86741 • Date: May 12, 2025</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-700 mb-4">“Balanced analysis with citations I could verify. The conclusion recommended a stance with solid reasoning.”</p>
              <div className="text-sm text-gray-600">Client: Jerome V. • Order ID: EE-87298 • Date: June 2, 2025</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-700 mb-4">“Fast turnaround and clean structure—my professor noted the clear criteria and transitions.”</p>
              <div className="text-sm text-gray-600">Client: Laila M. • Order ID: EE-85930 • Date: April 21, 2025</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-700 mb-4">“They helped me pick fair criteria and weigh them. The matrix made my comparison easy to follow.”</p>
              <div className="text-sm text-gray-600">Client: Victor S. • Order ID: EE-87521 • Date: March 8, 2025</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-700 mb-4">“Good use of sources and clear explanations of differences and similarities—no fluff, just analysis.”</p>
              <div className="text-sm text-gray-600">Client: Naomi P. • Order ID: EE-87864 • Date: February 10, 2025</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-700 mb-4">“Conclusion tied the criteria together and justified a recommendation. Exactly what my rubric asked for.”</p>
              <div className="text-sm text-gray-600">Client: Omar R. • Order ID: EE-88139 • Date: June 14, 2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Professional Compare & Contrast Essay Help
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We define comparison criteria, synthesize similarities and differences, and recommend a position where appropriate—aligned with US, UK, CA, AU, and European academic standards.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Expert academic writers in humanities and STEM
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Original, plagiarism‑free content with proper references
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  On‑time delivery with revision windows
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Free revisions within scope
                </li>
              </ul>
              <div className="mt-6 text-gray-600">
                Explore more options like <Link to="/services/argumentative-essay" className="text-primary-600 underline">argumentative essays</Link>,
                <Link to="/services/research-paper-writing" className="text-primary-600 underline"> research papers</Link>, or
                <Link to="/services/term-paper" className="text-primary-600 underline"> term papers</Link>. Have questions? <Link to="/contact" className="text-primary-600 underline">Contact us</Link> or read our <Link to="/reviews" className="text-primary-600 underline">reviews</Link> before you <Link to="/order-now" className="text-primary-600 underline">order</Link>.
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Service?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary-100 p-2 rounded-full mr-4">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Clear criteria & thesis</h4>
                    <p className="text-gray-600">We establish evaluation criteria, weigh evidence, and articulate a defensible thesis where required.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary-100 p-2 rounded-full mr-4">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Quality Guarantee</h4>
                    <p className="text-gray-600">100% original content, structured analysis, and correct referencing (APA/MLA/Chicago).</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary-100 p-2 rounded-full mr-4">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Transparent terms</h4>
                    <p className="text-gray-600">See our <a href="https://essayembassy.com/refund-policy" className="text-primary-600 underline">refund policy</a> and <Link to="/terms-and-conditions" className="text-primary-600 underline">terms</Link> any time.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Journey Block */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Journey to a High‑Scoring Compare & Contrast Essay</h2>
          <ol className="grid md:grid-cols-4 gap-4 list-decimal list-inside text-gray-700">
            <li>Submit your prompt, criteria, word count, and deadline.</li>
            <li>We match you with a compare‑and‑contrast specialist in your subject.</li>
            <li>Draft delivery with balanced analysis, citations, and clear transitions.</li>
            <li>Quality check and final delivery; request revisions if needed.</li>
          </ol>
          <div className="mt-6">
            <Link to="/order-now" className="inline-block bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-700">Order Now</Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow"><div className="font-semibold text-gray-900 mb-2">Do you define comparison criteria?</div><div className="text-gray-700">Yes—criteria are set up‑front and guide sections to avoid summary‑only writing.</div></div>
            <div className="bg-white p-6 rounded-xl shadow"><div className="font-semibold text-gray-900 mb-2">What sources do you use?</div><div className="text-gray-700">Peer‑reviewed literature, credible reports, and course texts; APA/MLA/Chicago formatting available.</div></div>
            <div className="bg-white p-6 rounded-xl shadow"><div className="font-semibold text-gray-900 mb-2">Can you include a recommendation?</div><div className="text-gray-700">If your brief requires, we provide a justified position based on weighted criteria.</div></div>
            <div className="bg-white p-6 rounded-xl shadow"><div className="font-semibold text-gray-900 mb-2">How fast is delivery?</div><div className="text-gray-700">Rush from 3 hours; standard 24–72 hours. Set your deadline via <Link to="/order-now" className="text-primary-600 underline">Order Now</Link>.</div></div>
            <div className="bg-white p-6 rounded-xl shadow"><div className="font-semibold text-gray-900 mb-2">Is it private and original?</div><div className="text-gray-700">Yes. 100% custom, confidential work. See our <Link to="/refund-policy" className="text-primary-600 underline">refund policy</Link>.</div></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Order your compare and contrast essay today and get professional academic help</p>
          <Link
            to="/order-now"
            className="inline-block bg-white text-primary-600 font-bold px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition-colors"
          >
            Order Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CompareContrastEssay;


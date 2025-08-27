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


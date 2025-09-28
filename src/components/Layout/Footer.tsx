import { Link } from 'react-router-dom';
import { 
  Twitter, 
  Instagram, 
  Linkedin,
  Shield,
  CheckCircle,
  Lock,
  CreditCard
} from 'lucide-react';
import visaLogo from '../../images/visa.svg';
import mastercardLogo from '../../images/mastercard.svg';
import amexLogo from '../../images/amex.svg';
import discoverLogo from '../../images/discover.svg';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white relative overflow-hidden">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Footer Header Section */}
        <div className="container mx-auto px-5 py-16 border-b border-gray-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Side - Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src="/images/logo.png" 
                alt="Essay Embassy" 
                className="h-16 w-16 object-contain"
              />
              <div>
                <h2 className="text-2xl font-bold text-white">Essay Embassy</h2>
                <p className="text-gray-400 text-sm">Academic Excellence</p>
              </div>
            </div>

            {/* Right Side - Social Media */}
            <div className="flex flex-col items-center space-y-3">
              <span className="text-gray-300 font-medium text-sm">Follow Us</span>
              <div className="flex space-x-3">
                <a href="https://x.com/essayembassy/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-gray-800">
                  <Twitter size={20} />
                </a>
                <a href="https://www.instagram.com/essayembassy/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-gray-800">
                  <Instagram size={20} />
                </a>
                <a href="https://www.linkedin.com/company/essay-embassy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-gray-800">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Multi-Column Link Structure */}
        <div className="container mx-auto px-5 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            
            {/* Column 1: Essay Services */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide">Essay Services</h3>
              <ul className="space-y-3">
                <li><Link to="/services/argumentative-essay" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Argumentative Essay Service</Link></li>
                <li><Link to="/services/narrative-essay" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Narrative Essay Service</Link></li>
                <li><Link to="/services/admission-essay" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Admission Essay Service</Link></li>
                <li><Link to="/services/essay-writing" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Essay Writing Service</Link></li>
                <li><Link to="/services/scholarship-essay" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Scholarship Essay Service</Link></li>
                <li><Link to="/services/book-review" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Book Review Service</Link></li>
              </ul>
            </div>

            {/* Column 2: Writing Help */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide">Writing Help</h3>
              <ul className="space-y-3">
                <li><Link to="/services/term-paper" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Term Paper Writing Help</Link></li>
                <li><Link to="/services/research-paper-writing" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Research Paper Writing Help</Link></li>
                <li><Link to="/services/thesis-writing" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Thesis Writing Help</Link></li>
                <li><Link to="/services/dissertation-writing" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Dissertation Writing Help</Link></li>
                <li><Link to="/services/lab-report" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Lab Report Writing Help</Link></li>
                <li><Link to="/services/programming-help" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Programming Help</Link></li>
                <li><Link to="/services/assignment-help" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Assignment Help</Link></li>
                <li><Link to="/assignment-help/engineering" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Engineering Assignment Help</Link></li>
                <li><Link to="/services/english-assignment-help" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">English Assignment Help</Link></li>
                <li><Link to="/services/physics-assignment-help" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Physics Assignment Help</Link></li>
                <li><Link to="/services/homework-help" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Homework Help</Link></li>
                <li><Link to="/case-study-help" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Case Study Help</Link></li>
              </ul>
            </div>

            {/* Column 3: Legal & Policies */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide">Legal & Policies</h3>
              <ul className="space-y-3">
                <li><Link to="/privacy-policy" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Privacy Policy</Link></li>
                <li><Link to="/terms-and-conditions" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Terms of Use</Link></li>
                <li><Link to="/refund-policy" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Refunds & Cancellations</Link></li>
              </ul>
            </div>

            {/* Column 4: Company */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide">Company</h3>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">About Us</Link></li>
                <li><Link to="/writers" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Our Writers</Link></li>
                <li><Link to="/honor-code" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Honor Code</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Contact</Link></li>
              </ul>
            </div>

            {/* Column 5: Resources */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide">Resources</h3>
              <ul className="space-y-3">
                <li><Link to="/blog" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">Blog</Link></li>
                <li><Link to="/faq" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:underline">FAQ</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Trust and Security Section */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-5 py-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left Side - Security Badges */}
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                  <Shield className="text-green-600 mr-2" size={20} />
                  <span className="text-gray-800 font-medium text-sm">DMCA Protected</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                  <Lock className="text-blue-600 mr-2" size={20} />
                  <span className="text-gray-800 font-medium text-sm">PCI DSS Compliant</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                  <CheckCircle className="text-green-600 mr-2" size={20} />
                  <span className="text-gray-800 font-medium text-sm">Secure</span>
                </div>
              </div>

              {/* Right Side - Payment Methods */}
              <div className="flex items-center gap-4">
                <span className="text-gray-300 text-sm font-medium">We Accept:</span>
                <div className="flex items-center gap-3">
                  <div className="bg-white px-3 py-2 rounded shadow-sm flex items-center justify-center">
                    <img src={visaLogo} alt="Visa" className="h-6 w-auto" />
                  </div>
                  <div className="bg-white px-3 py-2 rounded shadow-sm flex items-center justify-center">
                    <img src={mastercardLogo} alt="Mastercard" className="h-6 w-auto" />
                  </div>
                  <div className="bg-white px-3 py-2 rounded shadow-sm flex items-center justify-center">
                    <img src={amexLogo} alt="American Express" className="h-6 w-auto" />
                  </div>
                  <div className="bg-white px-3 py-2 rounded shadow-sm flex items-center justify-center">
                    <img src={discoverLogo} alt="Discover" className="h-6 w-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="border-t border-gray-800 bg-gray-950">
          <div className="container mx-auto px-5 py-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm leading-relaxed max-w-4xl mx-auto">
                <strong>Disclaimer:</strong> All client orders are completed by our team of highly qualified human writers. 
                The essays and papers provided by us are not to be used for submission but rather as learning models only.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gray-800 bg-gray-950">
          <div className="container mx-auto px-5 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-2 md:mb-0">
                © 2025 EssayEmbassy.com. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <Link to="/privacy-policy" className="text-gray-400 hover:text-primary-400 transition-colors">Privacy Policy</Link>
                <Link to="/terms-and-conditions" className="text-gray-400 hover:text-primary-400 transition-colors">Terms & Conditions</Link>
                <Link to="/refund-policy" className="text-gray-400 hover:text-primary-400 transition-colors">Refund Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
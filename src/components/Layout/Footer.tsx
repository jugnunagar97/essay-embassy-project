import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Shield,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      {/* Trust Badges and Payment Methods Header Row */}
      <div className="bg-gray-100 py-5">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Trust Badges */}
            <div className="flex items-center gap-8">
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                <Shield className="text-green-600 mr-2" size={24} />
                <span className="text-gray-800 font-medium text-sm">McAfee Secure</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                <CheckCircle className="text-blue-600 mr-2" size={24} />
                <span className="text-gray-800 font-medium text-sm">100% Money Back Guarantee</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-5">
              <span className="text-gray-600 text-sm font-medium mr-2">We Accept:</span>
              <div className="flex items-center gap-4">
                <div className="bg-white px-3 py-2 rounded shadow-sm"><span className="text-blue-600 font-bold text-sm">VISA</span></div>
                <div className="bg-white px-3 py-2 rounded shadow-sm"><span className="text-red-600 font-bold text-sm">MC</span></div>
                <div className="bg-white px-3 py-2 rounded shadow-sm"><span className="text-blue-600 font-bold text-sm">AMEX</span></div>
                <div className="bg-white px-3 py-2 rounded shadow-sm"><span className="text-orange-600 font-bold text-sm">DISC</span></div>
                <div className="bg-white px-3 py-2 rounded shadow-sm"><span className="text-blue-600 font-bold text-sm">PayPal</span></div>
                <div className="bg-white px-3 py-2 rounded shadow-sm"><span className="text-gray-800 font-bold text-sm">Apple Pay</span></div>
                <div className="bg-white px-3 py-2 rounded shadow-sm"><span className="text-blue-600 font-bold text-sm">G Pay</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center">
                <img 
                  src="/images/logo.png" 
                  alt="Essay Embassy" 
                  className="h-16 w-16 object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-bold">Essay Embassy</span>
                <div className="text-sm text-gray-400">Academic Excellence</div>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your trusted partner in academic success. We provide professional writing services 
              to help students achieve their educational goals with confidence.
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Serving students worldwide since 2016 • 8+ years of excellence
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors hover:scale-110"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors hover:scale-110"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors hover:scale-110"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors hover:scale-110"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-primary-400">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-primary-400 transition-colors">Services</Link></li>
              <li><Link to="/samples" className="text-gray-300 hover:text-primary-400 transition-colors">Samples</Link></li>
              <li><Link to="/order-now" className="text-gray-300 hover:text-primary-400 transition-colors">Order Now</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-primary-400 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-primary-400">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3"><Mail size={20} className="text-primary-400" /><span className="text-gray-300">support@essayembassy.com</span></div>
              <div className="flex items-center space-x-3"><Phone size={20} className="text-primary-400" /><span className="text-gray-300">+1 (555) 123-4567</span></div>
              <div className="flex items-center space-x-3"><Clock size={20} className="text-primary-400" /><span className="text-gray-300">24/7 Support Available</span></div>
              <div className="flex items-center space-x-3"><MapPin size={20} className="text-primary-400" /><span className="text-gray-300">1309 Beacon Street, Suite 300, Brookline, Massachusetts 02446</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 EssayEmbassy.com. All rights reserved.
            </div>
            {/* CORRECTED LINKS */}
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-primary-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms-and-conditions" className="text-gray-400 hover:text-primary-400 transition-colors">Terms & Conditions</Link>
              <Link to="/refund-policy" className="text-gray-400 hover:text-primary-400 transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
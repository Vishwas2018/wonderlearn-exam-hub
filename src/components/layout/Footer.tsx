
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="font-bold text-2xl bg-gradient-to-r from-wonder-600 to-learn-600 bg-clip-text text-transparent">
                WonderLearn
              </div>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Helping students excel in NAPLAN, ICAS, and beyond with comprehensive exam preparation.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/exams" className="text-gray-600 hover:text-primary transition-colors">Exams</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm mb-4">Help & Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="text-gray-600 hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm mb-4">Connect With Us</h3>
            <p className="text-sm text-gray-600 mb-4">Stay updated with the latest educational resources and exam tips.</p>
            <div className="flex space-x-4">
              {/* Social media icons would go here */}
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} WonderLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

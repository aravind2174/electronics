import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Page } from '../../App';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 relative">
            {/* Logo Image - Absolute positioned */}
            <img 
              src="https://res.cloudinary.com/dhn6uszk0/image/upload/v1759241379/fa3854a1eeefe9862b10a80e1f072641-removebg-preview_pkq5d3.png"
              alt="Company Logo"
              className="absolute top-0 left-0 h-32 w-auto object-contain z-10"
            />
            
            {/* Spacer for logo area */}
            <div className="h-24 w-full"></div>
            
            <p className="text-gray-400 leading-relaxed">
              Your trusted partner for premium televisions and home entertainment solutions. 
              We bring you the latest technology at unbeatable prices.
            </p>
            <div className="flex space-x-4">
              <button className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors">
                <Youtube className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => onNavigate('home')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors">
                  All TVs
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors">
                  Smart TVs
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors">
                  OLED TVs
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors">
                  4K TVs
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors">
                  Deals & Offers
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors">
                  FAQ
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors">
                  Shipping Info
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors">
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors">
                  Warranty
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('account')}
                  className="hover:text-blue-400 transition-colors"
                >
                  My Account
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm">123 Tech Street, Electronics Hub</p>
                  <p className="text-sm">Mumbai, Maharashtra 400001</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-sm">+91 98765 43210</p>
                  <p className="text-xs text-gray-400">Mon-Sat 9AM-8PM</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-sm">support@electrohub.com</p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-3">We Accept</h4>
              <div className="flex space-x-2">
                <div className="px-2 py-1 bg-gray-800 rounded text-xs">VISA</div>
                <div className="px-2 py-1 bg-gray-800 rounded text-xs">UPI</div>
                <div className="px-2 py-1 bg-gray-800 rounded text-xs">PayTM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 ElectroHub. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Privacy Policy
            </button>
            <button className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Terms of Service
            </button>
            <button className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Sitemap
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

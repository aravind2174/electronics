import React from 'react';
import { Shield, Truck, Headphones as HeadphonesIcon, CreditCard, CheckCircle, Users } from 'lucide-react';

const SocialProof: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Checkout',
      description: '256-bit SSL encryption for safe transactions'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free delivery on orders above ₹10,000'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Round-the-clock customer assistance'
    },
    {
      icon: CreditCard,
      title: 'Easy EMI',
      description: 'Flexible payment options available'
    },
    {
      icon: CheckCircle,
      title: 'Warranty Guarantee',
      description: 'Official warranty on all products'
    },
    {
      icon: Users,
      title: 'Expert Installation',
      description: 'Professional setup by certified technicians'
    }
  ];

  const partners = [
    { name: 'Samsung', logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100&h=50&dpr=2' },
    { name: 'LG', logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100&h=50&dpr=2' },
    { name: 'Sony', logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100&h=50&dpr=2' },
    { name: 'TCL', logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100&h=50&dpr=2' },
    { name: 'Xiaomi', logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100&h=50&dpr=2' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Trust Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose ElectroHub?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex items-start space-x-4 p-6 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Partner Brands */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Authorized Dealer of Top Brands
          </h3>
          
          <div className="flex items-center justify-center space-x-8 md:space-x-12 opacity-60 hover:opacity-80 transition-opacity">
            {partners.map((partner, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-10 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-600">{partner.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Badges */}
        <div className="mt-16 flex justify-center space-x-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">SSL Secured</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Verified Store</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CreditCard className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Safe Payment</p>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Stay Updated with Latest Deals
          </h3>
          <p className="text-blue-100 mb-6">
            Get exclusive offers, new product announcements, and expert tips delivered to your inbox.
          </p>
          
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
          
          <p className="text-blue-200 text-sm mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
import React from 'react';
import { Shield, Truck, Headphones as HeadphonesIcon, CreditCard, CheckCircle, Users } from 'lucide-react';

const SocialProof: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Checkout',
      description: '256-bit SSL encryption for safe transactions',
      position: 'left-top'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free delivery on orders above ₹10,000',
      position: 'left-middle'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Round-the-clock customer assistance',
      position: 'left-bottom'
    },
    {
      icon: CreditCard,
      title: 'Easy EMI',
      description: 'Flexible payment options available',
      position: 'right-top'
    },
    {
      icon: CheckCircle,
      title: 'Warranty Guarantee',
      description: 'Official warranty on all products',
      position: 'right-middle'
    },
    {
      icon: Users,
      title: 'Expert Installation',
      description: 'Professional setup by certified technicians',
      position: 'right-bottom'
    }
  ];

  const partners = [
    { 
      name: 'TCL', 
      logo: 'https://res.cloudinary.com/dhn6uszk0/image/upload/v1759299436/brand-tcl_joxmp4.webp' // Add TCL logo URL here
    },
    { 
      name: 'VU TV', 
      logo: 'https://res.cloudinary.com/dhn6uszk0/image/upload/v1759299495/Vu_Televisions_rxsumf.png' // Add VU TV logo URL here
    },
    { 
      name: 'Hisense', 
      logo: 'https://res.cloudinary.com/dhn6uszk0/image/upload/v1759299527/Hisense_i7pafh.svg' // Add Hisense logo URL here
    }
  ];

  const getPositionStyles = (position: string) => {
    const styles: Record<string, string> = {
      'left-top': 'absolute top-8 left-0 transform -translate-x-4',
      'left-middle': 'absolute top-1/2 left-0 transform -translate-x-8 -translate-y-1/2',
      'left-bottom': 'absolute bottom-8 left-0 transform -translate-x-4',
      'right-top': 'absolute top-8 right-0 transform translate-x-4',
      'right-middle': 'absolute top-1/2 right-0 transform translate-x-8 -translate-y-1/2',
      'right-bottom': 'absolute bottom-8 right-0 transform translate-x-4'
    };
    return styles[position] || '';
  };

  const getLineStyles = (position: string) => {
    const lineStyles: Record<string, string> = {
      'left-top': 'absolute right-0 top-8 w-20 h-0.5 bg-gradient-to-r from-green-300 to-transparent transform translate-x-16 rotate-12',
      'left-middle': 'absolute right-0 top-1/2 w-20 h-0.5 bg-gradient-to-r from-green-300 to-transparent transform translate-x-16 -translate-y-1/2',
      'left-bottom': 'absolute right-0 bottom-8 w-20 h-0.5 bg-gradient-to-r from-green-300 to-transparent transform translate-x-16 -rotate-12',
      'right-top': 'absolute left-0 top-8 w-20 h-0.5 bg-gradient-to-l from-green-300 to-transparent transform -translate-x-16 -rotate-12',
      'right-middle': 'absolute left-0 top-1/2 w-20 h-0.5 bg-gradient-to-l from-green-300 to-transparent transform -translate-x-16 -translate-y-1/2',
      'right-bottom': 'absolute left-0 bottom-8 w-20 h-0.5 bg-gradient-to-l from-green-300 to-transparent transform -translate-x-16 rotate-12'
    };
    return lineStyles[position] || '';
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Circular Feature Layout */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
            Why Choose Us?
          </h2>
          
          {/* Circular Container */}
          <div className="relative max-w-6xl mx-auto h-[600px] flex items-center justify-center">
            {/* Central Image - Absolute positioned and bigger */}
            <img 
              src="https://res.cloudinary.com/dhn6uszk0/image/upload/v1759298002/istockphoto-1209903143-612x612-removebg-preview_ducr7v.png"
              alt="Why Choose Us"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 object-contain z-10"
            />

            {/* Floating Features */}
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index} 
                  className={`w-64 ${getPositionStyles(feature.position)} z-20`}
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:bg-green-50 transition-all duration-300 border border-gray-100 hover:scale-105 hover:border-green-200 cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center hover:bg-green-200 transition-colors">
                          <IconComponent className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Connecting Lines - Updated positioning */}
                  <div className={getLineStyles(feature.position)} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Partner Brands - Logo Placeholders */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Authorized Dealer
          </h3>
          
          <div className="flex items-center justify-center space-x-16">
            {partners.map((partner, index) => (
              <div key={index} className="text-center group">
                <div className="w-32 h-20 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-green-50 hover:border-green-200 border border-gray-200 transition-all duration-300 cursor-pointer group-hover:shadow-md">
                  {partner.logo ? (
                    <img 
                      src={partner.logo}
                      alt={`${partner.name} Logo`}
                      className="max-w-full max-h-full object-contain p-2"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-500 mb-1">Logo Placeholder</div>
                      <div className="text-xs text-gray-400">{partner.name}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Simple Newsletter */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Get Latest Updates
          </h3>
          <p className="text-green-100 mb-6">
            Subscribe for exclusive deals and product updates
          </p>
          
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
            <button className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;

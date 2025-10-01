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

  const partners = ['TCL', 'VU TV', 'Hisense'];

  const getPositionStyles = (position: string) => {
    const styles: Record<string, string> = {
      'left-top': 'absolute top-0 left-0 transform -translate-x-4 -translate-y-4',
      'left-middle': 'absolute top-1/2 left-0 transform -translate-x-8 -translate-y-1/2',
      'left-bottom': 'absolute bottom-0 left-0 transform -translate-x-4 translate-y-4',
      'right-top': 'absolute top-0 right-0 transform translate-x-4 -translate-y-4',
      'right-middle': 'absolute top-1/2 right-0 transform translate-x-8 -translate-y-1/2',
      'right-bottom': 'absolute bottom-0 right-0 transform translate-x-4 translate-y-4'
    };
    return styles[position] || '';
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
            {/* Central Image */}
            <div className="relative z-10 w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-2xl">
              <img 
                src="https://res.cloudinary.com/dhn6uszk0/image/upload/v1759298002/istockphoto-1209903143-612x612-removebg-preview_ducr7v.png" // Add your central image URL here
                alt="Why Choose Us"
                className="w-64 h-64 object-contain rounded-full"
                style={{ 
                  backgroundColor: '#f3f4f6', 
                  border: '2px dashed #d1d5db'
                }}
              />
              {/* Placeholder text when no image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
                Central Image
              </div>
            </div>

            {/* Floating Features */}
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index} 
                  className={`w-64 ${getPositionStyles(feature.position)} z-20`}
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Connecting Line */}
                  <div className={`absolute w-16 h-0.5 bg-gradient-to-r from-blue-300 to-transparent ${
                    feature.position.includes('left') 
                      ? 'right-0 top-1/2 transform translate-x-16 -translate-y-1/2' 
                      : 'left-0 top-1/2 transform -translate-x-16 -translate-y-1/2 rotate-180'
                  }`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Partner Brands - Simplified */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Authorized Dealer
          </h3>
          
          <div className="flex items-center justify-center space-x-12">
            {partners.map((partner, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <span className="text-lg font-bold text-gray-700">{partner}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Simple Newsletter */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Get Latest Updates
          </h3>
          <p className="text-blue-100 mb-6">
            Subscribe for exclusive deals and product updates
          </p>
          
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;

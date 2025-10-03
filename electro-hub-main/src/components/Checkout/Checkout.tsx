import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Phone, Mail, MapPin } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CheckoutProps {
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onBack }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    preferredTime: '',
    message: ''
  });

  const { items, getTotal } = useCart();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setFormSubmitted(true);
  };

  const total = getTotal();

  if (items.length === 0 && !formSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <button
            onClick={onBack}
            className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-colors"
            style={{ backgroundColor: '#179E42' }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button
              onClick={onBack}
              className="flex items-center hover:opacity-75 mr-4 transition-colors"
              style={{ color: '#179E42' }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Thank You!</h1>
          </div>

          {/* Confirmation */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your interest! Our team will contact you within 24 hours to discuss your requirements and provide personalized assistance.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-gray-700">Our sales representative will call you to understand your needs</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-gray-700">You'll receive a detailed quotation via email</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-gray-700">We'll arrange a convenient delivery and installation time</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <p className="text-green-800 font-medium">
                  📞 Need immediate assistance? Call us at: +91 98765 43210
                </p>
              </div>
              
              <button
                onClick={onBack}
                className="px-8 py-3 text-white rounded-lg font-semibold hover:opacity-90 transition-colors"
                style={{ backgroundColor: '#179E42' }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center hover:opacity-75 mr-4 transition-colors"
            style={{ color: '#179E42' }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Contact Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Get Personalized Assistance</h2>
              <p className="text-gray-600 mb-6">
                Fill in your details below and our team will contact you within 24 hours to discuss your requirements and provide the best pricing.
              </p>
              
              <form onSubmit={handleSubmitForm} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{ focusRingColor: '#179E42' }}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{ focusRingColor: '#179E42' }}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ focusRingColor: '#179E42' }}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Complete Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ focusRingColor: '#179E42' }}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{ focusRingColor: '#179E42' }}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{ focusRingColor: '#179E42' }}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{ focusRingColor: '#179E42' }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Contact Time
                  </label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ focusRingColor: '#179E42' }}
                  >
                    <option value="">Select preferred time</option>
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 7 PM)</option>
                    <option value="anytime">Anytime</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Any specific requirements or questions you have..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ focusRingColor: '#179E42' }}
                  />
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800 text-sm">
                    🔒 Your information is secure and will only be used to contact you regarding your inquiry.
                  </p>
                </div>
                
                <button
                  type="submit"
                  className="w-full text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-colors"
                  style={{ backgroundColor: '#179E42' }}
                >
                  Submit Details - Get Expert Assistance
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Selection</h2>
            
            <div className="space-y-4 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex space-x-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Estimated Total:</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>Installation:</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>Warranty:</span>
                <span className="text-green-600">Included</span>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                *Final pricing will be provided by our team based on your specific requirements.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

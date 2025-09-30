import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      location: 'Mumbai, Maharashtra',
      rating: 5,
      comment: 'Outstanding service and product quality! The 65" Samsung QLED I purchased exceeded all expectations. The delivery was prompt and the installation team was professional.',
      product: 'Samsung 65" QLED 4K Smart TV',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      location: 'Delhi, India',
      rating: 5,
      comment: 'The LG OLED TV is a game-changer! The picture quality is absolutely stunning. ElectroHub provided excellent customer service throughout the purchase process.',
      product: 'LG 55" OLED 4K Smart TV',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: 3,
      name: 'Amit Patel',
      location: 'Bangalore, Karnataka',
      rating: 4,
      comment: 'Great value for money! The Sony TV I bought has amazing features and the smart interface is very user-friendly. Highly recommend ElectroHub!',
      product: 'Sony 75" LED 4K Smart TV',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with ElectroHub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              {/* Quote Icon */}
              <div className="flex justify-center mb-4">
                <Quote className="w-10 h-10 text-blue-600" />
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${
                      index < testimonial.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 text-center mb-6 italic">
                "{testimonial.comment}"
              </p>

              {/* Customer Info */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{testimonial.location}</p>
                <p className="text-xs text-blue-600 font-medium">{testimonial.product}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">50,000+</div>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">4.8/5</div>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">99%</div>
            <p className="text-gray-600">Customer Satisfaction</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-600 mb-2">1000+</div>
            <p className="text-gray-600">5-Star Reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
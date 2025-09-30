import React from 'react';
import { Play } from 'lucide-react';

const Testimonials: React.FC = () => {
  const videoReviews = [
    {
      id: 1,
      title: 'TCL 65" QLED TV Review - Best Value for Money!',
      thumbnail: '', // YouTube thumbnail placeholder
      videoId: '', // YouTube video ID placeholder
      duration: '8:45',
      size: 'large' // Different sizes
    },
    {
      id: 2,
      title: 'VU TV Unboxing & Setup Experience',
      thumbnail: '',
      videoId: '',
      duration: '12:30',
      size: 'medium'
    },
    {
      id: 3,
      title: 'Hisense Laser TV - Cinema at Home',
      thumbnail: '',
      videoId: '',
      duration: '6:15',
      size: 'medium'
    },
    {
      id: 4,
      title: 'Customer Experience - 3 Months Later',
      thumbnail: '',
      videoId: '',
      duration: '4:20',
      size: 'small'
    },
    {
      id: 5,
      title: 'Installation Service Review',
      thumbnail: '',
      videoId: '',
      duration: '3:55',
      size: 'small'
    },
    {
      id: 6,
      title: 'Complete Purchase Journey Review',
      thumbnail: '',
      videoId: '',
      duration: '10:12',
      size: 'small'
    },
    {
      id: 7,
      title: 'After Sales Support Experience',
      thumbnail: '',
      videoId: '',
      duration: '5:30',
      size: 'small'
    },
    {
      id: 8,
      title: 'Product Quality Check Review',
      thumbnail: '',
      videoId: '',
      duration: '7:25',
      size: 'small'
    },
    {
      id: 9,
      title: 'Customer Service Team Review',
      thumbnail: '',
      videoId: '',
      duration: '6:18',
      size: 'small'
    }
  ];

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2 h-80';
      case 'medium':
        return 'col-span-1 row-span-1 h-40';
      case 'small':
        return 'col-span-1 row-span-1 h-32';
      default:
        return 'col-span-1 row-span-1 h-40';
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Customer Video Reviews
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch real customers share their experiences with our products and services
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-min">
          {videoReviews.map((video) => (
            <div 
              key={video.id} 
              className={`relative bg-gray-200 rounded-lg overflow-hidden cursor-pointer group hover:shadow-lg transition-all ${getSizeClasses(video.size)}`}
            >
              {/* Video Placeholder */}
              <div className="relative w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>

                {/* Placeholder Text */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-600 text-center opacity-50">
                  <div className="text-sm font-medium mb-1">YouTube Video</div>
                  <div className="text-xs">Placeholder</div>
                </div>
              </div>

              {/* Video Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                <h3 className={`text-white font-medium leading-tight ${
                  video.size === 'large' ? 'text-base' : 'text-sm'
                }`}>
                  {video.title}
                </h3>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Have a review to share? We'd love to feature your experience!
          </p>
          <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
            Submit Your Video Review
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

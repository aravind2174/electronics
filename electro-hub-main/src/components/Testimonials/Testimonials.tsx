import React from 'react';

const Testimonials: React.FC = () => {
  const videoReviews = [
    {
      id: 1,
      title: 'TCL 65" QLED TV Review - Best Value for Money!',
      videoId: 'IOZKsjrFTlA?si=BozSX3mMNctxDobM', // Add YouTube video ID here (e.g., 'dQw4w9WgXcQ')
      duration: '8:45',
      size: 'large'
    },
    {
      id: 2,
      title: 'VU TV Unboxing & Setup Experience',
      videoId: '', // Add YouTube video ID here
      duration: '12:30',
      size: 'medium'
    },
    {
      id: 3,
      title: 'Hisense Laser TV - Cinema at Home',
      videoId: '', // Add YouTube video ID here
      duration: '6:15',
      size: 'medium'
    },
    {
      id: 4,
      title: 'Customer Experience - 3 Months Later',
      videoId: '', // Add YouTube video ID here
      duration: '4:20',
      size: 'small'
    },
    {
      id: 5,
      title: 'Installation Service Review',
      videoId: '', // Add YouTube video ID here
      duration: '3:55',
      size: 'small'
    },
    {
      id: 6,
      title: 'Complete Purchase Journey Review',
      videoId: '', // Add YouTube video ID here
      duration: '10:12',
      size: 'small'
    },
    {
      id: 7,
      title: 'After Sales Support Experience',
      videoId: '', // Add YouTube video ID here
      duration: '5:30',
      size: 'small'
    },
    {
      id: 8,
      title: 'Product Quality Check Review',
      videoId: '', // Add YouTube video ID here
      duration: '7:25',
      size: 'small'
    },
    {
      id: 9,
      title: 'Customer Service Team Review',
      videoId: '', // Add YouTube video ID here
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
              className={`relative rounded-lg overflow-hidden group hover:shadow-lg transition-all ${getSizeClasses(video.size)}`}
            >
              {/* YouTube iframe or Placeholder */}
              {video.videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                /* Placeholder for when no video ID is provided */
                <div className="relative w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <div className="text-gray-600 text-center opacity-75">
                    <div className="text-sm font-medium mb-1">YouTube Video</div>
                    <div className="text-xs">Add video ID</div>
                  </div>
                  
                  {/* Duration Badge for placeholder */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
              )}

              {/* Video Info Overlay - Only show for placeholder */}
              {!video.videoId && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                  <h3 className={`text-white font-medium leading-tight ${
                    video.size === 'large' ? 'text-base' : 'text-sm'
                  }`}>
                    {video.title}
                  </h3>
                </div>
              )}

              {/* Title overlay for iframes (optional) */}
              {video.videoId && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className={`text-white font-medium leading-tight ${
                    video.size === 'large' ? 'text-sm' : 'text-xs'
                  }`}>
                    {video.title}
                  </h3>
                </div>
              )}
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

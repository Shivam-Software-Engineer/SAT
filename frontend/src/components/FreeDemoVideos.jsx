import { Play, ArrowRight, Clock, CheckCircle, ChevronRight, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const FreeDemoVideos = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [watchedVideos, setWatchedVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

   const navigate = useNavigate();

const user = useSelector((state) => state.Login.userDetail); // Redux se user
useEffect(() => {
  if (user == null) {
    // Get user from localStorage
    const localUser = JSON.parse(localStorage.getItem("registeredUser"));

    const hasEmailAndPhone = localUser?.email && localUser?.phone;

    if (!hasEmailAndPhone) {
      navigate('/', { state: { isRegisterOpen: true } }); // ✅ updated line
    }
  }
}, [user, navigate]);


  const videos = [
    {
      id: 1,
      title: 'Getting Started with Our Platform',
      duration: '8:32',
      category: 'introduction',
      thumbnail: '/thumbnails/intro.jpg',
      description: 'Learn how to navigate our platform and make the most of your learning experience.',
      watched: watchedVideos.includes(1),
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 2,
      title: 'Core Features Walkthrough',
      duration: '12:45',
      category: 'features',
      thumbnail: '/thumbnails/features.jpg',
      description: 'Discover the powerful features that will help you achieve your learning goals.',
      watched: watchedVideos.includes(2),
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 3,
      title: 'Advanced Techniques Tutorial',
      duration: '18:20',
      category: 'tutorials',
      thumbnail: '/thumbnails/tutorial.jpg',
      description: 'Master advanced techniques with our step-by-step tutorial guide.',
      watched: watchedVideos.includes(3),
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 4,
      title: 'Success Stories from Users',
      duration: '10:15',
      category: 'case-studies',
      thumbnail: '/thumbnails/case-study.jpg',
      description: 'Hear from our successful users and learn from their experiences.',
      watched: watchedVideos.includes(4),
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 5,
      title: 'Productivity Tips and Tricks',
      duration: '14:30',
      category: 'tutorials',
      thumbnail: '/thumbnails/productivity.jpg',
      description: 'Boost your productivity with these expert-approved techniques.',
      watched: watchedVideos.includes(5),
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 6,
      title: 'Platform Updates Overview',
      duration: '9:45',
      category: 'features',
      thumbnail: '/thumbnails/updates.jpg',
      description: 'Stay informed about the latest features and improvements.',
      watched: watchedVideos.includes(6),
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
  ];

  const categories = [
    { id: 'all', name: 'All Videos', count: videos.length },
    { id: 'introduction', name: 'Introduction', count: videos.filter(v => v.category === 'introduction').length },
    { id: 'features', name: 'Features', count: videos.filter(v => v.category === 'features').length },
    { id: 'tutorials', name: 'Tutorials', count: videos.filter(v => v.category === 'tutorials').length },
    { id: 'case-studies', name: 'Case Studies', count: videos.filter(v => v.category === 'case-studies').length },
  ];

  const filteredVideos = activeCategory === 'all'
    ? videos
    : videos.filter(video => video.category === activeCategory);

  const markAsWatched = (videoId) => {
    if (!watchedVideos.includes(videoId)) {
      setWatchedVideos([...watchedVideos, videoId]);
    }
    setSelectedVideo(videos.find(v => v.id === videoId));
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <header className="mb-12 text-center">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
            Free Resources
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Explore Our Demo Videos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our platform can help you achieve your goals through our collection of free demo videos.
          </p>
        </header>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-lg font-medium text-gray-500 mb-4">Browse by category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name}
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeCategory === category.id 
                    ? 'bg-blue-700 text-blue-100' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {activeCategory === 'all' ? 'All Videos' : categories.find(c => c.id === activeCategory)?.name}
              <span className="text-gray-500 text-lg ml-2">({filteredVideos.length})</span>
            </h2>
            <div className="text-sm text-gray-500 flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              {watchedVideos.length} watched
            </div>
          </div>

          {filteredVideos.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
              <div className="text-gray-400 mb-4">No videos found in this category</div>
              <button 
                onClick={() => setActiveCategory('all')}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto"
              >
                View all videos <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map(video => (
                <div
                  key={video.id}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-400 transition-all hover:shadow-lg group"
                >
                  {/* Thumbnail */}
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
                        {video.duration}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => markAsWatched(video.id)}
                        className="bg-white hover:bg-gray-100 text-blue-600 rounded-full p-4 transition-all shadow-lg transform group-hover:scale-110"
                      >
                        <Play className="h-6 w-6" fill="currentColor" />
                      </button>
                    </div>
                    {video.watched && (
                      <div className="absolute top-3 right-3 bg-green-500 rounded-full p-1 shadow-sm">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{video.title}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{video.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        {video.category.replace('-', ' ')}
                      </span>
                      <button
                        onClick={() => markAsWatched(video.id)}
                        className={`text-sm font-medium flex items-center ${
                          video.watched 
                            ? 'text-green-600' 
                            : 'text-blue-600 hover:text-blue-800'
                        }`}
                      >
                        {video.watched ? 'Watched' : 'Watch'}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-10 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to take your learning to the next level?</h2>
            <p className="text-blue-100 mb-6 text-lg">
              Unlock premium features, exclusive content, and personalized guidance with our Pro plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href='https://maxiwiselearning.com/' className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center">
                Upgrade Now <ArrowRight className="h-5 w-5 ml-2" />
              </a>
              
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl overflow-hidden">
            <div className="relative pt-[56.25%]">
              <iframe
                src={selectedVideo.url}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{selectedVideo.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    {selectedVideo.duration}
                  </div>
                </div>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  {selectedVideo.category.replace('-', ' ')}
                </span>
                <a 
                  href={selectedVideo.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                >
                  Open in YouTube <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeDemoVideos;
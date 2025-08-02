import { Play, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';

const DemoLectures = ({ setIsRegisterOpen }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const youtubeVideoId = "PmvNX8Aop-0";
  const featuredLecture = {
    title: "SAT Math: Algebra Fundamentals",
    instructor: "Dr. Sarah Johnson",
    duration: "45 minutes",
    thumbnail: "https://img.youtube.com/vi/PmvNX8Aop-0/maxresdefault.jpg",
    description: "Master essential algebra concepts that appear frequently on the SAT Math section."
  };

  const handlePlayVideo = () => setIsVideoPlaying(true);
  const handleCloseVideo = () => setIsVideoPlaying(false);

  return (
    <section id="demos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Free Demo Lecture</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Experience our teaching quality with this free sample lecture from our expert instructors.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform">
              <div className="relative">
                {!isVideoPlaying ? (
                  <>
                    <img 
                      src={featuredLecture.thumbnail} 
                      alt={featuredLecture.title}
                      className="w-full h-72 md:h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <button 
                        onClick={handlePlayVideo}
                        className="bg-white/80 rounded-full p-4 hover:bg-white transition-colors"
                        aria-label="Play video"
                      >
                        <Play className="h-12 w-12 text-black" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="relative pt-[56.25%]">
                    <div className="absolute inset-0 flex items-center justify-center bg-black rounded-t-xl">
                      <button 
                        onClick={handleCloseVideo}
                        className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
                        aria-label="Close video"
                      >
                        <X className="h-6 w-6 text-black" />
                      </button>
                      <iframe
                        className="absolute inset-0 w-full h-full rounded-t-xl"
                        src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="SAT Demo Lecture"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{featuredLecture.title}</h3>
                <p className="text-gray-700 mb-4 text-lg">{featuredLecture.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span className="text-base">{featuredLecture.instructor}</span>
                  {/* <span className="text-base">{featuredLecture.duration}</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => setIsRegisterOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all inline-flex items-center gap-2"
          >
            Access More Lectures <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DemoLectures;

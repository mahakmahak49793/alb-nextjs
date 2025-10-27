'use client';

import React, { useState } from 'react';
import { X, Maximize2 } from 'lucide-react';

interface Video {
  src: string;
  alt: string;
}

const videos: Video[] = [
  {
    src: 'https://alb-web-assets.s3.ap-south-1.amazonaws.com/acharyalavbhushan/testimonials/videos/1761370997416-throughremediesClientResult.mp4',
    alt: 'Video 1'
  },
  {
    src: 'https://alb-web-assets.s3.ap-south-1.amazonaws.com/acharyalavbhushan/testimonials/videos/1761372295454-ClientDreamJob.mp4',
    alt: 'Video 2'
  },
  {
    src: 'https://alb-web-assets.s3.ap-south-1.amazonaws.com/acharyalavbhushan/testimonials/videos/1761369826404-.mp4',
    alt: 'Video 3'
  },
  {
    src: 'https://alb-web-assets.s3.ap-south-1.amazonaws.com/acharyalavbhushan/testimonials/videos/1761370410364-FollowProblemSolve.mp4',
    alt: 'Video 4'
  },
  {
    src: 'https://alb-web-assets.s3.ap-south-1.amazonaws.com/acharyalavbhushan/testimonials/videos/1761370582994-RemediesClientProblemsolve.mp4',
    alt: 'Video 5'
  },
  {
    src: 'https://alb-web-assets.s3.ap-south-1.amazonaws.com/acharyalavbhushan/testimonials/videos/1761371741113-Remedies.mp4',
    alt: 'Video 6'
  },
  {
    src: 'https://alb-web-assets.s3.ap-south-1.amazonaws.com/acharyalavbhushan/testimonials/videos/1761370158559-Famousclient.mp4',
    alt: 'Video 7'
  },
  {
    src: 'https://alb-web-assets.s3.ap-south-1.amazonaws.com/acharyalavbhushan/testimonials/videos/1761370224847-FollowProblemSolve-.mp4',
    alt: 'Video 8'
  },
  {
    src: 'https://alb-web-assets.s3.ap-south-1.amazonaws.com/acharyalavbhushan/testimonials/videos/1761370107524-Predictionbest.mp4',
    alt: 'Video 9'
  },
  {
    src: 'https://alb-web-assets.s3.ap-south-1.amazonaws.com/acharyalavbhushan/testimonials/videos/1761370893488-1stSessionClient.mp4',
    alt: "Video 10"
  },
  {
    src: 'https://alb-web-assets.s3.ap-south-1.amazonaws.com/acharyalavbhushan/testimonials/videos/1761370045666-JobPromotionClients1.mp4',
    alt: "Video 11"
  },
  {
    src: 'https://alb-web-assets.s3.ap-south-1.amazonaws.com/acharyalavbhushan/testimonials/videos/1761370785858-Remedies-.mp4',
    alt: "Video 12"
  }
];

const HappyClient: React.FC = () => {
  const [zoomedVideo, setZoomedVideo] = useState<string | null>(null);

  const openZoom = (src: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setZoomedVideo(src);
    
    // Request fullscreen after a short delay to ensure video is rendered
    setTimeout(() => {
      const videoElement = document.getElementById('zoomed-video');
      if (videoElement) {
        if (videoElement.requestFullscreen) {
          videoElement.requestFullscreen();
        } else if ((videoElement as any).webkitRequestFullscreen) {
          (videoElement as any).webkitRequestFullscreen();
        } else if ((videoElement as any).mozRequestFullScreen) {
          (videoElement as any).mozRequestFullScreen();
        } else if ((videoElement as any).msRequestFullscreen) {
          (videoElement as any).msRequestFullscreen();
        }
      }
    }, 100);
  };

  const closeZoom = () => {
    // Exit fullscreen if currently in fullscreen
    if (document.fullscreenElement || 
        (document as any).webkitFullscreenElement || 
        (document as any).mozFullScreenElement || 
        (document as any).msFullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
    setZoomedVideo(null);
  };

  // Listen for fullscreen changes to close modal when user exits fullscreen
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && 
          !(document as any).webkitFullscreenElement && 
          !(document as any).mozFullScreenElement && 
          !(document as any).msFullscreenElement) {
        setZoomedVideo(null);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="bg-stone-50 pb-12 pt-4">
      <div className="container mx-auto px-4">
        {/* Testimonials Header */}
        <h2
          style={{ fontFamily: 'arial,sans-serif' }} 
          className="text-[36px] max-md:text-[28px] text-center font-extrabold tracking-tight mb-10"
        >
          <span className="text-[#980d0d]">Our</span>{' '}
          <span className="text-[#D4AF37]">Testimonials</span>
        </h2>

        {/* Video Scroll Section - Hidden in portrait mode when zoomed */}
        <div className={`relative max-w-7xl mx-auto w-full overflow-x-auto overflow-y-hidden whitespace-nowrap custom-zero-scrollbar transition-all duration-300 ${
          zoomedVideo ? 'max-md:hidden' : ''
        }`}>
          <div className="flex gap-3">
            {videos.map((vid, idx) => (
              <div key={idx} className="min-w-60 relative group">
                <video
                  controls
                  src={vid.src}
                  playsInline
                  className="w-full object-cover rounded-xl shadow-md border border-gray-300"
                >
                  Your browser does not support the video tag.
                </video>
                
                {/* Zoom Button */}
                <button
                  onClick={(e) => openZoom(vid.src, e)}
                  className="absolute top-2 right-2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Zoom video"
                >
                  <Maximize2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zoomed Video Modal */}
      {zoomedVideo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeZoom}
        >
          <button
            onClick={closeZoom}
            className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all z-10"
            aria-label="Close zoom"
          >
            <X size={28} />
          </button>
          
          <div 
            className="relative max-w-md w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              id="zoomed-video"
              controls
              autoPlay
              src={zoomedVideo}
              playsInline
              className="w-full h-auto rounded-lg shadow-2xl"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-zero-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .custom-zero-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HappyClient;
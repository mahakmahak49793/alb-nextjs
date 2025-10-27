'use client';

import { Video, Play, X, Pause } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';

const VideoContainer = () => {
  const [isWatchingVideo, setIsWatchingVideo] = useState(false);
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      
      // If exiting fullscreen, also close the video
      if (!document.fullscreenElement && isWatchingVideo) {
        handleCloseVideo();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, [isWatchingVideo]);

  // Lock orientation to portrait (without TypeScript errors)
  const lockOrientationToPortrait = async () => {
    try {
      const orientation: any = screen.orientation;
      if (orientation && orientation.lock) {
        await orientation.lock('portrait-primary').catch((err: any) => {
          console.log('Orientation lock failed:', err);
        });
      }
    } catch (error) {
      console.log('Orientation API not supported:', error);
    }
  };

  // Unlock orientation
  const unlockOrientation = () => {
    try {
      const orientation: any = screen.orientation;
      if (orientation && orientation.unlock) {
        orientation.unlock();
      }
    } catch (error) {
      console.log('Orientation unlock failed:', error);
    }
  };

  // Request fullscreen on container
  const requestFullscreen = (element: HTMLElement) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).webkitEnterFullscreen) {
      (element as any).webkitEnterFullscreen();
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen();
    }
  };

  // Exit fullscreen
  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  };

  const handleWatchVideo = async () => {
    if (videoRef.current && containerRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setIsWatchingVideo(true);

      // Check if mobile device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        // Request fullscreen on the container
        requestFullscreen(containerRef.current);
        
        // Lock to portrait orientation
        await lockOrientationToPortrait();
      }
    }
  };

  const handleCloseVideo = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset to beginning
      setIsPlaying(false);
      setIsWatchingVideo(false);
      
      // Exit fullscreen if active
      if (document.fullscreenElement) {
        exitFullscreen();
      }
      
      // Unlock orientation
      unlockOrientation();

      // Restart background video
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play();
        }
      }, 100);
    }
  };

  const handleVideoPauseToggle = () => {
    if (videoRef.current && isWatchingVideo) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVideoEnded = () => {
    if (isWatchingVideo) {
      // When watching video ends, close it and return to background mode
      handleCloseVideo();
    } else {
      // Background video should loop automatically (already has loop attribute)
      // This is just a safety fallback
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }
  };

  return (
    <div>
      {/* Video Background Section */}
      <section 
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden bg-black"
      >
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            className={`${
              isWatchingVideo 
                ? 'w-full h-auto object-contain' 
                : 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover'
            }`}
            style={{ 
              filter: isWatchingVideo ? 'brightness(1)' : 'brightness(0.9) contrast(1.1)',
              userSelect: 'none',
              maxWidth: '100%',
              maxHeight: '100%'
            }}
            onContextMenu={(e) => e.preventDefault()}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={handleVideoEnded}
          >
            <source src="https://gennextupload.s3.ap-south-1.amazonaws.com/acharyalavbhushan/hero-section/videos/1760697746006-videoacharayaji.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video Overlay - Hide when watching */}
          {!isWatchingVideo && (
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
          )}

          {/* Clickable Overlay for Pause/Play - Show when watching */}
          {isWatchingVideo && (
            <div 
              className="absolute inset-0 cursor-pointer z-10"
              onClick={handleVideoPauseToggle}
              onMouseEnter={() => setIsHoveringVideo(true)}
              onMouseLeave={() => setIsHoveringVideo(false)}
            >
              {/* Desktop Hover Controls & Mobile Paused State */}
              {(isHoveringVideo || !isPlaying) && (
                <div className="absolute hidden md:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm rounded-full p-6 transition-all hover:bg-black/70 hover:scale-110">
                  {!isPlaying ? (
                    <Play className="w-12 h-12 text-white" fill="white" />
                  ) : (
                    <Pause className="w-12 h-12 text-white" fill="white" />
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content Over Video - Hide when watching */}
        {!isWatchingVideo && (
          <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <h2 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-2xl"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Experience the <span className="text-yellow-400">Wisdom</span>
                </h2>
                <p 
                  className="text-lg sm:text-xl md:text-2xl font-bold text-white/90 drop-shadow-xl"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Meet Acharya Lavbhushan - Your Guide to Transformation
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-6">
                <Link 
                  href="/consultation" prefetch={true}
                  className="inline-flex items-center gap-3 bg-[#980d0d] hover:bg-[#790808] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-black text-lg sm:text-xl transition-all transform hover:scale-105 shadow-2xl border-2 border-red-500"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  <Video className="w-6 h-6" />
                  Book Consultation
                </Link>
                
                <button
                  onClick={handleWatchVideo}
                  className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl transition-all transform hover:scale-105 shadow-xl border-2 border-white/30"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  <Play className="w-6 h-6" fill="white" />
                  Watch Video
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Close Button - Show when watching */}
        {isWatchingVideo && (
          <button
            onClick={handleCloseVideo}
            className="absolute top-4 right-4 md:top-12 md:right-12 z-50 bg-black/80 hover:bg-black/90 text-white p-4 rounded-full transition-all transform hover:scale-110 backdrop-blur-sm shadow-2xl border-2 border-white/30"
            aria-label="Close video"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </section>
    </div>
  );
};

export default VideoContainer;

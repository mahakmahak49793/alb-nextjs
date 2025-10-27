'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination'; // Add this line
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

interface PodcastCard {
  id: number;
  title: string;
  subtitle: string;
  views: string;
  image: string;
  videoId: string;
}

const PodcastGridScrollCards: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const podcastData: PodcastCard[] = [
    {
      id: 1,
      title: 'Fix Your Mistakes Before its Too Late',
      subtitle: 'PODCAST WITH RADHIKA DUDEJA',
      views: 'WATCH NOW',
      image: 'https://img.youtube.com/vi/hOgzVK--_1E/maxresdefault.jpg',
      videoId: 'hOgzVK--_1E',
    },
    {
      id: 2,
      title: 'Air India Crash',
      subtitle: 'PODCAST WITH ANOOP JALOTA',
      views: 'WATCH NOW',
      image: 'https://img.youtube.com/vi/Qo0EDGOMX_M/maxresdefault.jpg',
      videoId: 'Qo0EDGOMX_M',
    },
    {
      id: 3,
      title: 'Podcast With Deepak Chaurasia',
      subtitle: 'EXCLUSIVE INTERVIEW',
      views: 'WATCH NOW',
      image: 'https://img.youtube.com/vi/5k35FvG7fPo/maxresdefault.jpg',
      videoId: '5k35FvG7fPo',
    },
    {
      id: 4,
      title: 'Bharti TV Podcast',
      subtitle: 'SPECIAL EPISODE',
      views: 'WATCH NOW',
      image: 'https://img.youtube.com/vi/jQjwi5aMWMQ/maxresdefault.jpg',
      videoId: 'jQjwi5aMWMQ',
    },
    {
      id: 5,
      title: 'Saadhna TV Podcast',
      subtitle: 'SPIRITUAL DISCUSSION',
      views: 'WATCH NOW',
      image: 'https://img.youtube.com/vi/5S5ldHbWGfk/maxresdefault.jpg',
      videoId: '5S5ldHbWGfk',
    },
    {
      id: 7,
      title: 'RealHit Videos Podcast',
      subtitle: 'TRENDING TALKS',
      views: 'WATCH NOW',
      image: 'https://img.youtube.com/vi/Qt_nlpHe0oU/maxresdefault.jpg',
      videoId: 'Qt_nlpHe0oU',
    },
    {
      id: 8,
      title: 'Podcast With Kuldeep Singhania',
      subtitle: 'BUSINESS INSIGHTS',
      views: 'WATCH NOW',
      image: 'https://img.youtube.com/vi/CSYPvs3RlkQ/maxresdefault.jpg',
      videoId: 'CSYPvs3RlkQ',
    },
    {
      id: 9,
      title: 'Podcast With Pooja Joshi',
      subtitle: 'INSPIRING STORIES',
      views: 'WATCH NOW',
      image: 'https://img.youtube.com/vi/E58fk38yky0/maxresdefault.jpg',
      videoId: 'E58fk38yky0',
    },
    {
      id: 10,
      title: 'Real Talk Podcast',
      subtitle: 'CANDID CONVERSATIONS',
      views: 'WATCH NOW',
      image: 'https://img.youtube.com/vi/bcIIzKMRdnE/maxresdefault.jpg',
      videoId: 'bcIIzKMRdnE',
    },
    {
      id: 11,
      title: 'Podcast With Raja Muraad',
      subtitle: 'EXCLUSIVE CHAT',
      views: 'WATCH NOW',
      image: 'https://img.youtube.com/vi/xWOJ5PNnWGU/maxresdefault.jpg',
      videoId: 'xWOJ5PNnWGU',
    },
    {
      id: 12,
      title: 'Podcast With Priya Singh',
      subtitle: 'FIRST FEMALE BODYBUILDER OF RAJASTHAN',
      views: 'WATCH NOW',
      image: 'https://img.youtube.com/vi/jOCZD4ifAmk/maxresdefault.jpg',
      videoId: 'jOCZD4ifAmk',
    },
    {
      id: 13,
      title: 'Ajit Singh Podcast',
      subtitle: 'IN-DEPTH INTERVIEW',
      views: 'WATCH NOW',
      image: 'https://img.youtube.com/vi/6ACYWELQMRY/maxresdefault.jpg',
      videoId: '6ACYWELQMRY',
    },
    {
      id: 14,
      title: 'Podcast With Rohit',
      subtitle: 'SPECIAL EPISODE',
      views: 'WATCH NOW',
      image: 'https://img.youtube.com/vi/CrNe90AZ9jE/maxresdefault.jpg',
      videoId: 'CrNe90AZ9jE',
    }
  ];

  const handleWatchClick = (videoId: string) => {
    setSelectedVideo(videoId);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="bg-gray-50 py-8 lg:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <h1
          style={{ fontFamily: 'arial,sans-serif' }}
          className="text-[36px] max-md:text-[28px] text-center font-extrabold tracking-tight mb-10"
        >
          <span className="text-primary">Explore </span>
          <span className="text-secondary">Podcast</span>
        </h1>

        {/* Swiper Section */}
        <div className="max-w-7xl mx-auto">
          <Swiper
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 12,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={podcastData.length > 3}
            centeredSlides={false}
            keyboard={{
              enabled: true,
            }}
            pagination={{    
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}             
            className="mySwiper podcast-swiper"
          >
            {podcastData.map((podcast) => (
              <SwiperSlide key={podcast.id}>
                <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  {/* Card Image with Overlay */}
                  <div className="relative h-48 sm:h-52 md:h-56 lg:h-64 overflow-hidden group flex-shrink-0">
                    <img
                      src={podcast.image}
                      alt={podcast.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    {/* Views Badge */}
                    <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 bg-black/80 backdrop-blur-sm text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">{podcast.views}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col flex-grow">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl line-clamp-1 font-bold text-gray-900 mb-2 sm:mb-3 flex-grow">
                      {podcast.title}
                    </h3>
                    <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm mb-3 sm:mb-4 uppercase tracking-wide font-medium">
                      {podcast.subtitle}
                    </p>
                    <button
                      onClick={() => handleWatchClick(podcast.videoId)}
                      className="w-full bg-gradient-to-r from-red-900 to-red-700 hover:from-red-800 hover:to-red-600 text-white font-semibold py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 md:px-6 rounded-lg text-xs sm:text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      Watch Episode
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[1001] flex items-center justify-center p-4"
          onClick={closeVideo}
        >
          <div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors text-4xl font-bold z-[1001] w-10 h-10 flex items-center justify-center"
              aria-label="Close video"
            >
              ×
            </button>
            <iframe
              className="w-full h-full rounded-xl shadow-2xl"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
      <style jsx global>{`
        .podcast-swiper .swiper-pagination-bullet {
          background-color: #cbd5e1;
          opacity: 1;
        }
        .podcast-swiper .swiper-pagination-bullet-active {
          background-color: #980d0d;
        }
        .podcast-swiper {
          padding-bottom: 50px !important;
        }
      `}</style>

    </div>
  );
};

export default PodcastGridScrollCards;

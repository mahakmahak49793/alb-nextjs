'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';

const InfoSlider = () => {
  return (
    <div className="w-full bg-white py-8 md:py-12 pb-12 md:pb-16">
      <h2 
          style={{ fontFamily: 'arial,sans-serif' }} 
          className="text-[36px] max-md:text-[28px] text-center font-extrabold tracking-tight mb-10"
        >
          
          <span className="text-[#D4AF37]">Other</span>{' '}
          <span className="text-[#980d0d]">Services</span>
        </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="mySwiper pb-12"
      >
        {/* Slide 1: Transform Your Life */}
        <SwiperSlide>
          <section className="w-full max-w-7xl mx-auto px-4">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-center">
                {/* Left - Content */}
                <div className="space-y-3 md:space-y-4 order-2 lg:order-1">
                  <h2
                    style={{ fontFamily: 'arial,sans-serif' ,lineHeight: '1.2' }} 
                    className="text-xl sm:text-2xl md:text-[36px] font-extrabold "
                  >
                    <span className="text-[#8B0000]">Transform Your Life</span>{" "}
                    <span className="text-[#D4AF37]">with a Personalized Report</span>
                  </h2>
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                    Unlock the secrets of your future, gain deep insights into your health, and receive 
                    powerful, personalized remedies — all in one comprehensive report. This unique 
                    life-changing guide is designed to help you make better decisions, improve your 
                    well-being, and bring clarity to your personal and professional life.
                  </p>
                  <p className="text-gray-800 text-sm sm:text-base md:text-lg font-semibold">
                    Don't miss this opportunity to transform your journey. Start today and take control of your
                    destiny!
                  </p>
                  <Link href="/reports">
                    <div className="pt-2 md:pt-3">
                      <button className="bg-[#8B0000] text-white text-base md:text-lg font-bold rounded-full px-6 md:px-8 py-2 md:py-3 shadow-lg hover:bg-[#A50000] transition-all duration-300 hover:scale-105">
                        Get Your Report
                      </button>
                    </div>
                  </Link>
                </div>
                {/* Right - Image */}
                <div className="flex justify-center order-1 lg:order-2">
                  <img
                    loading="lazy"
                    src="https://alb-web-assets.s3.ap-south-1.amazonaws.com/acharyalavbhushan/other-services/images/1761369060680-Servicesimage.webp"
                    alt="Personalized Life Report"
                    className="w-full max-w-[250px] sm:max-w-xs md:max-w-sm lg:max-w-md object-contain"
                  />
                </div>
              </div>
            </div>
          </section>
        </SwiperSlide>

        {/* Slide 2: Our Commitment to Purity */}
        <SwiperSlide>
          <section className="w-full max-w-7xl mx-auto px-4">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-center">
                {/* Left - Image */}
                <div className="flex justify-center order-1 lg:order-1">
                  <img 
                    loading="lazy"
                    src="https://alb-web-assets.s3.ap-south-1.amazonaws.com/acharyalavbhushan/other-services/images/1761368704933-gems.jpg"
                    alt="Colorful Gemstones - Purity & Authenticity"
                    className="w-full max-w-[250px] sm:max-w-xs md:max-w-sm lg:max-w-md object-contain rounded-t-3xl"
                  />
                </div>
                {/* Right - Content */}
                <div className="space-y-3 md:space-y-4 order-2 lg:order-2">
                  <h2
                    className="text-xl sm:text-2xl md:text-[36px] font-extrabold"
                    style={{ fontFamily: 'Arial, sans-serif',lineHeight: '1.2' }}
                  >
                    <span className="text-[#980d0d]">Our Commitment to</span>{" "}
                    <span className="text-[#D4AF37]">Purity</span>
                  </h2>
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                    Unlock the secrets of your future, gain deep insights into your health, and receive powerful, personalized remedies.
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                    We are committed to offering products that are 100% pure, natural, and ethically sourced. Every item is carefully selected, energetically cleansed, and tested for authenticity before it reaches you.
                  </p>
                  <div className="pt-2 md:pt-3">
                    <button 
                      onClick={() => window.open('https://lifechangingastro.com/collections/rudraksha')}
                      className="bg-[#980d0d] text-white text-base md:text-lg font-bold rounded-full px-6 md:px-8 py-2 md:py-3 shadow-lg hover:bg-[#A50000] transition-all duration-300 hover:scale-105"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SwiperSlide>

        {/* Slide 3: LearnEarnGrow Section */}
        <SwiperSlide>
          <section className="w-full max-w-7xl mx-auto px-4">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center">
                {/* Left - Image */}
                <div className="relative flex items-start justify-center overflow-hidden h-48 sm:h-56 md:h-64 lg:h-auto order-1 lg:order-1">
                  <img
                    loading="lazy"
                    src="https://alb-web-assets.s3.ap-south-1.amazonaws.com/acharyalavbhushan/other-services/images/1761367977585-achaarya.webp"
                    alt="Acharya Lavbhushan"
                    className="w-full max-w-[250px] sm:max-w-xs md:max-w-sm lg:max-w-md object-cover object-top rounded-t-3xl"
                  />
                </div>
                {/* Right - Content */}
                <div className="space-y-2 md:space-y-3 order-2 lg:order-2">
                  <h2
                    className="text-lg sm:text-xl md:text-[28px] lg:text-[32px] font-extrabold  "
                    style={{ fontFamily: 'Arial, sans-serif',lineHeight: '1.2'}}
                  >
                    <span className="text-black ">Learn Occult Science, </span>
                    <span className="text-[#8B0000]">Build Your Career </span>
                    <span className="text-black">with </span>
                    <span className="text-[#D4AF37]">Acharya Lavbhushan</span>
                  </h2>
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                    AstroVastuGurukull is your trusted platform for authentic Numerology, Astrology and Vastu guidance in India. Led by celebrity astrologer Acharya Lavbhushan, we offer expert horoscope analysis, Vastu consultations, and spiritual mentorship. Whether you're starting a new venture or seeking direction, our services empower you to Learn, Earn, and Grow.
                  </p>
                  <p className="text-gray-800 text-sm sm:text-base md:text-lg font-semibold">
                    Explore Our Courses And Join Today For Best Learning.
                  </p>
                  <div className="pt-2 md:pt-3">
                    <Link href="/consultation" prefetch={true}>
                      <button
                        className="bg-[#8B0000] hover:bg-[#A50000] text-white text-base md:text-lg font-bold rounded-full px-6 md:px-8 py-2 md:py-3 shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        Explore Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SwiperSlide>
      </Swiper>

      {/* Custom pagination styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #8B0000;
          opacity: 0.4;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #8B0000;
        }
        .swiper-pagination {
          bottom: 0 !important;
        }
        .mySwiper {
          padding-bottom: 50px !important;
        }
      `}</style>
    </div>
  );
};

export default InfoSlider;

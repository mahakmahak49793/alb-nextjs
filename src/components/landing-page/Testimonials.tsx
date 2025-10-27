'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
}

const Testimonials: React.FC = () => {
  // https://gennextupload.s3.ap-south-1.amazonaws.com/acharyalavbhushan/testimonials/videos/1760434977543-ClientDreamJob.mp4
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Rajiv Sharma",
      role: "Regular Customer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      text: "Amazing live chat with genuine astrologers. The insights provided were spot-on and helped me make important life decisions. The convenience of getting expert advice from home is unmatched."
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Regular Customer",
      image: "https://images.unsplash.com/photo-1611590027211-b954fd027b51?q=80&w=738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      text: "The astrology consultations have been incredibly insightful. I was amazed by the accuracy of the predictions and how well the astrologer understood my situation without me sharing too many details."
    },
    {
      id: 3,
      name: "Arjun Singh",
      role: "Regular Customer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      text: "Professional service with genuine care for the clients. The astrologers are knowledgeable and they provide practical solutions. I've been using their services for months and always leave satisfied."
    }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`text-2xl ${i < rating ? 'text-red-500' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="relative bg-white rounded-2xl pt-6 pb-6 px-6 shadow-lg w-full max-w-md mx-auto text-center">
      {/* Top section with image and stars */}
      <div className="flex items-center justify-between mb-4">
        {/* Circular Profile Image */}
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md bg-white flex-shrink-0">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Stars positioned at end */}
        <div className="flex">
          {renderStars(testimonial.rating)}
        </div>
      </div>

      {/* Customer Info */}
      <div className="mb-4 text-left">
        <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
        <p className="text-gray-600 text-sm">{testimonial.role}</p>
      </div>

      {/* Review Text */}
      <p className="text-justify text-gray-700 text-sm leading-relaxed">
        "{testimonial.text}"
      </p>
    </div>
  );

  return (
    <div className="bg-stone-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <h2 
          style={{ fontFamily: 'arial,sans-serif' }} 
          className="text-[36px] max-md:text-[28px] text-center font-extrabold tracking-tight mb-10"
        >
          <span className="text-[#D4AF37]">Customer</span>{' '}
          <span className="text-[#980d0d]">Reviews</span>
        </h2>

        {/* Swiper Section */}
        <div className="max-w-7xl mx-auto">
          <Swiper
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={testimonials.length > 1}
            centeredSlides={false}
            keyboard={{
              enabled: true,
            }}
            modules={[Autoplay]}
            className="mySwiper testimonial-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

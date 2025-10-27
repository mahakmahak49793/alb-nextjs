'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; 
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Users, Video, HandCoins, Sparkles } from 'lucide-react';

const data = [
    {
        icon: <Users size={32} />,
        title: 'Handpicked Astrologers',
        description: 'All astrologers are carefully selected by Acharya Ji, unlike other platforms where anyone can register.',
    },
    {
        icon: <HandCoins size={32} />,
        title: 'No Per-Minute Charges',
        description: 'We believe in giving the right remedies, not charging unnecessary fees.',
    },
    {
        icon: <Video size={32} />,
        title: 'Video Call Consultation',
        description: 'Consult face-to-face so you know whom you are talking to and can share openly.',
    },
    {
        icon: <Sparkles size={32} />,
        title: 'Unique Approach',
        description: 'Get best results with our proven and personalized guidance.',
    },
];

interface WhyChooseSliderProps {
    slidesPerView: number;
    navigation: boolean;
    pagination: boolean;
}

const WhyChooseSlider: React.FC<WhyChooseSliderProps> = ({ slidesPerView, navigation, pagination }) => {
    const router = useRouter();

    return (
        <>
            <Swiper
                slidesPerView={slidesPerView}
                grid={{ rows: 1 }}
                spaceBetween={15}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                keyboard={{ enabled: true }}
                pagination={pagination && { clickable: true }}
                navigation={navigation ? false : false}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {data?.map((value, index) => (
                    <SwiperSlide key={index}>
                        <div className='flex justify-center items-center cursor-pointer text-white'>
                            <div key={index} className='flex flex-col items-center pt-4 gap-1'>
                                <div className='bg-white text-amber-600 h-16 w-16 rounded-full flex items-center justify-center'>
                                    {value?.icon}
                                </div>
                                <div className='text-[16px] font-[600]'>{value?.title}</div>
                                <div className='text-[12px] text-center sm:px-8 px-4'>{value?.description}</div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default WhyChooseSlider;

import { Sparkles } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import WhyChooseSlider2 from './WhyChooseSlider2';

const Commitements = () => {
    //! For Swiper Slider 
    const [astrologerSlidesPerView, setAstrologerSlidesPerView] = useState(3);
    const [blogSlidesPerView, setBlogSlidesPerView] = useState(3);
    const [astrologerSlidesPerViewNavigation, setAstrologerSlidesPerViewNavigation] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 600) {
                setAstrologerSlidesPerView(1);
                setBlogSlidesPerView(1);
                setAstrologerSlidesPerViewNavigation(true);
            } else if (window.innerWidth <= 1000) {
                setAstrologerSlidesPerView(2);
                setBlogSlidesPerView(2);
                setAstrologerSlidesPerViewNavigation(true);
            } else if (window.innerWidth <= 1200) {
                setAstrologerSlidesPerView(4);
                setBlogSlidesPerView(3);
                setAstrologerSlidesPerViewNavigation(false);
            } else {
                setAstrologerSlidesPerView(4);
                setBlogSlidesPerView(3);
                setAstrologerSlidesPerViewNavigation(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <section 
                className="px-5 pt-8 md:pt-16  md:pb-4 bg-no-repeat bg-cover min-h-[600px] md:min-h-[450px] bg-right-top flex md:items-center items-end overflow-hidden" 
                style={{ 
                    backgroundImage: "url('https://alb-web-assets.s3.ap-south-1.amazonaws.com/acharyalavbhushan/celebrity-experience/images/1761374748672-acharyazodiac.webp')",
                    backgroundPosition: 'right top'
                }}
            >
                <article className="w-full space-y-6 md:space-y-6 flex flex-col text-white pb-8 md:pb-2">
                    <div className='flex flex-col items-center gap-3 md:gap-4 text-white'>
                        <div className='text-[24px] max-md:text-[20px] font-[600] text-center tracking-tight'>
                            Why We Started This Website
                        </div>
                        <div className='text-base max-md:text-[14px] font-[400] text-center max-w-3xl m-auto space-y-3'>
                            <p>
                                Under the guidance of Acharya Lavbhushan, this platform was created to make true astrology simple and accessible. After years of guiding people through Astrology, Numerology, and Vastu, Acharya Ji realized that many seekers struggle with confusion and misinformation.
                            </p>
                            <p>
                                Our mission is to offer authentic, research-based guidance — personalized reports, remedies, and consultations for everyone.
                            </p>
                        </div>
                    </div>

                    <div className=''>
                        <WhyChooseSlider2 
                            slidesPerView={astrologerSlidesPerView} 
                            navigation={astrologerSlidesPerViewNavigation} 
                            pagination={false} 
                        />
                    </div>
                </article>
            </section>
        </div>
    )
}

export default Commitements

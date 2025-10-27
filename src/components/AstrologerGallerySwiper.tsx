// components/AstrologerGallerySwiper.tsx
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Zoom from 'react-medium-image-zoom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'react-medium-image-zoom/dist/styles.css';

// TypeScript interfaces
interface MediaItem {
  type: 'image' | 'video';
  src: string;
}

interface AstrologerGallerySwiperProps {
  data: MediaItem[];
}

const AstrologerGallerySwiper: React.FC<AstrologerGallerySwiperProps> = ({ data }) => {
  const [slidesPerView, setSlidesPerView] = useState<number>(3);

  useEffect(() => {
    const handleResize = (): void => {
      const width = window.innerWidth;
      if (width <= 600) setSlidesPerView(2);
      else if (width <= 770) setSlidesPerView(3);
      else if (width <= 900) setSlidesPerView(4);
      else if (width <= 1000) setSlidesPerView(2);
      else if (width <= 1200) setSlidesPerView(3);
      else setSlidesPerView(3);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Swiper
      slidesPerView={slidesPerView}
      grid={{ rows: 1 }}
      spaceBetween={5}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      centeredSlides={true}
      keyboard={{ enabled: true }}
      className="mySwiper slot-swiper"
      pagination={false}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
    >
      {data?.map((value, index) => (
        <SwiperSlide key={index}>
          <div className='flex justify-center items-center cursor-pointer'>
            {value?.type === "image" ? (
              <Zoom>
                <img
                  alt={`Gallery item ${index + 1}`}
                  loading="lazy"
                  src={value.src}
                  className="rounded-md w-48 h-32 object-fill"
                />
              </Zoom>
            ) : (
              <video
                src={value.src}
                controls
                muted
                className="rounded-md min-w-48 h-32 object-contain"
              />
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AstrologerGallerySwiper;

// components/AvailableSlotTimeSwiper.tsx
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// TypeScript interfaces
interface SlotData {
  _id: string;
  fromTime: string;
  toTime: string;
  status: 'available' | 'booked' | 'blocked';
  duration: number;
}

interface SlotTimeByDuration {
  [key: string]: SlotData[];
}

interface SlotTimeData {
  SlotDate: string;
  SlotTimeByDuration: SlotTimeByDuration;
}

interface AvailableSlotTimeSwiperProps {
  data: SlotTimeData;
  duration_minutes?: string;
  selectedSlot: SlotData | null;
  handleSelect: (slot: SlotData) => void;
}

const AvailableSlotTimeSwiper: React.FC<AvailableSlotTimeSwiperProps> = ({ 
  data, 
  duration_minutes = '15min', 
  selectedSlot, 
  handleSelect 
}) => {
  const [slidesPerView, setSlidesPerView] = useState<number>(3);

  useEffect(() => {
    const handleResize = (): void => {
      const width = window.innerWidth;
      if (width <= 600) setSlidesPerView(3);
      else if (width <= 770) setSlidesPerView(5);
      else if (width <= 900) setSlidesPerView(6);
      else if (width <= 1200) setSlidesPerView(3);
      else setSlidesPerView(4);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSlotClick = (slot: SlotData): void => {
    const isAvailable = slot?.status === "available";
    if (isAvailable) {
      handleSelect(slot);
    }
  };

  const slots = data?.SlotTimeByDuration?.[duration_minutes] || [];

  return (
    <Swiper
      slidesPerView={slidesPerView}
      grid={{ rows: 1 }}
      spaceBetween={15}
      keyboard={{ enabled: true }}
      className="mySwiper slot-swiper"
      pagination={false}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
    >
      {slots.map((slot, idx) => {
        const isAvailable = slot?.status === "available";
        const isSelected = selectedSlot?._id === slot?._id;
        
        return (
          <SwiperSlide key={idx}>
            <div className='flex justify-center items-center cursor-pointer py-1.5'>
              <div
                onClick={() => handleSlotClick(slot)}
                className={`text-nowrap p-4 rounded-md shadow-md text-center font-medium text-sm transition ${
                  isAvailable
                    ? isSelected
                      ? "bg-[#26A040] text-white cursor-pointer"
                      : "bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {slot?.fromTime} - {slot?.toTime}
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default AvailableSlotTimeSwiper;

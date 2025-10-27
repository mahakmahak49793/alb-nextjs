import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const LearnEarnGrow: React.FC = () => {
  const router = useRouter();
  return (
    <section className="w-full bg-white py-8 lg:py-10 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="rounded-3xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left - Image */}
            <div className="relative flex items-center justify-center overflow-hidden h-64 lg:h-auto">
              <img
                src="https://lifechangingastro.com/cdn/shop/files/Screenshot_2025-05-29_at_2.57.27_PM.webp?v=1753550042&width=1200"
                alt="Acharya Lavbhushan"
                className="w-full h-full object-contain lg:object-cover rounded-tl-2xl lg:rounded-bl-2xl lg:rounded-tr-none"
              />
            </div>

            {/* Right - Content */}
            <div className="bg-white p-6 lg:px-10 lg:py-8 flex flex-col  justify-center lg:gap-y-8 space-y-4">
              <h2
                className="text-2xl md:text-[36px] font-extrabold leading-tight"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                <span className="text-black">Learn Occult Science,</span>{" "}
                <span className="text-[#8B0000]">Build Your Career</span>{" "}
                <span className="text-black">with</span>{" "}
                <span className="text-[#D4AF37]">Acharya Lavbhushan</span>
              </h2>

              <div className="space-y-3">
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  AstroVastuGurukull is your trusted platform for authentic Numerology, Astrology and Vastu guidance in
                  India. Led by celebrity astrologer Acharya Lavbhushan, we offer expert horoscope analysis,
                  Vastu consultations, and spiritual mentorship. Whether you're starting a new venture or
                  seeking direction, our services empower you to Learn, Earn, and Grow. Recognized among
                  the best astrologers in India, we help align energies for personal and professional success.
                </p>

                <p className="text-gray-800 text-sm md:text-base font-semibold">
                  Explore Our Courses And Join Today For Best Learning.
                </p>
              </div>
              <div className="pt-2">
                <Link href="/consultation" prefetch={true}>
                <button
                  className="bg-[#8B0000] hover:bg-[#A50000] text-white text-base md:text-lg font-bold rounded-full px-8 py-3 shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Explore Now
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnEarnGrow;
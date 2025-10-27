// components/TopIconsSection.tsx
import React from 'react';
import Link from 'next/link';

interface IconItem {
  id: number;
  src: string;
  alt: string;
  href: string;
  scale : number;
  OurPage ?: boolean;
}

const topIcons: IconItem[] = [
  // { id: 1, src: "/Reports.svg", alt: "Reports", href: "/reports",scale: 1.2, OurPage : true },
  { id: 5, src: "/Horoscope2.svg", alt: "Horoscope", href: "/horoscope" ,scale: 1.3 , OurPage : true },
  { id: 2, src: "/Free kundali.svg", alt: "Free Kundli", href: "/kundli", scale: 1.4, OurPage : true },
  { id: 3, src: "/Kundali Matching.svg", alt: "Kundli Matching", href: "/kundli-matching" , scale : 1.5, OurPage : true },
  { id: 4, src: "/Remedies2.svg", alt: "Remedies", href: "/book-puja",scale: 1.4, OurPage : true },
  
];

const TopIconsSection: React.FC = () => {
  return (
    <div className="pb-6 sm:pb-8 bg-gradient-to-b from-stone-50 via-stone-100 to-stone-50">
      <div className="container mx-auto px-4">
        <h2 
          style={{ fontFamily: 'arial,sans-serif' }} 
          className="text-[36px] max-md:text-[28px] text-center font-extrabold tracking-tight mb-10"
        >
          
          <span className="text-[#D4AF37]">Astro Tools</span>{' '}
          <span className="text-[#980d0d]">& Remedies</span>
        </h2>
        <div className="relative">
          {/* Horizontally Scrollable Container */}
          <div className="overflow-x-auto scrollbar-hide lg:overflow-visible">
            <div className="flex gap-4 sm:gap-6 lg:gap-8 pb-4 min-w-max px-2 lg:min-w-0 lg:justify-center">
              {topIcons.map((icon) => (
                <Link
                  key={icon.id}
                  prefetch={true}
                  href={icon.href}
                  target={`${icon.OurPage ? "_self" : "_blank"}`}
                  rel="noopener noreferrer"
                  className="flex flex-col items-center flex-shrink-0 group"
                >
                  {/* Icon Container */}
                  <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 bg-white rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-300 flex items-center justify-center mb-3 border border-gray-100 group-hover:scale-105 overflow-hidden">
                    <img 
                      src={icon.src} 
                      alt={icon.alt}
                      className="w-[120%] h-[120%] object-contain scale-110"
                      style={{
                        filter: 'none',
                        transform: `scale(${icon.scale})`
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallbackDiv = document.createElement('div');
                        fallbackDiv.className = 'text-2xl sm:text-3xl lg:text-4xl';
                        fallbackDiv.textContent = '📊';
                        target.parentElement?.appendChild(fallbackDiv);
                      }}
                    />
                  </div>
                  
                  {/* Icon Label */}
                  <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center max-w-[100px] sm:max-w-[110px] leading-snug group-hover:text-orange-600 transition-colors">
                    {icon.alt}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Scroll Indicator Gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-stone-50 to-transparent pointer-events-none lg:hidden"></div>
        </div>
      </div>
    </div>
  );
};

export default TopIconsSection;

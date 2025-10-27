import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const Astrologers = () => {
  const [astrologers, setAstrologers] = useState<any>({
    celebrity: [],
    risingStars: [],
    topAstrologers: []
  });
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  const sections = [
    { key: 'celebrity', title: 'Celebrity Astrologers', data: astrologers.celebrity },
    { key: 'topAstrologers', title: 'Top Astrologers', data: astrologers.topAstrologers },
    { key: 'risingStars', title: 'Rising Stars', data: astrologers.risingStars }
  ];

  // Add this helper function before or inside your component
const prioritizeAstrologer = (astrologers: any[], priorityName: string) => {
  // Find the priority astrologer
  const priorityAstrologer = astrologers.find(
    (a: any) => a.astrologerName === priorityName
  );
  
  // If found, filter out and put at beginning
  if (priorityAstrologer) {
    const others = astrologers.filter(
      (a: any) => a.astrologerName !== priorityName
    );
    return [priorityAstrologer, ...others];
  }
  
  // If not found, return original array
  return astrologers;
};

useEffect(() => {
  async function loadAstrologers() {
    setLoading(true);
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/astrologer/astrologer_filter?limit=100`);
    const response = await data.json();
    if (data && response.results) {
      const celebrity = response.results.filter((a: any) => a.title === 'Celebrity').slice(0, 6);
      const risingStars = response.results.filter((a: any) => a.title === 'Rising Star').slice(0, 6);
      const topAstrologers = response.results.filter((a: any) => a.title === 'Top Astrologer' || a.title === '').slice(0, 6);
      
      // Prioritize "Acharya Lavbhushan" in each category
      const priorityName = "Acharya Lavbhushan";
      
      setAstrologers({
        celebrity: prioritizeAstrologer(celebrity, priorityName),
        risingStars: prioritizeAstrologer(risingStars, priorityName),
        topAstrologers: prioritizeAstrologer(topAstrologers, priorityName)
      });
    }
    setLoading(false);
  }

  loadAstrologers();
}, []);

  // Auto-slide effect
  useEffect(() => {
    if (!loading) {
      autoSlideRef.current = setInterval(() => {
        setCurrentSection((prev) => (prev + 1) % 3);
      }, 4000);
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [loading]);

  // Reset auto-slide timer on manual change
  const resetAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
    autoSlideRef.current = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % 3);
    }, 4000);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSection < 2) {
      setCurrentSection(currentSection + 1);
      resetAutoSlide();
    }
    if (isRightSwipe && currentSection > 0) {
      setCurrentSection(currentSection - 1);
      resetAutoSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const getMinPrice = (astrologer : any) => {
    let minPrice = Infinity;
    if ( astrologer?.consultationPrices) {
      astrologer?.consultationPrices.map((price:any) => {
        if(price.price !== 5)
        minPrice = Math.min(price.price , minPrice)
      })
    }    
    if(minPrice !== Infinity)
    return minPrice;
  return 1000;
  }


const AstrologerCard = ({ astrologer }: { astrologer: any }) => (
  <Link 
        prefetch={true}
        href={`/astrologer/details?name=${astrologer.astrologerName}&id=${astrologer._id}`}
        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
      >
        {/* Golden Background Section with Profile Image */}
        <div className="relative flex items-center justify-center w-full bg-gradient-to-b from-yellow-200 via-amber-100 to-white pt-6 pb-4">
          <div className="relative w-32 h-32">
            <div className="w-full h-full rounded-full overflow-hidden bg-white">
              <img
                src={`${process.env.NEXT_PUBLIC_PREFIX_IMAGE_URL}${astrologer.profileImage}`}
                alt={astrologer.astrologerName}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
  
        {/* Content Area - White Background */}
        <div className="flex flex-col items-start gap-1 w-full flex-1 p-4 pt-3">
          {/* Name */}
          <h3 className="text-sm sm:text-base font-bold text-gray-900 capitalize truncate w-full flex-shrink-0">
            {astrologer.astrologerName}
          </h3>
  
          {/* Rating and Experience */}
          <div className="flex items-center justify-between w-full flex-shrink-0">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className="text-yellow-400 text-sm">★</span>
              ))}
            </div>
            <span className="text-xs text-gray-600 whitespace-nowrap">
              {astrologer.experience}+ yrs
            </span>
          </div>
  
          {/* Consultations Count */}
          <div className="flex items-center gap-1.5 w-full flex-shrink-0">
            <svg className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-xs text-gray-500">
              2500+ Consultations
            </span>
          </div>
  
          {/* Language */}
          <div className="flex items-center gap-1.5 text-gray-400 w-full flex-shrink-0">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
            </svg>
            <span className="text-xs truncate">
              {astrologer.language?.slice(0, 2).join(', ') || 'English'}
            </span>
            {astrologer.language?.length > 2 && (
              <span className="text-gray-400 text-xs">+{astrologer.language.length - 2}</span>
            )}
          </div>
  
          {/* Spacer - Pushes price to bottom */}
          <div className="flex-1"></div>
  
          {/* Price and Book Now - Responsive layout */}
          <div className="flex items-center justify-between gap-3 pt-2 mt-1 border-t border-gray-100 w-full flex-shrink-0">
            {/* Price - Only visible on sm and above */}
            <span className="hidden sm:block text-xl font-bold text-red-700 whitespace-nowrap">
              ₹{getMinPrice(astrologer).toLocaleString('en-IN') || '5'}
            </span>
            
            {/* Book Now Button - Full width on mobile, auto on desktop */}
            <button className="bg-red-700 hover:bg-red-800 text-white px-4 py-1.5 rounded-lg font-semibold text-xs transition-colors duration-200 shadow-sm whitespace-nowrap w-full sm:w-auto">
              {/* Mobile: Show "Pay ₹price" */}
              <span className="sm:hidden">
                Pay ₹{getMinPrice(astrologer).toLocaleString('en-IN') || '5'}
              </span>
              {/* Desktop: Show "Book Now" */}
              <span className="hidden sm:inline">
                Book Now
              </span>
            </button>
          </div>
        </div>
      </Link>
);




  return (
    <div className="bg-gradient-to-b from-orange-50 to-white">
      <section className="py-8 sm:py-12 ">
        <div className="container mx-auto px-1 xs:px-4">
          {/* Section Header */}
          <div className="text-center mb-4 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black pb-2  sm:pb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
              <span className="text-[#8B0000]">
                {currentSection === 0 ? 'Celebrity ' : currentSection === 2 ? 'Rising ' : 'Top '}
              </span>
              <span className="text-[#D4AF37]">
                {currentSection === 0 ? 'Astrologers' : currentSection === 2 ? 'Stars' : 'Astrologers'}
              </span>
            </h2>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
            </div>
          ) : (
            <div className="xl:mx-5">
              {/* Carousel Container */}
              <div 
                className="overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div 
                  className="flex transition-transform m-auto duration-500 ease-in-out py-2"
                  style={{ transform: `translateX(-${currentSection * 100}%)` }}
                >
                  {sections.map((section, index) => (
                    <div key={section.key} className="min-w-full ">
                      <div className="  lg:hidden grid grid-cols-2  lg:grid-cols-4 gap-1 xs:gap-4 md:gap-6">
                        {section.data.slice(0,4).map((astrologer: any) => (
                          <AstrologerCard key={astrologer._id} astrologer={astrologer} />
                        ))}
                      </div>
                      <div className="hidden  lg:grid grid-cols-5 gap-1 xs:gap-4 md:gap-6">
                        {section.data.slice(0,5).map((astrologer: any) => (
                          <AstrologerCard key={astrologer._id} astrologer={astrologer} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {sections.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSection(index);
                      resetAutoSlide();
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentSection === index 
                        ? 'bg-red-700 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to ${sections[index].title}`}
                  />
                ))}
              </div>

              {/* View All Button - Only on last section */}
                <div className="text-center mt-8 sm:mt-12">
                  <Link
                    prefetch={true}
                    href="/consultation"
                    className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    View All Astrologers
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Astrologers;
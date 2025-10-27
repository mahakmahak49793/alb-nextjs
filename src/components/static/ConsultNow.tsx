'use client';

import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ConsultNow = () => {
  const pathname = usePathname();

  // List of routes where this component should be hidden
  const excludedPaths = [
    '/astrologer/details',
    '/my-order',
    '/consultation',
    '/life-changing-report',
    '/life-journey-report',
    '/kundali-matching-report',
    '/love-report',
    '/kundli-matching-report',
    '/navratri-report',
  ];

  // Check if current path matches any excluded paths
  const isExcluded = excludedPaths.some(path => 
    pathname?.startsWith(path)
  );

  // Don't render if on excluded path
  if (isExcluded) {
    return null;
  }

  return (
    <div className="fixed z-50 bottom-0 w-full max-w-[1700px] left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg text-gray-800 p-2">
      <div className="max-w-7xl m-auto flex items-center gap-10">
        {/* Marquee Text */}
        <div className="overflow-hidden flex-1">
          <div className="whitespace-nowrap animate-marquee text-lg font-semibold text-gray-700">
            Get Consultancy from India&apos;s best Astrologer. &nbsp; Get Consultancy from India&apos;s best Astrologer. &nbsp; Get Consultancy from India&apos;s best Astrologer.
            Get Consultancy from India&apos;s best Astrologer. &nbsp; Get Consultancy from India&apos;s best Astrologer. &nbsp; Get Consultancy from India&apos;s best Astrologer.
            Get Consultancy from India&apos;s best Astrologer. &nbsp; Get Consultancy from India&apos;s best Astrologer. &nbsp; Get Consultancy from India&apos;s best Astrologer.
          </div>
        </div>

        {/* Consult Now Button */}
        <Link 
          href="/consultation" 
          className="place-self-start bg-gradient-to-r from-primary to-primary/90 backdrop-blur-md text-lg border-2 rounded-full flex items-center justify-center gap-3 px-4 py-1 border-primary/20 shadow-lg shadow-primary/30 relative overflow-hidden hover:scale-105 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent pointer-events-none rounded-full" />
          {/* <Sparkles className="w-5 h-5 text-white relative z-10 animate-pulse" /> */}
          <p className="relative z-10 font-bold text-white">
            Consult <span className="font-extrabold">Now</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ConsultNow;

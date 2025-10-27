import Link from "next/link";

export default function AstrologyHero() {
  return (
    <div
      className="relative md:min-h-[calc(100vh-50px)] flex flex-col md:flex-row items-center justify-center md:px-10 md:py-10 overflow-hidden"
      style={{
        backgroundImage: "url('/bg-pattern.svg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: '#6e1317',
      }}
    >
            {/* Smaller image below content for mobile/tablet */}
      <div className="md:hidden relative w-full  py-6 pt-4 px-4" style={{
        backgroundColor: '#6e1317'
      }}>
        <div className="max-w-md mx-auto rounded-xl overflow-hidden shadow-2xl">
          <img
            src="https://alb-web-assets.s3.ap-south-1.amazonaws.com/acharyalavbhushan/hero-section/images/1761367752901-achaarya.webp"
            alt="Acharya Lavbhushan"
            className="w-full h-auto object-cover"
            style={{ 
              filter: 'brightness(1.1) contrast(1.05)',
            }}
          />
        </div>
      </div>

      {/* Text content at top for mobile/tablet with gradient background */}
      <div className="md:hidden w-full px-4 pb-4" style={{
        backgroundColor: '#6e1317'
      }}>
        <div className="container mx-auto">
          <div className="text-center space-y-3">
            {/* Heading */}
            <h1 className="text-2xl xxxs:text-3xl xs:text-4xl sm:text-5xl font-bold leading-tight">
              <span className="text-white">Get one to one</span>
              <br />
              <span className="text-amber-400">Consultation</span>
            </h1>
            
            {/* Subheading */}
            <div className="text-base xxxs:text-lg xs:text-xl sm:text-2xl font-semibold text-amber-100 leading-tight">
              From Acharya Lavbhushan
            </div>
            
            {/* Description */}
            <div className="text-xs xxxs:text-sm xs:text-base sm:text-lg font-medium leading-relaxed text-white/90 max-w-md mx-auto">
              20 Lakh+ Lives Transformed | 10+ Years Experience | India's Most Trusted Astrologer, Numerologist &amp; Vastu Expert.
            </div>
            
            {/* Button */}
            <div className="pt-2">
              <Link href={"/consultation"} prefetch={true}>
                <button
                  className="bg-amber-400 text-gray-900 font-bold py-3 px-10 xxxs:py-3.5 xxxs:px-12 xs:py-4 xs:px-14 rounded-full shadow-xl hover:bg-amber-300 transition-all hover:scale-105 text-sm xxxs:text-base xs:text-lg"
                  aria-label="Book Now"
                >
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>


      {/* Left-side astrology image with cloud border on right side - desktop only */}
      <div className="hidden md:block absolute left-0 bottom-0 top-0 z-0 w-[45%]">
        <img
          src="https://alb-web-assets.s3.ap-south-1.amazonaws.com/acharyalavbhushan/hero-section/images/1761367752901-achaarya.webp"
          alt="Acharya Lavbhushan"
          className="object-cover h-full w-full"
          style={{ 
            clipPath: "polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)",
            opacity: 0.88 
          }}
        />
      </div>

      {/* Content section - shifted more to right - desktop only */}
      <div className="hidden md:flex z-10 w-3/5 flex-col items-start ml-[55%]">
        <h1 className="text-5xl font-bold text-white mb-5">
          Get one to one <span className="text-amber-400">Consultation</span>
        </h1>
        <div className="text-2xl font-semibold mb-5 text-white">From Acharya Lavbhushan</div>
        <div className="mb-8 text-lg font-medium leading-relaxed tracking-wide text-white max-w-lg opacity-95">
          20 Lakh+ Lives Transformed | 10+ Years Experience | India's Most Trusted Astrologer,
          Numerologist &amp; Vastu Expert.
        </div>
        <Link href={"/consultation"} prefetch={true}>
          <button
            className="bg-amber-400 text-gray-900 font-bold py-3 px-10 rounded-full shadow-lg hover:bg-amber-300 transition"
            aria-label="Book Now"
          >
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
}
// import Link from "next/link";

// export default function AstrologyHero() {
//   return (
//     <div
//       className="relative md:min-h-[calc(100vh-50px)] flex flex-col md:flex-row items-center justify-center md:px-10 md:py-10 overflow-hidden"
//       style={{
//         backgroundImage: "url('/bg-pattern.svg')",
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: 'center',
//         backgroundColor: '#6e1317',
//       }}
//     >
//       {/* Background image for mobile/tablet screens - showing full natural image */}
//       <div className="md:hidden relative w-full">
//         <img
//           src="https://lifechangingastro.com/cdn/shop/files/Screenshot_2025-05-29_at_2.57.27_PM.webp?v=1753550042&width=1200"
//           alt="Acharya Lavbhushan"
//           className="w-full h-auto object-cover"
//           style={{ 
//             filter: 'brightness(1.1) contrast(1.05)',
//           }}
//         />
        
//         {/* Overlay content positioned with 40% spacing from top */}
//         <div className="absolute inset-0" style={{ top: '40%' }}>
//           <div className="container mx-auto px-2 xxxs:px-3 h-full">
//             <div className="text-center space-y-1 xxxs:space-y-2">
//               {/* Heading - Further reduced for very small screens */}
//               <h1 className="text-xl xxxs:text-2xl xs:text-3xl sm:text-4xl font-bold leading-tight">
//                 <span className="text-[#8B0000]">Get a 1 to 1</span>
//                 <br />
//                 <span className="text-[#FFD700]">Consultation</span>
//               </h1>
              
//               {/* Subheading - Reduced for very small screens */}
//               <div className="text-sm xxxs:text-base xs:text-lg sm:text-xl font-semibold text-[#8B0000] leading-tight">
//                 From Acharya Lavbhushan
//               </div>
              
//               {/* Description - Significantly reduced for very small screens */}
//               <div className="text-[10px] xxxs:text-xs xs:text-sm sm:text-base font-bold leading-tight xxxs:leading-snug text-[#8B0000] max-w-[280px] xxxs:max-w-sm mx-auto px-1 xxxs:px-2">
//                 20 Lakh+ Lives Transformed | 10+ Years Experience | India's Most Trusted Astrologer, Numerologist &amp; Vastu Expert.
//               </div>
              
//               {/* Button - Adjusted for very small screens */}
//               <div className="pt-1 xxxs:pt-2">
//                 <Link href={"/consultation"} prefetch={true}>
//                   <button
//                     className="bg-amber-400 text-gray-900 font-bold py-1.5 px-6 xxxs:py-2 xxxs:px-8 xs:py-3 xs:px-10 rounded-full shadow-lg hover:bg-amber-300 transition text-xs xxxs:text-sm xs:text-base"
//                     aria-label="Book Now"
//                   >
//                     Book Now
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Left-side astrology image with cloud border on right side - desktop only */}
//       <div className="hidden md:block absolute left-0 bottom-0 top-0 z-0 w-[45%]">
//         <img
//           src="https://lifechangingastro.com/cdn/shop/files/Screenshot_2025-05-29_at_2.57.27_PM.webp?v=1753550042&width=1200"
//           alt="Acharya Lavbhushan"
//           className="object-cover h-full w-full"
//           style={{ 
//             clipPath: "polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)",
//             opacity: 0.88 
//           }}
//         />
//       </div>

//       {/* Content section - shifted more to right - desktop only */}
//       <div className="hidden md:flex z-10 w-3/5 flex-col items-start ml-[55%]">
//         <h1 className="text-5xl font-bold text-white mb-5">
//           Get a 1 to 1 <span className="text-amber-400">Consultation</span>
//         </h1>
//         <div className="text-2xl font-semibold mb-5 text-white">From Acharya Lavbhushan</div>
//         <div className="mb-8 text-lg font-medium leading-relaxed tracking-wide text-white max-w-lg opacity-95">
//           20 Lakh+ Lives Transformed | 10+ Years Experience | India's Most Trusted Astrologer,
//           Numerologist &amp; Vastu Expert.
//         </div>
//         <Link href={"/consultation"} prefetch={true}>
//           <button
//             className="bg-amber-400 text-gray-900 font-bold py-3 px-10 rounded-full shadow-lg hover:bg-amber-300 transition"
//             aria-label="Book Now"
//           >
//             Book Now
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }

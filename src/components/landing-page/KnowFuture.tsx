import React from 'react'

const KnowFuture = () => {
  return (
    <div>
      {/* Transform Your Life Section with White Background */}
      <section className="w-full max-w-7xl mx-auto bg-white py-12 px-4">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left - Content */}
            <div className="space-y-4 order-2 lg:order-1">
              <h2
                style={{ fontFamily: 'arial,sans-serif' }} 
          className=" text-2xl sm:text-[36px] md:text-[36px]  -translate-y-2 font-extrabold leading-tight"
              >
                <span className="text-[#8B0000]">Transform Your Life</span>{" "}
                <span className="text-[#D4AF37]">with a Personalized Report</span>
              </h2>
              
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Unlock the secrets of your future, gain deep insights into your health, and receive 
                powerful, personalized remedies — all in one comprehensive report. This unique 
                life-changing guide is designed to help you make better decisions, improve your 
                well-being, and bring clarity to your personal and professional life.
              </p>

              <p className="text-gray-800 text-base md:text-lg font-semibold">
                Don't miss this opportunity to transform your journey. Start today and take control of your
                destiny!
              </p>

              <div className="pt-3">
                <button
                  onClick={() => window.open('https://lifechangingreport.com/', '_blank')}
                  className="bg-[#8B0000] text-white text-lg font-bold rounded-full px-8 py-3 shadow-lg hover:bg-[#A50000] transition-all duration-300 hover:scale-105"
                >
                  Get Your Report
                </button>
              </div>
            </div>

            {/* Right - Image */}
            <div className="flex justify-center order-1 lg:order-2">
              <img
                loading="lazy"
                src="/knowfuture.jpg"
                alt="Personalized Life Report"
                className="w-full max-w-sm lg:max-w-md object-contain"
              />
            </div>
          </div>
        </div>
      </section>        
    </div>
  )
}

export default KnowFuture

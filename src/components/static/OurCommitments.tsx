import React from 'react'

const OurCommitments = () => {
    return (
        <section className="bg-white pt-12 px-5 md:px-20 mb-20">
            <div className="flex flex-col-reverse md:flex-row-reverse gap-x-10 gap-y-5 mb-4 items-center">
                <div className=" md:w-1/2 md:text-left ">
                    {/* Updated heading section to match the image */}
                    <div className=" mb-12">
                        <h2 className="text-2xl xxs:text-[36px] xs:text-4xl md:text-[36px] lg:text-[36px] font-black leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
                            <div className="text-[#980d0d] mb-2">Our Commitment to <span className="text-[#D4AF37]">Purity</span></div>
                        </h2>
                    </div>
                    <p style={{ fontFamily: 'sans-serif' }} className="text-gray-700 text-center mx-6 xxxs:mx-10 md:mx-0  md:text-left text-lg font-medium mb-6">Unlock the secrets of your future, gain deep insights into your health, and receive powerful, personalized remedies.</p>

                    <div className="text-center md:text-left">
                        <p className="text-gray-600 text-base leading-relaxed text-justify  hidden md:flex">We are committed to offering products that are 100% pure, natural, and ethically sourced. Every item is carefully selected, energetically cleansed, and tested for authenticity before it reaches you.</p>

                        <button onClick={() => window.open('https://lifechangingastro.com/collections/rudraksha')} className="bg-[#980d0d] backdrop-blur-md md:mt-10 m-auto md:m-0 text-lg border rounded-full flex items-center justify-center gap-5 px-5 pt-1.5 pb-1 border-primary shadow-lg shadow-primary/30 relative overflow-hidden">
                            <div className="absolute top-0 left-0 bg-gradient-to-br from-white/60 via-white/10 to-transparent pointer-events-none rounded-xl" />
                            <p className="relative text-white  z-10">Shop Now</p>
                        </button>
                    </div>
                </div>

                <div className=" md:w-1/2 flex justify-center">
                    <img loading="lazy" src="/gems.jpg" alt="Colorful Gemstones - Purity & Authenticity" className="w-full max-w-sm md:max-w-md rounded-t-3xl object-contain" />
                </div>
            </div>
        </section>
    )
}

export default OurCommitments
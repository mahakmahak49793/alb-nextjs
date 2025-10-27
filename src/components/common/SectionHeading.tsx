import React from 'react';

interface SectionHeadingProps {
    tag?: string;
    tagBg?: string;
    tagColor?: string;
    title?: string;
    highlight?: string;
    subtitle?: string;
    align?: 'center' | 'left';
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ 
    tag = '', 
    tagBg = '#fceee0', 
    tagColor = '#b75b0b', 
    title = '', 
    highlight = '', 
    subtitle = '', 
    align = 'center' 
}) => {
    const alignment = align === 'left' ? 'text-left items-start' : 'text-center items-center';

    return (
        <div className={`flex flex-col mb-6 ${alignment}`}>
            {tag && (
                <div 
                    className="inline-block px-4  translate-y-1 rounded-full text-xs font-semibold tracking-widest uppercase"
                >
                    {tag}
                </div>
            )}

            <h2 style={{fontFamily : 'arial,sans-serif'}} className="text-[36px] max-md:text-[24px] font-extrabold tracking-tight text-[#980d0d] leading-snug">
                {title} {highlight && <span className=" text-[#D4AF37]">{highlight}</span>}
            </h2>

            {subtitle && (
                <p className="text-[#5f5f5f] text-sm sm:text-base font-medium max-w-xl">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionHeading;

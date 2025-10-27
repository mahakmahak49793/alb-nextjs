'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData = [
  {
    id: 1,
    question: "How can I book a consultation with an astrologer?",
    answer: "You can browse available astrologers, check their expertise, and book your preferred time slot directly through our website. Once booked, you’ll receive confirmation details for your video or voice call session."
  },
  {
    id: 2,
    question: "Are all astrologers verified?",
    answer: "Yes. Every astrologer on our platform is personally selected and verified by Acharya Lavbhushan to ensure authenticity, accuracy, and professionalism."
  },
  {
    id: 3,
    question: "What types of consultations do you offer?",
    answer: "We offer face-to-face consultations through secure video or voice calls covering Astrology, Numerology, Vastu, Relationship Guidance, Career, Health, and more."
  },
  {
    id: 4,
    question: "Do you charge per minute or per session?",
    answer: "We do not charge per minute. Each consultation is session-based so that our experts can focus on providing complete guidance and effective remedies without time pressure."
  },
  {
    id: 5,
    question: "How do I join the consultation?",
    answer: "Once you book a slot, you’ll receive a secure link to join the session at your scheduled time. You can connect through your phone, tablet, or computer."
  },
  {
    id: 6,
    question: "Can I choose my astrologer?",
    answer: "Yes. You can view profiles, specializations, and availability before selecting the astrologer who best fits your needs."
  },
  {
    id: 7,
    question: "What if I want a rescheduled session?",
    answer: "If you want, you can reschedule once without additional charges by contacting our support team at least 24 hours in advance."
  },
  {
    id: 8,
    question: "Will I receive remedies or reports after consultation?",
    answer: "Yes. During your session, you’ll receive personalized remedies, or detailed information depending on the consultation type."
  },
  {
    id: 9,
    question: "How do I contact support for any issue?",
    answer: "You can reach our customer support team via email, or the contact form on our website for any booking or technical assistance."
  },
  {
    id: 10,
    question: "Does Acharya Lavbhushan provide Astrology Courses?",
    answer: "Yes, Acharya Lavbhushan offers comprehensive astrology courses for beginners to advanced learners. The courses cover Vedic astrology, numerology and vastu shastra. Classes are available both online and offline, with flexible schedules. Each course includes detailed study materials, practical exercises, and personalized guidance to help you master the ancient science of astrology."
  },
];


const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number): void => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className=" bg-gradient-to-br min-h-screen from-slate-50 to-slate-200  px-4 pb-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 style={{fontFamily : 'arial,sans-serif'}} className="text-[36px] pt-4 md:pt-12 max-md:text-[28px] text-center font-extrabold tracking-tight text-[#980d0d] leading-snug">
            FAQ's
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-2 leading-relaxed">
            Frequently asked questions about our services and consultations
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                aria-expanded={openId === faq.id}
              >
                <h3 className=" font-semibold text-gray-800 pr-4">
                  {faq.question}
                </h3>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full bg-red-900 flex items-center justify-center transform transition-transform duration-300 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                >
                  <ChevronDown className="w-5 h-5 text-white" />
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-2">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FAQ;
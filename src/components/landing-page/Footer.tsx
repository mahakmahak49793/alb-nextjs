'use client';
import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi';
import { BsRobot } from 'react-icons/bs';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { toaster } from '@/utils/services/toast-service';

interface FooterLink {
  id: string;
  label: string;
  href: string;
  ourPage ?: boolean;
}

const ResponsiveFooter: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const baseUrl = "https://acharya.acharyalavbhushan.com";
  const currentYear: number = new Date().getFullYear();
  const supportEmail = 'info@acharyalavbhushan.com';
  const pathname = usePathname(); // Renamed from 'path' to 'pathname' for clarity

  // List of routes where this component should be hidden
  const excludedPaths = [
    '/astrologer/details',
    '/consultation',
  ];

  // Check if current pathname matches any excluded paths
  const isExcluded = excludedPaths.some(excludedPath => 
    pathname?.startsWith(excludedPath) // Fixed: use 'pathname' and 'excludedPath'
  );

  const horoscopeLinks: FooterLink[] = [
    { id: "horoscope", label: `Horoscope ${currentYear}`, ourPage: true, href: `/horoscope`  }
  ];

  const muhuratLinks: FooterLink[] = [
    { id: "annanprashan", label: `Annanprashan Muhurat ${currentYear}`,ourPage: true, href: `/muhurat/annanprashan-muhurat` },
    { id: "naamkaran", label: `Naamkaran Muhurat ${currentYear}`,ourPage: true, href: `/muhurat/naamkaran-muhurat` },
    { id: "vehicle", label: `Car/Bike Muhurat ${currentYear}`,ourPage: true, href: `/muhurat/vehicle-muhurat` },
    { id: "bhoomi", label: `Bhoomi Pujan Muhurat ${currentYear}`,ourPage: true, href: `/muhurat/bhoomi-pujan-muhurat` },
    { id: "marriage", label: `Marriage Muhurat ${currentYear}`,ourPage: true, href: `/muhurat/marriage-muhurat` },
    { id: "griha", label: `Griha Pravesh Muhurat ${currentYear}`,ourPage: true, href: `/muhurat/griha-pravesh-muhurat` },
    { id: "mundan", label: `Mundan Muhurat ${currentYear}`,ourPage: true, href: `/muhurat/mundan-muhurat` }
  ];

  const importantLinks: FooterLink[] = [
    { id: "kundli", label: "How to read kundli",ourPage: true, href: `/kundli` },
    { id: "kundli-matching", label: "Kundli Matching",ourPage: true, href: `/kundli-matching` },
    { id: "planetary", label: `Planetary Transit ${currentYear}`,ourPage: true, href: `/astrology-insights/planetary-transit` },
    { id: "solar", label: `Solar Eclipse ${currentYear}`,ourPage: true, href: `/astrology-insights/solar-eclipse` },
    { id: "lunar", label: `Lunar Eclipse ${currentYear}`,ourPage: true, href: `/astrology-insights/lunar-eclipse` },
    { id: "festival", label: `Festival Calendar ${currentYear}`,ourPage: true, href: `/astrology-insights/festival-calendar` },
    { id: "vrat", label: `Vrat Calendar ${currentYear}`,ourPage: true, href: `/astrology-insights/vrat-calendar` },
    { id: "yoga", label: "Astrology Yoga",ourPage: true, href: `/astrology-insights/astrology-yoga` },
    { id: "kaalsarp", label: "Kaalsarp Doshas",ourPage: true, href: `/astrology-insights/kaalsarp-doshas` },
    { id: "mantra", label: "Mantras",ourPage: true, href: `/astrology-insights/mantra` }
  ];

  const additionalLinks: FooterLink[] = [
    { id: "blog", label: "Blog",ourPage: true, href: `/blog` },
    { id: "astroshop", label: "Astroshop",ourPage: false, href: "https://lifechangingastro.com/" },
  ];

  const astrologerLinks: FooterLink[] = [
    { id: "astrosignup", label: "Astrologer Signup",ourPage: false, href: `${baseUrl}/astrologer-signup` },
    { id: "astrosignin", label: "Astrologer Login",ourPage: false, href: `${baseUrl}` },
  ];


const corporateLinks: FooterLink[] = [
  { id: "terms", label: "Terms & Conditions",ourPage: true, href: `/terms-of-use` },
  { id: "privacy", label: "Privacy Policy",ourPage: true, href: `/privacy-policy` },
  { id: "about", label: "About Us",ourPage: true, href: `/about-us` }
];

// Hide footer on specific report/course pages
if (
  pathname === "/courses" ||
  pathname?.startsWith("/life-journey-report") ||
  pathname?.startsWith("/life-changing-report") ||
  pathname?.startsWith("/love-report") ||
  pathname?.startsWith("/kundli-matching-report") ||
  pathname?.startsWith("/kundali-matching-report") ||
  pathname?.startsWith("/navratri-report")
) {
  return null;
}
  

const handleNewsletterSubmit = async (): Promise<void> => {
  const normalizedEmail = email.trim();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (!emailRegex.test(normalizedEmail)) {
    toaster.error({ text: 'Please enter a valid email address' });
    return;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/subscribe_news_letter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: normalizedEmail }),
    });

    const data = await response.json();

    if (data.success) {
      toaster.success({ text: data.message || 'Successfully subscribed!' });
      setEmail('');
    } else {
      toaster.error({ text: data.message || 'Subscription failed. Please try again.' });
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    toaster.error({ text: 'Something went wrong, please try again' });
  }
};
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  return (
    <footer className={`bg-gradient-to-br ${isExcluded ? "mb-0" : "mb-14"} from-[#8B0000] via-[#A52A2A] to-[#8B0000] text-white`}>
      {/* Newsletter Section */}
      <div className="bg-[#8B0000] py-12 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Subscribe to Newsletter
          </h2>
          <p className="text-white/90 mb-6 text-sm md:text-base">
            Subscribe to receive personalized astrological insights and predictions directly in your inbox.
          </p>
          
          {/* Email Input with Subscribe Button */}
          <div className="flex max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-l-full border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-all duration-200"
            />
            <button
              onClick={handleNewsletterSubmit}
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-4   md:px-8 py-3 rounded-r-full font-bold transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
            >
              <ArrowRight className="text-gray-900" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Horoscope & Shubh Muhurat Section */}
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Horoscope</h3>
              <div className="space-y-2">
                {horoscopeLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    target={`${link.ourPage ? '_self' : '_blank'}`}
                    prefetch={true}
                    rel="noopener noreferrer"
                    className="block text-white/80 hover:text-white hover:pl-2 transition-all duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Shubh Muhurat {currentYear}</h3>
              <div className="space-y-2">
                {muhuratLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    target={`${link.ourPage ? '_self' : '_blank'}`}
                    prefetch={true}
                    rel="noopener noreferrer"
                    className="block text-white/80 hover:text-white hover:pl-2 transition-all duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Important Links</h3>
            <div className="space-y-2">
              {importantLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  target={`${link.ourPage ? '_self' : '_blank'}`}
                  prefetch={true}
                  rel="noopener noreferrer"
                  className="block text-white/80 hover:text-white hover:pl-2 transition-all duration-200 text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Links & Corporate Info */}
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">More Links</h3>
              <div className="space-y-2">
                {additionalLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    target={`${link.ourPage ? '_self' : '_blank'}`}
                    prefetch={true}
                    rel="noopener noreferrer"
                    className="block text-white/80 hover:text-white hover:pl-2 transition-all duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

                        <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Astrologer Links</h3>
              <div className="space-y-2">
                {astrologerLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    target={`${link.ourPage ? '_self' : '_blank'}`}
                    prefetch={true}
                    rel="noopener noreferrer"
                    className="block text-white/80 hover:text-white hover:pl-2 transition-all duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Corporate Info</h3>
              <div className="space-y-2">
                {corporateLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    target={`${link.ourPage ? '_self' : '_blank'}`}
                    prefetch={true}
                    rel="noopener noreferrer"
                    className="block text-white/80 hover:text-white hover:pl-2 transition-all duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Contact & Social Media */}
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Contact Us</h3>
              <div className="space-y-3">
                <Link 
                  href={`mailto:${supportEmail}`} 
                  className="flex items-center text-white/80 hover:text-white transition-colors text-sm"
                >
                  <HiMail className="mr-2 text-lg" />
                  {supportEmail}
                </Link>
                <div className="flex items-start text-white/80 text-sm">
                  <BsRobot className="mr-2 text-lg mt-0.5 flex-shrink-0" />
                  <span>We are available 24x7 on chat support</span>
                </div>
                <Link 
                  href={`/consultation`}
                  prefetch={true}
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm"
                >
                  Click to start chat
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Connect With Us</h3>
              <div className="flex gap-3 mb-6">
                <Link
                  href="https://www.facebook.com/acharyalavbhushan09/"
                  target="_blank"
                  prefetch={true}
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <FaFacebookF className="text-white" />
                </Link>
                <Link
                  href="https://www.instagram.com/acharyalavbhushan/"
                  target="_blank"
                  prefetch={true}
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <FaInstagram className="text-white" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/acharyalavbhushan/"
                  target="_blank"
                  prefetch={true}
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <FaLinkedin className="text-white" />
                </Link>
                <Link
                  href="https://www.youtube.com/@acharyalavbhushan"
                  target="_blank"
                  prefetch={true}
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <FaYoutube className="text-white" />
                </Link>
                <Link
                  href="https://x.com/ALavbhushan"
                  target="_blank"
                  prefetch={true}
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <FaTwitter className="text-white" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              © {currentYear} Acharya Lav Bhushan. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link 
                href={`/privacy-policy`}
                target="_self"
                prefetch={true}
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href={`/terms-of-use`}
                target="_self"
                prefetch={true}
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                href={`/about-us`}
                target="_self"
                prefetch={true}
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ResponsiveFooter;

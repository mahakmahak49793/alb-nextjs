// lib/seo-config.ts

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogImage?: string;
}

export const seoConfig = {
  // Default/Home Page
  home: {
    title: "Acharya Lavbhushan Ji - Celebrity Astrologer, Vastu Expert & Numerologist",
    description: "Expert astrology, numerology & vastu consultations by celebrity astrologer Acharya Lavbhushan Ji. Get personalized reports, courses & spiritual products for life transformation.",
    keywords: "Acharya Lavbhushan Ji, celebrity astrologer, vastu expert, numerologist, astrology consultation, vastu shastra, numerology reading",
    canonical: "/",
    ogImage: "/images/acharya-lavbhushan-ji-og.jpg"
  },

  // About Section
  aboutUs: {
    title: "About Acharya Lavbhushan Ji - Celebrity Astrologer & Vastu Expert",
    description: "Learn about Acharya Lavbhushan Ji, renowned celebrity astrologer and vastu expert with years of experience in astrology, numerology & vastu shastra. Trusted by thousands worldwide.",
    keywords: "about Acharya Lavbhushan Ji, celebrity astrologer biography, vastu expert profile, astrologer credentials",
    canonical: "/about-us",
    ogImage: "/images/about-acharya-lavbhushan-ji.jpg"
  },

  // Astrologer Page
  astrologer: {
    title: "Meet Our Expert Astrologer - Acharya Lavbhushan Ji",
    description: "Connect with celebrity astrologer Acharya Lavbhushan Ji for accurate predictions and life guidance through vedic astrology, palmistry & spiritual remedies.",
    keywords: "expert astrologer, vedic astrologer, celebrity astrologer consultation, Acharya Lavbhushan Ji astrologer",
    canonical: "/astrologer",
    ogImage: "/images/astrologer-profile.jpg"
  },

  // Astrology Insights
  astrologyInsights: {
    title: "Astrology Insights & Predictions by Acharya Lavbhushan Ji",
    description: "Read daily astrology insights, horoscope predictions, planetary transit effects & astrological remedies by expert astrologer Acharya Lavbhushan Ji.",
    keywords: "astrology insights, daily horoscope, astrology predictions, planetary transits, astrological remedies",
    canonical: "/astrology-insights",
    ogImage: "/images/astrology-insights.jpg"
  },

  // Blog
  blog: {
    title: "Astrology Blog - Latest Articles on Vedic Astrology & Vastu",
    description: "Explore our astrology blog with articles on vedic astrology, numerology, vastu shastra, spiritual remedies & life guidance by Acharya Lavbhushan Ji.",
    keywords: "astrology blog, vedic astrology articles, vastu tips, numerology insights, spiritual guidance blog",
    canonical: "/blog",
    ogImage: "/images/blog-og.jpg"
  },

  // Book Puja
  bookPuja: {
    title: "Book Online Puja & Spiritual Rituals - Authentic Vedic Ceremonies",
    description: "Book authentic vedic puja and spiritual rituals performed by expert pandits. Online puja services for Graha Shanti, Navgraha Puja, Rudrabhishek & more.",
    keywords: "book puja online, vedic puja services, graha shanti puja, navgraha puja, online puja booking, spiritual rituals",
    canonical: "/book-puja",
    ogImage: "/images/puja-services.jpg"
  },

  // Cart
  cart: {
    title: "Shopping Cart - Your Spiritual Products & Services",
    description: "Review your selected spiritual products, gemstones, rudraksha, yantras and consultation services in your cart.",
    keywords: "shopping cart, spiritual products cart, astrology services cart",
    canonical: "/cart",
    ogImage: "/images/cart-og.jpg"
  },

  // Celebrity Consultations
  celeb: {
    title: "Celebrity Astrology Consultations by Acharya Lavbhushan Ji",
    description: "Exclusive astrology consultations for celebrities, business leaders & VIPs. Confidential predictions and guidance by celebrity astrologer Acharya Lavbhushan Ji.",
    keywords: "celebrity astrology, VIP astrology consultation, celebrity astrologer, exclusive astrology services",
    canonical: "/celeb",
    ogImage: "/images/celebrity-consultations.jpg"
  },

  // Consultation
  consultation: {
    title: "Astrology Consultation - Personalized by Acharya Lavbhushan Ji",
    description: "Book personalized astrology, numerology & vastu consultation with celebrity astrologer Acharya Lavbhushan Ji. Accurate predictions & effective remedies guaranteed.",
    keywords: "astrology consultation, personalized astrology, numerology consultation, vastu consultation, book astrologer consultation",
    canonical: "/consultation",
    ogImage: "/images/consultation-services.jpg"
  },

  // Courses
  courses: {
    title: "Astrology Courses Online - Learn from Acharya Lavbhushan Ji",
    description: "Enroll in professional astrology, numerology & vastu courses online. Live classes, certification programs & webinars by expert astrologer Acharya Lavbhushan Ji.",
    keywords: "astrology courses online, learn astrology, numerology course, vastu shastra course, astrology certification, live astrology classes",
    canonical: "/courses",
    ogImage: "/images/astrology-courses.jpg"
  },

  // Horoscope
  horoscope: {
    title: "Free Daily Horoscope & Zodiac Predictions Today",
    description: "Read your free daily horoscope and zodiac predictions by Acharya Lavbhushan Ji. Accurate astrology forecasts for all 12 zodiac signs updated daily.",
    keywords: "daily horoscope, free horoscope today, zodiac predictions, horoscope 2025, astrology forecast, rashifal",
    canonical: "/horoscope",
    ogImage: "/images/daily-horoscope.jpg"
  },

  // Kundli
  kundli: {
    title: "Free Kundli Making Online - Janam Kundali by Date of Birth",
    description: "Generate your free kundli online with accurate birth chart analysis. Get detailed janam kundali, planetary positions & predictions by Acharya Lavbhushan Ji.",
    keywords: "free kundli, janam kundli online, birth chart, kundali making, horoscope by date of birth, vedic astrology chart",
    canonical: "/kundli",
    ogImage: "/images/kundli-making.jpg"
  },

  // Kundli Matching
  kundliMatching: {
    title: "Kundli Matching for Marriage - Gun Milan Online Free",
    description: "Get accurate kundli matching for marriage compatibility. Free online gun milan, horoscope matching & marriage compatibility report by expert astrologer.",
    keywords: "kundli matching, marriage compatibility, gun milan, horoscope matching for marriage, kundali milan online free",
    canonical: "/kundli-matching",
    ogImage: "/images/kundli-matching.jpg"
  },

  // Muhurat
  muhurat: {
    title: "Shubh Muhurat 2025 - Auspicious Time for Marriage & Events",
    description: "Find shubh muhurat for marriage, griha pravesh, vehicle purchase & important events. Accurate auspicious timing by Acharya Lavbhushan Ji.",
    keywords: "shubh muhurat, marriage muhurat 2025, auspicious time, vivah muhurat, griha pravesh muhurat",
    canonical: "/muhurat",
    ogImage: "/images/shubh-muhurat.jpg"
  },

  // My Account
  myAccount: {
    title: "My Account - Manage Your Profile & Bookings",
    description: "Access your account to manage consultations, view reports, track orders and update your profile details.",
    keywords: "my account, user profile, manage bookings, consultation history",
    canonical: "/my-account",
    ogImage: "/images/my-account.jpg"
  },

  // My Booking
  myBooking: {
    title: "My Bookings - View Consultation & Service History",
    description: "View and manage your consultation bookings, puja services and course enrollments with Acharya Lavbhushan Ji.",
    keywords: "my bookings, consultation booking, appointment history, booking management",
    canonical: "/my-booking",
    ogImage: "/images/my-bookings.jpg"
  },

  // My Order
  myOrder: {
    title: "My Orders - Track Your Spiritual Products & Reports",
    description: "Track your orders for gemstones, rudraksha, yantras, astrology reports and other spiritual products.",
    keywords: "my orders, order tracking, order history, purchase tracking",
    canonical: "/my-order",
    ogImage: "/images/my-orders.jpg"
  },

  // Reports
  reports: {
    title: "Astrology Reports - Personalized Predictions & Analysis",
    description: "Get detailed personalized astrology, numerology, wealth, marriage compatibility & kundli reports by Acharya Lavbhushan Ji. Accurate predictions & remedies included.",
    keywords: "astrology report, numerology report, personalized horoscope, marriage compatibility report, wealth report, love report",
    canonical: "/reports",
    ogImage: "/images/astrology-reports.jpg"
  },

  // Get Your Report
  getYourReport: {
    title: "Get Your Personalized Astrology Report Instantly",
    description: "Order your customized astrology, numerology or kundli report online. Prepared personally by Acharya Lavbhushan Ji with accurate predictions & remedies.",
    keywords: "get astrology report, buy astrology report, personalized horoscope report, instant kundli report",
    canonical: "/get-your-report",
    ogImage: "/images/get-report.jpg"
  },

  // Shop Now
  shopNow: {
    title: "Shop Spiritual Products - Gemstones, Rudraksha & Yantras",
    description: "Buy authentic energized rudraksha, certified gemstones, powerful yantras & spiritual remedy products. Original products with guarantee by Acharya Lavbhushan Ji.",
    keywords: "buy gemstones online, rudraksha beads, yantras for sale, spiritual products, authentic gemstones, energized rudraksha",
    canonical: "/shop-now",
    ogImage: "/images/spiritual-products.jpg"
  },

  // Sign In
  signin: {
    title: "Sign In - Access Your Astrology Account",
    description: "Sign in to your account to book consultations, access reports and manage your spiritual journey with Acharya Lavbhushan Ji.",
    keywords: "sign in, login, astrology account login, user login",
    canonical: "/signin",
    ogImage: "/images/signin.jpg"
  },

  // Privacy Policy
  privacyPolicy: {
    title: "Privacy Policy - Data Protection & Security",
    description: "Read our privacy policy to understand how we collect, use and protect your personal information and consultation data.",
    keywords: "privacy policy, data protection, personal information security, confidentiality",
    canonical: "/privacy-policy",
    ogImage: "/images/privacy-policy.jpg"
  },

  // Terms of Use
  termsOfUse: {
    title: "Terms of Use - Service Terms & Conditions",
    description: "Read our terms of use and service conditions for consultations, courses, reports and products offered by Acharya Lavbhushan Ji.",
    keywords: "terms of use, terms and conditions, service terms, usage policy",
    canonical: "/terms-of-use",
    ogImage: "/images/terms-of-use.jpg"
  }
} as const;

// Type for accessing SEO data
export type SEOConfigKey = keyof typeof seoConfig;
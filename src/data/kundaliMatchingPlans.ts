// We are using an asset from the existing project structure.
// import reportBook from "../assets/images/kundali-matching/report-book.jpg";
import { StaticImageData } from "next/image";

export interface PricingPlan {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  priceOriginal: string;
  priceFinal: string;
  price: number;
  image: any;
  features: string[];
  description: string;
  isBestSeller: boolean;
  astroConsultationPrice?: number;
  expressDeliveryPrice?: number;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "kundali-matching-report",
    badge: "FLAT 50% OFF",
    title: "Premium Kundli Matching Report",
    subtitle: 'Before You Say "Yes!" See What The Universe Says',
    priceOriginal: "₹1996",
    priceFinal: "₹1050",
    price: 1050,
    image: "/assets/images/kundali-matching/report-book.webp",
    features: [
      "Detailed Guna Analysis based on Ashtakoot, Dashkoot & Manglik Dosha",
      "Clear insights on career, love, health & wealth",
      "Simple remedies like gemstones, mantras & yantras",
      "Written in easy-to-understand language by expert astrologers",
    ],
    description: "",
    isBestSeller: false,
    // Add prices for the add-ons here
    astroConsultationPrice: 2100,
    expressDeliveryPrice: 149,
  },
  {
    id: "kundali-matching-report-consultation",
    badge: "BEST SELLER",
    title: "Premium Report + 1-on-1 Online Consultation",
    subtitle: "Discuss Your Challenges Face-to-Face with an Expert",
    priceOriginal: "₹2500",
    priceFinal: "₹2199",
    price: 2199,
    image: "/assets/images/kundali-matching/report-book.webp",
    features: [
      "Includes everything in the Premium Kundli Matching Report",
      "PLUS: 15–20 min Online private session with an astrologer",
      "Get real-time clarity & guidance as per your horoscope",
    ],
    description: "",
    isBestSeller: true,
  },
  {
    id: "kundali-matching-report-ask-astrologer",
    badge: "BUDGET FRIENDLY",
    title: "Premium Report + Ask the Astrologer (2 Questions)",
    subtitle: "Discuss Your Challenges Face-to-Face with an Expert",
    priceOriginal: "₹2500",
    priceFinal: "₹1599",
    price: 1599,
    image: "/assets/images/kundali-matching/report-book.webp",
    features: [
      "Includes everything in the Premium Kundli Matching Report",
      "PLUS: Ask 2 personal questions about career, relationships, family or marriage direction",
      "Discuss compatibility & doubts easily in real-time consultation with remedies",
    ],
    description: "",
    isBestSeller: false,
  },
];

export type Plan = PricingPlan;
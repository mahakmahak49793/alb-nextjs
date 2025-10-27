// We are using an asset from the existing project structure.
import reportBook from "@/assets/images/life-journey/report-book.jpg";

export interface Plan {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  priceOriginal: string;
  priceFinal: string;
  price: number;
  image: any; // Next.js StaticImageData type
  features: string[];
  description: string;
  isBestSeller: boolean;
  astroConsultationPrice?: number;
  expressDeliveryPrice?: number;
}

export const pricingPlans: Plan[] = [
  {
    id: "journey-report",
    badge: "FLAT 50% OFF",
    title: "Life Journey Report",
    subtitle: "Your Personalized Roadmap to Life's Big Questions",
    priceOriginal: "₹1996",
    priceFinal: "₹996",
    price: 996,
    image: reportBook,
    features: [
      "Detailed analysis of your life using Astrology",
      "Insights on career, love, health & wealth",
      "Easy remedies like gemstones, mantras & yantras",
      "Written in simple, easy-to-understand language by expert astrologists",
    ],
    description:
      "Perfect for anyone who wants clear answers & direction for the next chapter of life.",
    isBestSeller: false,
    astroConsultationPrice: 2100,
    expressDeliveryPrice: 149,
  },
  {
    id: "journey-report-consultation",
    badge: "BEST SELLER",
    title: "Life Journey Report + 1-On-1 Consultation",
    subtitle: "Discuss Your Challenges Face-to-Face with an Expert",
    priceOriginal: "₹6000",
    priceFinal: "₹1900",
    price: 1900,
    image: reportBook,
    features: [
      "Includes everything in the Life Journey Report",
      "PLUS: A 15-20-minute private session with an expert",
      "Get real-time clarity & guidance for your most important decisions",
      "Remedies & advice tailored to your unique astrology profile",
    ],
    description:
      "Ideal for people who want live, personal interaction for deeper clarity & accurate remedies.",
    isBestSeller: true,
  },
  {
    id: "journey-report-ask-astrologer",
    badge: "BUDGET FRIENDLY",
    title: "Life Journey Report + Ask The Astrologer (2 Questions)",
    subtitle: "You ask - Expert Answers",
    priceOriginal: "₹4,599",
    priceFinal: "₹1599",
    price: 1599,
    image: reportBook,
    features: [
      "Includes everything in the Life Journey Report",
      "PLUS: Ask 2 personal questions about career, relationships, family, or life direction",
      "Get a detailed written answer from an expert within 48 hours",
    ],
    description:
      "Perfect if you want your life insights + a clear, specific answer for your life concerns.",
    isBestSeller: false,
  },
];

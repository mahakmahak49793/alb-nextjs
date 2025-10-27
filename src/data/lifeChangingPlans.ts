// We are using an asset from the existing project structure.
// import reportBook from "@/assets/images/life-changing/report-book.jpg";

export interface Plan {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  priceOriginal: string;
  priceFinal: string;
  image: any;
  features: string[];
  description: string;
  isBestSeller: boolean;
  astroConsultationPrice?: number;
  expressDeliveryPrice?: number;
}

export const pricingPlans: Plan[] = [
  {
    id: "life-changing-report",
    badge: "FLAT 67% OFF",
    title: "Life Changing Report",
    subtitle: "Your Personalized Roadmap to Life's Big Questions",
    priceOriginal: "₹2097",
    priceFinal: "₹699",
    image: "/assets/images/life-changing/report-book.webp",
    features: [
      "Detailed analysis of your life using Numerology",
      "Insights on career, love, health & wealth",
      "Easy remedies like gemstones, mantras & yantras",
      "Written in simple, easy-to-understand language by expert numerologists",
    ],
    description:
      "Perfect for anyone who wants clear answers & direction for the next chapter of life.",
    isBestSeller: false,
    astroConsultationPrice: 2100,
    expressDeliveryPrice: 149,
  },
  {
    id: "life-changing-report-consultation",
    badge: "BEST SELLER",
    title: "Life Changing Report + 1-On-1 Consultation",
    subtitle: "Discuss Your Challenges Face-to-Face with an Expert",
    priceOriginal: "₹5097",
    priceFinal: "₹1699",
    image: "/assets/images/life-changing/report-book.webp",
    features: [
      "Includes everything in the Life Changing Report",
      "Plus: A 15-20 minute private session with expert",
      "Get real time clarity & guidance as per your numerology report",
      "Remedies & advice tailored to your unique numerology profile",
    ],
    description:
      "Ideal for people who want live, personal interaction for deeper clarity & accurate remedies.",
    isBestSeller: true,
  },
  {
    id: "life-changing-report-ask-astrologer",
    badge: "BUDGET FRIENDLY",
    title: "Life Changing Report + Ask The Astrologer (2 Questions)",
    subtitle: "You ask - Expert Answers",
    priceOriginal: "₹4200",
    priceFinal: "₹1400",
    image: "/assets/images/life-changing/report-book.webp",
    features: [
      "Includes everything in the Life Changing Report",
      "PLUS: Ask 2 personal questions about career, relationships, family, or life direction",
      "Get a detailed written answer from an expert within 48 hours",
    ],
    description:
      "Perfect if you want your life insights + a clear, specific answer for your life concerns.",
    isBestSeller: false,
  },
];
// app/page.tsx or pages/index.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Star, 
  Users, 
  Calendar, 
  MessageCircle, 
  Video, 
  Phone, 
  Sparkles,
  ArrowRight,
  PlayCircle,
  Award,
  Clock,
  Heart
} from 'lucide-react';
import TopHeaderSection from '@/components/common/TopHeaderSection';

const HomePage: React.FC = () => {
  const [activeService, setActiveService] = useState(0);

  return (
    <>
      <TopHeaderSection />
      
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background Stars */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-ping"></div>
          <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse"></div>
          <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-purple-300 rounded-full animate-ping"></div>
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  India's #1 Astrology Platform
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Discover Your 
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent block">
                    Cosmic Destiny
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed">
                  Connect with India's most trusted astrologers for personalized readings, 
                  birth chart analysis, and cosmic guidance for love, career, and life.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/consultation"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-2xl inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat with Astrologer
                </Link>
                
                <button className="border-2 border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all inline-flex items-center justify-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">1M+</div>
                  <div className="text-sm text-gray-400">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">500+</div>
                  <div className="text-sm text-gray-400">Expert Astrologers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">4.8★</div>
                  <div className="text-sm text-gray-400">User Rating</div>
                </div>
              </div>
            </div>

            {/* Right Content - Astrologer Card */}
            <div className="relative">
              <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="text-center space-y-6">
                  <div className="relative inline-block">
                    <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center text-4xl">
                        🔮
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                  </div>
                  
                  <div className="text-white">
                    <h3 className="text-xl font-bold">Pandit Raj Kumar</h3>
                    <p className="text-gray-300">Vedic Astrology Expert</p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-gray-300 ml-2">4.9 (2.1k reviews)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white/10 rounded-lg p-3">
                      <MessageCircle className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                      <div className="text-white text-sm font-semibold">₹12/min</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <Phone className="w-6 h-6 text-green-400 mx-auto mb-1" />
                      <div className="text-white text-sm font-semibold">₹15/min</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <Video className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                      <div className="text-white text-sm font-semibold">₹20/min</div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-full font-semibold transition-all">
                    Chat Now - Available
                  </button>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Choose Your Consultation Method
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get personalized astrological guidance through your preferred communication method
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MessageCircle,
                title: "Chat Consultation",
                description: "Instant text-based consultation with our expert astrologers",
                price: "Starting ₹12/min",
                color: "blue",
                features: ["Instant responses", "Save conversation", "24/7 available"]
              },
              {
                icon: Phone,
                title: "Voice Call",
                description: "Personal voice consultation for detailed astrological guidance",
                price: "Starting ₹15/min",
                color: "green", 
                features: ["Clear audio quality", "Personal connection", "Detailed reading"]
              },
              {
                icon: Video,
                title: "Video Call",
                description: "Face-to-face consultation with visual birth chart analysis",
                price: "Starting ₹20/min", 
                color: "purple",
                features: ["HD video quality", "Screen sharing", "Visual charts"]
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-orange-200 p-8 text-center relative overflow-hidden"
              >
                <div className={`w-16 h-16 bg-${service.color}-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-8 h-8 text-${service.color}-600`} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <div className={`w-2 h-2 bg-${service.color}-500 rounded-full`}></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="text-2xl font-bold text-orange-600 mb-6">{service.price}</div>
                
                <Link 
                  href="/astrologer"
                  className={`w-full bg-gradient-to-r from-${service.color}-500 to-${service.color}-600 hover:from-${service.color}-600 hover:to-${service.color}-700 text-white py-3 rounded-full font-semibold transition-all inline-flex items-center justify-center gap-2`}
                >
                  Choose Astrologer
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Background decoration */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-full opacity-50 group-hover:scale-125 transition-transform"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Expert Guidance for Every Aspect of Life
            </h2>
            <p className="text-xl text-gray-600">
              Our astrologers specialize in various life domains
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "💕", title: "Love & Relationships", count: "45k+ readings" },
              { icon: "💼", title: "Career & Finance", count: "32k+ readings" },
              { icon: "🏠", title: "Family & Marriage", count: "28k+ readings" },
              { icon: "🏥", title: "Health & Wellness", count: "15k+ readings" },
              { icon: "📚", title: "Education", count: "12k+ readings" },
              { icon: "⚖️", title: "Legal Issues", count: "8k+ readings" },
              { icon: "✈️", title: "Travel & Relocation", count: "5k+ readings" },
              { icon: "🔮", title: "Spiritual Growth", count: "20k+ readings" }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all group cursor-pointer">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose AstroConnect?
            </h2>
            <p className="text-xl text-gray-600">
              India's most trusted astrology platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Verified Astrologers",
                description: "All our astrologers are thoroughly verified and have years of experience"
              },
              {
                icon: Clock,
                title: "24/7 Available", 
                description: "Get instant consultation anytime, anywhere with our round-the-clock service"
              },
              {
                icon: Heart,
                title: "1M+ Happy Customers",
                description: "Join millions who have found clarity and guidance through our platform"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Discover Your Future?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Start your journey of self-discovery with personalized astrological guidance from India's top astrologers
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/astrologer"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-2xl inline-flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              Browse Astrologers
            </Link>
            
            <Link 
              href="/consultation"
              className="border-2 border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all inline-flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;

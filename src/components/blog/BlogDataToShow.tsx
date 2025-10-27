'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';

interface Blog {
  _id: string;
  id: string;
  title: string;
  description: string;
  image: string;
  created_by: string;
  createdAt: string;
  viewsCount?: number;
}

interface BlogApiResponse {
  success: boolean;
  results: Blog[];
  totalResults: number;
  message?: string;
}

interface BlogSwiperProps {
  limit?: number;
  blogCategoryId?: string;
}

const BlogSwiper: React.FC<BlogSwiperProps> = ({ 
  limit = 10,
  blogCategoryId 
}) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: '1',
          limit: limit.toString(),
          ...(blogCategoryId && { blogCategoryId }),
        });

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_HTTPS}/customers/all_blogs?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }

        const data: BlogApiResponse = await response.json();

        if (data.success) {
          setBlogs(data.results);
        } else {
          throw new Error(data.message || 'Failed to load blogs');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [limit, blogCategoryId]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="bg-stone-50 py-12">
        <div className="container mx-auto px-4">
          <h2
            style={{ fontFamily: 'arial,sans-serif' }}
            className="text-[36px] max-md:text-[28px] text-center font-extrabold tracking-tight mb-10"
          >
            <span className="text-[#980d0d]">Our</span>{' '}
            <span className="text-[#D4AF37]">Blogs</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-lg h-80 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-stone-50 py-12">
        <div className="container mx-auto px-4">
          <h2
            style={{ fontFamily: 'arial,sans-serif' }}
            className="text-[36px] max-md:text-[28px] text-center font-extrabold tracking-tight mb-10"
          >
            <span className="text-[#980d0d]">Our</span>{' '}
            <span className="text-[#D4AF37]">Blogs</span>
          </h2>
          <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-4">⚠️ {error}</div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No blogs found
  if (blogs.length === 0) {
    return (
      <div className="bg-stone-50 py-12">
        <div className="container mx-auto px-4">
          <h2
            style={{ fontFamily: 'arial,sans-serif' }}
            className="text-[36px] max-md:text-[28px] text-center font-extrabold tracking-tight mb-10"
          >
            <span className="text-[#980d0d]">Our</span>{' '}
            <span className="text-[#D4AF37]">Blogs</span>
          </h2>
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">📝 No blogs found</div>
            <p className="text-gray-400">
              Check back later for new astrology insights
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 py-12">
      <div className="container mx-auto px-4">
        {/* Our Blogs Header */}
        <h2
          style={{ fontFamily: 'arial,sans-serif' }}
          className="text-[36px] max-md:text-[28px] text-center font-extrabold tracking-tight mb-10"
        >
          <span className="text-[#980d0d]">Our</span>{' '}
          <span className="text-[#D4AF37]">Blogs</span>
        </h2>

        {/* Swiper Section */}
        <div className="max-w-7xl mx-auto">
          <Swiper
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={blogs.length > 3}
            centeredSlides={false}
            keyboard={{
              enabled: true,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper blog-swiper"
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog._id || blog.id}>
                <div className="pb-10">
                  <Link prefetch={true} href={`/blog/${blog._id}?title=${blog.title.replace(/\s+/g, '-').toLowerCase()}`}>
                  <div 
                    className="flex flex-col justify-center items-center border border-amber-600/35 pb-4 rounded-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  >
                    <img
                      alt={blog.title}
                      loading="lazy"
                      src={`${process.env.NEXT_PUBLIC_PREFIX_IMAGE_URL}/uploads/${blog.image}`}
                      className="h-44 w-full object-cover object-center rounded-t-lg border-b"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-blog.jpg';
                      }}
                    />

                    <div className="p-3 flex flex-col items-center gap-2 w-full">
                      

                      <h3 className="line-clamp-2 text-[17px] font-semibold text-center text-[#EF4444] min-h-[3rem]">
                        {blog.title}
                      </h3>

                      <p
                        dangerouslySetInnerHTML={{ __html: blog.description }}
                        className="text-gray-700 text-sm line-clamp-2 text-center"
                      />

                      <button
                        className="border border-red-500 rounded-full px-7 py-1.5 text-[#EF4444] text-xs flex items-center gap-2 hover:bg-red-50 transition-colors mt-2"
                      >
                        Read More
                        <ArrowRight strokeWidth={1.5} size={20} />
                      </button>
                    </div>
                  </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .blog-swiper .swiper-pagination-bullet-active {
          background-color: #d97706;
        }
      `}</style>
    </div>
  );
};

export default BlogSwiper;

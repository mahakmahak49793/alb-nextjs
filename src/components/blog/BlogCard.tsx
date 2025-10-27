// components/BlogCard.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { BlogCardProps } from "@/types/blogTypes";
import { formatDate } from "@/utils/blog-date";

export const BlogCard: React.FC<BlogCardProps> = ({ blog, onCardClick }) => {
  const router = useRouter();

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(blog._id);
    } else {
      // Default navigation - you can customize this route
      router.push(`/blog/${blog._id}?title=${blog.title.replace(/\s+/g, '-').toLowerCase()}`);
    }
  };

  // Extract plain text from HTML description (first 150 chars)
  const getPlainTextPreview = (html: string): string => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.substring(0, 150) + (text.length > 150 ? "..." : "");
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Image Section */}
      <div className="relative md:h-80 h-48 w-full overflow-hidden ">
        {blog.image ? (
          <img
            src={`${process.env.NEXT_PUBLIC_PREFIX_IMAGE_URL}uploads/${blog.image}`|| "/horosccope.webp"}
            alt={blog.title}
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-6xl opacity-50">🌟</div>
          </div>
            
        )}
        
        {/* <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
          <span className="text-xs font-semibold text-gray-700">👁️ {blog.viewsCount}</span>
        </div> */}

      </div>

      {/* Content Section */}
      <div className="pt-10 px-6 pb-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
          {blog.title}
        </h3>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-medium text-amber-600">{blog.created_by}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-500">
              {formatDate(blog.createdAt)}
            </span>
          </div>
        </div>

        {/* Description Preview */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {getPlainTextPreview(blog.description)}
        </p>

        {/* Footer with Read More */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Status: {blog.status === 0 ? "Published" : "Draft"}
          </span>
          <span className="text-amber-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Read More
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};
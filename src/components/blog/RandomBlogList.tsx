// components/blog/BlogList.tsx
"use client";

import { useEffect, useState } from "react";
import { BlogCard } from "./BlogCard";
import { Blog, BlogApiResponse } from "@/types/blogTypes";

interface BlogListProps {
  initialData?: BlogApiResponse;
  page?: number;
  limit?: number;
  blogCategoryId?: string;
  search?: string;
  showRandom?: boolean; // New prop to control random selection
  randomCount?: number; // Number of random blogs to show
  excludeId?: string; // Exclude current blog from random selection
}

export const RandomBlogList: React.FC<BlogListProps> = ({
  initialData,
  page = 1,
  limit = 50,
  blogCategoryId,
  search,
  showRandom = false,
  randomCount = 3,
  excludeId,
}) => {
  const [blogs, setBlogs] = useState<Blog[]>(initialData?.results || []);
  const [displayBlogs, setDisplayBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);

  // Function to get random blogs
  const getRandomBlogs = (blogArray: Blog[], count: number, excludeId?: string) => {
    // Filter out the current blog if excludeId is provided
    const filteredBlogs = excludeId 
      ? blogArray.filter(blog => blog.id !== excludeId)
      : blogArray;

    // Shuffle array and take first 'count' items
    const shuffled = [...filteredBlogs].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  };

  useEffect(() => {
    if (initialData) return;

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(blogCategoryId && { blogCategoryId }),
          ...(search && { search }),
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_HTTPS}/customers/all_blogs?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data: BlogApiResponse = await response.json();
        
        if (data.success) {
          setBlogs(data.results);
        } else {
          throw new Error(data.message || "Failed to load blogs");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [initialData, page, limit, blogCategoryId, search]);


  

  // Set display blogs based on showRandom prop
  useEffect(() => {
    if (blogs.length > 0) {
      if (showRandom) {
        setDisplayBlogs(getRandomBlogs(blogs, randomCount, excludeId));
      } else {
        setDisplayBlogs(blogs);
      }
    }
  }, [blogs, showRandom, randomCount, excludeId]);

  if (loading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Related Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-xl h-96 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">⚠️ {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (displayBlogs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">📝 No blogs found</div>
        <p className="text-gray-400">
          Check back later for new astrology insights
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 border-t pt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {showRandom ? "Related Articles" : "All Articles"}
        </h2>
        {/* {showRandom && (
          <button
            onClick={() => setDisplayBlogs(getRandomBlogs(blogs, randomCount, excludeId))}
            className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
            Shuffle
          </button>
        )} */}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    </div>
  );
};
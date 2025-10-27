// components/BlogList.tsx
"use client";

import { useEffect, useState } from "react";
import { BlogCard } from "./BlogCard";
import { useRouter } from "next/navigation";
import { Blog, BlogApiResponse } from "@/types/blogTypes";

interface BlogListProps {
  initialData?: BlogApiResponse;
  page?: number;
  limit?: number;
  blogCategoryId?: string;
  search?: string;
  onDataLoaded?: (count: number) => void; // ✅ New prop
}

export const BlogList: React.FC<BlogListProps> = ({
  initialData,
  page = 1,
  limit = 50,
  blogCategoryId,
  search,
  onDataLoaded,
}) => {
  const [blogs, setBlogs] = useState<Blog[]>(initialData?.results || []);
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  console.log("blogsssssssssssss")

  useEffect(() => {
    if (initialData) {
      onDataLoaded?.(initialData.results.length); // ✅ Trigger on mount with initial data
      return;
    }

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(blogCategoryId && { blogCategoryId }),
          ...(search && { search }),
        });

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_HTTPS}/customers/all_blogs?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data: BlogApiResponse = await response.json();

        if (data.success) {
          setBlogs(data.results);
          onDataLoaded?.(data.results.length); // ✅ Pass blog count to parent
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 rounded-xl h-96 animate-pulse"
          />
        ))}
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

  if (blogs.length === 0) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};

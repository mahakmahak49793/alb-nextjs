// lib/utils.ts

/**
 * Format date string to readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  
  return date.toLocaleDateString("en-US", options);
};

/**
 * Format relative time (e.g., "2 days ago")
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  
  return `${Math.floor(diffInDays / 365)} years ago`;
};

/**
 * Strip HTML tags from string
 */
export const stripHtml = (html: string): string => {
  if (typeof window === "undefined") {
    // Server-side: use regex
    return html.replace(/<[^>]*>/g, "");
  }
  
  // Client-side: use DOM
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

/**
 * Get excerpt from HTML content
 */
export const getExcerpt = (html: string, length: number = 150): string => {
  const text = stripHtml(html);
  return text.length > length ? text.substring(0, length) + "..." : text;
};

/**
 * Truncate text to specified length
 */
export const truncate = (text: string, length: number): string => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};
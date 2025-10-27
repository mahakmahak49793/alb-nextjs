// types/blog.types.ts

export interface BlogCategory {
  _id: string;
  name: string;
}
export interface Blog {
  _id : string;
  id: string;
  __v: number;
  blogCategoryId: BlogCategory;
  createdAt: string;
  created_by: string;
  description: string;
  image: string;
  status: number;
  title: string;
  updatedAt: string;
  viewsCount: number;
}

export interface BlogApiResponse {
  success: boolean;
  message: string;
  results: Blog[];
  page: number;
  limit: number;
  total: number;
}

export interface BlogCardProps {
  blog: Blog;
  onCardClick?: (blogId: string) => void;
}
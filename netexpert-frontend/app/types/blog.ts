export interface BlogItem {
  blog_id: number;
  title: string;
  summary: string;
  thumbnail: string;
  created_at: string;
  category: string;
}

export interface BlogResponse {
  total: number;
  page: number;
  limit: number;
  blogs: BlogItem[];
}

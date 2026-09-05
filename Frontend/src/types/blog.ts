export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedDate: string;
  readingTime: string;
  featured: boolean;
  tags: string[];
  coverImage?: string;
  authorRole?: string;
}

export type BlogPost = BlogPostItem;


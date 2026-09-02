export interface BlogSection {
  id: string;
  blogId: string;
  title: string;
  content: string;
  imageUrl: string | null;
  displayOrder: number;
  sectionType: string | null;
}

export interface BlogItem {
  id: string;
  title: string;
  summary: string | null;
  content: string | null;
  featuredImageUrl: string | null;
  isPublished: boolean;
  viewCount: number;
  displayOrder: number;
  createdAtUtc: string;
  updatedAtUtc: string | null;
  blogSections: BlogSection[];
}

export interface BlogsQuery {
  IsPublished?: boolean;
  SearchTerm?: string;
  PageNumber?: number;
  PageSize?: number;
  SortBy?: string;
  IsDescending?: boolean;
}

export interface CreateBlogRequest {
  title: string;
  summary?: string;
  content?: string;
  featuredImage?: File | null;
  isPublished: boolean;
  displayOrder: number;
}

export interface UpdateBlogRequest extends CreateBlogRequest {
  removeFeaturedImage?: boolean;
}

export interface CreateBlogSectionRequest {
  title: string;
  content: string;
  image?: File | null;
  displayOrder: number;
  sectionType?: string;
}

export interface UpdateBlogSectionRequest extends CreateBlogSectionRequest {
  removeImage?: boolean;
}

export interface PaginatedBlogsResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface BlogApiResponse<T = BlogItem> {
  data: T | null;
  isSuccess: boolean;
  message: string | null;
  errors: string[];
  type: number;
}

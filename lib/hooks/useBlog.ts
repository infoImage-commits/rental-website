import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/api/axiosInstance";
import type {
  BlogApiResponse,
  BlogItem,
  BlogSection,
  BlogsQuery,
  CreateBlogRequest,
  CreateBlogSectionRequest,
  PaginatedBlogsResponse,
  UpdateBlogRequest,
  UpdateBlogSectionRequest,
} from "@/lib/types/blog";

const BLOGS_KEY = "blogs";

function appendOptional(formData: FormData, key: string, value?: string | number | boolean | File | null) {
  if (value === undefined || value === null) return;
  if (typeof File !== "undefined" && value instanceof File) {
    formData.append(key, value);
    return;
  }
  formData.append(key, String(value));
}

function blogFormData(payload: CreateBlogRequest | UpdateBlogRequest) {
  const formData = new FormData();
  formData.append("Title", payload.title);
  appendOptional(formData, "Summary", payload.summary);
  appendOptional(formData, "Content", payload.content);
  appendOptional(formData, "FeaturedImage", payload.featuredImage);
  if ("removeFeaturedImage" in payload) {
    appendOptional(formData, "RemoveFeaturedImage", payload.removeFeaturedImage);
  }
  formData.append("IsPublished", String(payload.isPublished));
  formData.append("DisplayOrder", String(payload.displayOrder));
  return formData;
}

function sectionFormData(payload: CreateBlogSectionRequest | UpdateBlogSectionRequest) {
  const formData = new FormData();
  formData.append("Title", payload.title);
  formData.append("Content", payload.content);
  appendOptional(formData, "Image", payload.image);
  if ("removeImage" in payload) {
    appendOptional(formData, "RemoveImage", payload.removeImage);
  }
  formData.append("DisplayOrder", String(payload.displayOrder));
  appendOptional(formData, "SectionType", payload.sectionType);
  return formData;
}

function getErrorMessage(error: unknown) {
  const apiError = error as {
    response?: { data?: { errors?: string[]; message?: string } };
  };
  return (
    apiError.response?.data?.errors?.[0] ||
    apiError.response?.data?.message ||
    "Operation failed"
  );
}

export function useBlogs(query: BlogsQuery) {
  return useQuery({
    queryKey: [BLOGS_KEY, "list", query],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        BlogApiResponse<PaginatedBlogsResponse<BlogItem>>
      >("/api/blogs", { params: query });
      return data.data as PaginatedBlogsResponse<BlogItem>;
    },
    staleTime: 30 * 1000,
  });
}

export function useBlogById(id: string, incrementViewCount = false) {
  return useQuery({
    queryKey: [BLOGS_KEY, id, incrementViewCount],
    queryFn: async () => {
      const { data } = await axiosInstance.get<BlogApiResponse<BlogItem>>(
        `/api/blogs/${id}`,
        { params: { incrementViewCount } }
      );
      return data.data;
    },
    enabled: !!id,
    staleTime: 30 * 1000,
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateBlogRequest) => {
      const { data } = await axiosInstance.post<BlogApiResponse<BlogItem>>(
        "/api/blogs",
        blogFormData(payload),
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [BLOGS_KEY] });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateBlogRequest }) => {
      const { data } = await axiosInstance.put<BlogApiResponse<BlogItem>>(
        `/api/blogs/${id}`,
        blogFormData(payload),
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return data;
    },
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: [BLOGS_KEY] });
      queryClient.invalidateQueries({ queryKey: [BLOGS_KEY, id] });
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete<BlogApiResponse<boolean>>(`/api/blogs/${id}`);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [BLOGS_KEY] });
    },
  });
}

export function useCreateBlogSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ blogId, payload }: { blogId: string; payload: CreateBlogSectionRequest }) => {
      const { data } = await axiosInstance.post<BlogApiResponse<BlogSection>>(
        `/api/blogs/${blogId}/sections`,
        sectionFormData(payload),
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return data;
    },
    onSuccess: (data, { blogId }) => {
      queryClient.invalidateQueries({ queryKey: [BLOGS_KEY] });
      queryClient.invalidateQueries({ queryKey: [BLOGS_KEY, blogId] });
    },
  });
}

export function useUpdateBlogSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      blogId,
      sectionId,
      payload,
    }: {
      blogId: string;
      sectionId: string;
      payload: UpdateBlogSectionRequest;
    }) => {
      const { data } = await axiosInstance.put<BlogApiResponse<BlogSection>>(
        `/api/blogs/${blogId}/sections/${sectionId}`,
        sectionFormData(payload),
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return data;
    },
    onSuccess: (data, { blogId }) => {
      queryClient.invalidateQueries({ queryKey: [BLOGS_KEY] });
      queryClient.invalidateQueries({ queryKey: [BLOGS_KEY, blogId] });
    },
  });
}

export function useDeleteBlogSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ blogId, sectionId }: { blogId: string; sectionId: string }) => {
      const { data } = await axiosInstance.delete<BlogApiResponse<boolean>>(
        `/api/blogs/${blogId}/sections/${sectionId}`
      );
      return data;
    },
    onSuccess: (data, { blogId }) => {
      queryClient.invalidateQueries({ queryKey: [BLOGS_KEY] });
      queryClient.invalidateQueries({ queryKey: [BLOGS_KEY, blogId] });
    },
  });
}

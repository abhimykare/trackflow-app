import { apiClient } from '../config/api';
import { useQuery } from '@tanstack/react-query';

export interface Category {
  _id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  userId: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetCategoriesResponse {
  success: boolean;
  message: string;
  data: { categories: Category[] };
}

export interface CreateCategoryPayload {
  name: string;
  icon: string;
  color: string;
  description?: string;
}

export interface UpdateCategoryPayload {
  name?: string;
  icon?: string;
  color?: string;
  description?: string;
}

export const createCategory = async (payload: CreateCategoryPayload) => {
  const { data } = await apiClient.post('/categories', payload);
  return data;
};

export const updateCategory = async (
  categoryId: string,
  payload: UpdateCategoryPayload,
) => {
  const { data } = await apiClient.put(`/categories/${categoryId}`, payload);
  return data;
};

export const deleteCategory = async (categoryId: string) => {
  const { data } = await apiClient.delete(`/categories/${categoryId}`);
  return data;
};

export const useGetCategories = () => {
  return useQuery<GetCategoriesResponse, Error>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await apiClient.get<GetCategoriesResponse>('/categories');
      return data;
    },
  });
};
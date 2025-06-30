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

export const useGetCategories = () => {
  return useQuery<GetCategoriesResponse, Error>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await apiClient.get<GetCategoriesResponse>('/categories');
      return data;
    },
  });
};
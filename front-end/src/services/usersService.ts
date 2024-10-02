import axiosInstance from '../api/axios';

import { User } from '../types';
interface FetchUsersParams {
  page: number;
  pageSize: number;
  search: string;
}

interface FetchUsersResponse {
  users: User[];
  meta: {
    totalCount: number;
  };
}

export const userService = {
  fetchUsers: async ({ page, pageSize, search }: FetchUsersParams): Promise<FetchUsersResponse> => {
    const response = await axiosInstance.get('/users', {
      params: { page, pageSize, search }
    });
    return response.data;
  },

  updateUser: async (user: User): Promise<void> => {
    await axiosInstance.post('/users/update', user);
  },

  createUser: async (user: User): Promise<void> => {
    await axiosInstance.post('/users/save', user);
  },
  
  fetchUserById: async (id: number): Promise<User> => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  }
};
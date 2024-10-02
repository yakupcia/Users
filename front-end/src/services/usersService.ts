import axiosInstance from '../api/axios';

interface User {
  id?: number;
  name: string;
  surname: string;
  email: string;
  phone?: string;
  age?: number;
  country?: string;
  district?: string;
  role?: string;
}

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
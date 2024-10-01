export interface User {
  id?: number; // Auto Increment, PK
  name: string;
  surname: string;
  email: string; // Unique
  password: string;
  phone?: string;
  age?: number;
  country?: string;
  district?: string;
  role?: string;
  createdAt?: Date; // Date
  updatedAt?: Date; // Date
}

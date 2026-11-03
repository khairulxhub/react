export interface User {
  id: number;
  name: string;
  role_id?: number | any;
  role?: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  created_at?: string;
  updated_at?: string;
}

export const defaultUser: User = {
  id: 0,
  name: "",
  email: "",
  role_id: 0,
  password: "",
  password_confirmation: "",
};

export const errorUser: User = {
  id: 0,
  name: "",
  email: "",
  role_id: 0,
  password: "",
  password_confirmation: "",
};

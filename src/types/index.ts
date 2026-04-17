export type Role = 'user' | 'agent' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}
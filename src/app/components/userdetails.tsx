// types.ts
export interface User {
  id: number;
  backendId: string; // Ensure this is a string everywhere
  name: string;
  email: string;
  username: string;
  type: string;
  status: string;
  profilePicture?: string; // Optional field
}

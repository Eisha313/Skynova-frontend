// types.ts
export interface User {
  id: number;
  backendId: string; 
  name: string;
  email: string;
  username: string;
  type: string;
  status: string;
  profilePicture?: string; 
}

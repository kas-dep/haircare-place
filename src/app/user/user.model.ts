import { Error } from '../model/common.model';

export interface User {
  id: number;
  nick: string;
  firstName: string;
  lastName: string;
  email: string;
  hairType: string;
}

export interface UserResponse {
  user: User;
  error: Error;
}

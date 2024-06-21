import { Role } from './user_roles';

export interface User {
    userId?: string;
    userName: string;
    userPassword: string;
    role: Role;
}
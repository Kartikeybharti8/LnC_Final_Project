import { Role } from './user_roles';

export interface User {
    readonly id: string;
    username: string;
    role: Role;
}
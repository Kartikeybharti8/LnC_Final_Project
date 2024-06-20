import { User } from './user';
import { Role } from './user_roles';

export class Employee implements User {
    public role: Role;
    constructor(public id: string, public username: string) {
        this.id = id;
        this.username = username;
        this.role = Role.EMPLOYEE;
    }
}
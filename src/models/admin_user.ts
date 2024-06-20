import { User } from './user';
import { Role } from './user_roles';

export class Admin implements User {
    public role: Role;
    constructor(public userId: string, public userPassword: string, public userName: string) {
        this.userId = userId;
        this.userName = userName;
        this.userPassword = userPassword;
        this.role = Role.ADMIN;
    }
}
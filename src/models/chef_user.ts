import { User } from './user';
import { Role } from './user_roles';

export class Chef implements User {
    public role: Role;
    constructor( public userPassword: string,public userName: string) {
        this.userName = userName;
        this.userPassword = userPassword;
        this.role = Role.CHEF;
    }
}
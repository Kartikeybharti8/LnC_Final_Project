// src/services/UserService.ts
import { User } from '../models/user';
import { Admin } from '../models/admin_user';
import { Chef } from '../models/chef_user';
import { Employee } from '../models/employee_user';
import { Role } from '../models/user_roles';

class UserService {
    private users: User[] = [];

    addUser(username: string, role: Role): User | string {
        const userId = String(Math.random() * 7);
        let newUser: User;

        switch (role) {
            case Role.ADMIN:
                newUser = new Admin(userId, username);
                break;
            case Role.CHEF:
                newUser = new Chef(userId, username);
                break;
            case Role.EMPLOYEE:
                newUser = new Employee(userId, username);
                break;
            default:
                return 'Invalid role. Please enter admin, chef, or employee.';
        }

        this.users.push(newUser);
        return newUser;
    }

    findUser(username: string): User | null {
        return this.users.find(u => u.username === username) || null;
    }
}

export default new UserService();

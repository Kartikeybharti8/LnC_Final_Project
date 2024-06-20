// src/services/UserService.ts
import { User } from '../models/user';
import { Role } from '../models/user_roles';

class UserService {
    private users: User[] = [
        { id: "1", userName: 'Ramesh', userPassword: 'Ramesh@123', role: Role.ADMIN },
        { id: "2", userName: 'Kartikey', userPassword: 'Kartikey@123', role: Role.ADMIN }
    ];

    findUser(userName: string, userPassword: string): User | null {
        const user = this.users.find(u => u.userName === userName && u.userPassword === userPassword);
        return user || null;
    }
}
export default new UserService();

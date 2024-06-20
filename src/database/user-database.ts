import { User } from '../models/user';

class Database {
    private users: User[] = [];

    addUser(user: User): void {
        this.users.push(user);
    }

    findUserByUsername(username: string): User | undefined {
        return this.users.find(user => user.username === username);
    }
}

export default new Database();

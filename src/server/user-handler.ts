import { WebSocket } from 'ws';
import { User } from '../models/user';
import UserDatabaseManagement from './database/user-database';

class UserHandler {
    private userDb: UserDatabaseManagement;

    constructor() {
        this.userDb = new UserDatabaseManagement();
    }

    async handleLogin(ws: WebSocket, data: any) {
        const { userName, userPassword } = data;
        const user: User = await this.userDb.fetchUserFromDb(userName, userPassword);
        if (user) {
            ws.send(JSON.stringify({ action: 'login', data: user }));
        } else {
            ws.send(JSON.stringify({ action: 'noUserFound', data: 'User not found.' }));
        }
    }

    async handleLogout(ws: WebSocket, data: any){
            console.log("Client disconnected");
            ws.send(JSON.stringify({ action: 'logout', data: "You got successfully logged out" }));
    };

    async handleAddUser(ws: WebSocket, data: any) {
        const { userName, userPassword, role } = data;
        try {
            await this.userDb.addUserToDb(userName, userPassword, role);
            ws.send(JSON.stringify({ action: 'addedUser', data: ['User added successfully.', data] }));
        } catch (error) {
            ws.send(JSON.stringify({ action: 'error', data: 'Failed to add user.' }));
        }
    }

    async handleUpdateProfileWithPreferences(ws: WebSocket, data: any) {
        const user = data[1];
        const preferences = data[0];
        const userId = user.userId;
        console.log("Preference:", preferences," userId:", userId);
        try {
            await this.userDb.updateUserPreferenceDb(userId, preferences);
            ws.send(JSON.stringify({ action: 'updatedUserPreference', data: user}));
        } catch (error) {
            ws.send(JSON.stringify({ action: 'error', data: 'Failed to add user preference.' }));
        }
    }
}

export default UserHandler;

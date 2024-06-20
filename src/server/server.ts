import { WebSocketServer, WebSocket } from 'ws';
import UserDatabaseManagement from '../database/user-database';
import { User } from '../models/user';

export interface CustomMessage {
    action: string;
    data: any;
}

class Server {
    private wss: WebSocketServer;

    constructor(port: number) {
        this.wss = new WebSocketServer({ port });

        this.wss.on('connection', (ws: WebSocket) => {
            console.log('New client connected');

            ws.on('message', (message: string) => {
                try {
                    const parsedMessage: CustomMessage = JSON.parse(message);
                    this.handleClientMessage(ws, parsedMessage);
                } catch (error) {
                    ws.send(JSON.stringify({ action: 'error', data: 'Invalid message format.' }));
                }
            });

            ws.on('close', () => {
                console.log('Client disconnected');
            });
        });

        console.log(`WebSocket server is running on ws://localhost:${port}`);
    }

    async  handleClientMessage(ws: WebSocket, message: CustomMessage) {
        const { action, data } = message;        
        if (action === 'login') {
            this.handleLogin(ws, data);
        } else {
            ws.send(JSON.stringify({ action: 'error', data: 'Unknown action.' }));
        }
    }
    

    private async handleLogin(ws: WebSocket, data: any) {
        const userName = data.userName;
        const userPassword = data.userPassword;
        const userDb = new UserDatabaseManagement();
        const user: User = await userDb.fetchUserFromDb(userName, userPassword);
        if (user) {
            ws.send(JSON.stringify({ action: 'login', data: user}));
        } else {
            ws.send(JSON.stringify({ action: 'error', data: 'User not found..' }));
        }
    }
}

export default Server;

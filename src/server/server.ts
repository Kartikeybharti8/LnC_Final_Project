import { WebSocketServer, WebSocket } from 'ws';
import UserService from '../services/new_user_addition_service';

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
            ws.send(JSON.stringify({ action: 'message', data: 'Welcome! Please choose to login or sign up.' }));

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

    private handleClientMessage(ws: WebSocket, message: CustomMessage) {
        const { action, data } = message;

        switch (action) {
            case 'login':
                this.handleLogin(ws, data);
                break;
            case 'signup':
                this.handleSignUp(ws, data);
                break;
            default:
                ws.send(JSON.stringify({ action: 'error', data: 'Unknown action.' }));
        }
    }

    private handleLogin(ws: WebSocket, data: any) {
        const { username } = data;
        const user = UserService.findUser(username);
        if (user) {
            ws.send(JSON.stringify({ action: 'login', data: `Login successful. Welcome back, ${user.username} (Role: ${user.role})` }));
        } else {
            ws.send(JSON.stringify({ action: 'error', data: 'User not found. Please sign up.' }));
        }
    }

    private handleSignUp(ws: WebSocket, data: any) {
        const { username, role } = data;
        const newUser = UserService.addUser(username, role);
        if (typeof newUser === 'string') {
            ws.send(JSON.stringify({ action: 'error', data: newUser }));
        } else {
            ws.send(JSON.stringify({ action: 'signup', data: `User created: ${newUser.username} (Role: ${newUser.role})` }));
        }
    }
}

export default Server;

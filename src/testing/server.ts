import { WebSocketServer, WebSocket } from 'ws';

enum Role {
    ADMIN = 'admin',
    CHEF = 'chef',
    EMPLOYEE = 'employee'
}

interface User {
    readonly id: string;
    username: string;
    role: Role;
}

class Employee implements User {
    public role: Role;
    constructor(public id: string, public username: string) {
        this.id = id;
        this.username = username;
        this.role = Role.EMPLOYEE;
    }
}

class Chef implements User {
    public role: Role;
    constructor(public id: string, public username: string) {
        this.id = id;
        this.username = username;
        this.role = Role.CHEF;
    }
}

class Admin implements User {
    public role: Role;
    constructor(public id: string, public username: string) {
        this.id = id;
        this.username = username;
        this.role = Role.ADMIN;
    }
}

const users: User[] = [];

const wss = new WebSocketServer({ port: 8090 });

interface CustomMessage {
    action: string;
    data: any;
}

wss.on('connection', (ws: WebSocket) => {
    console.log('New client connected');
    ws.send(JSON.stringify({ action: 'message', data: 'Welcome! Please choose to login or sign up.' }));

    ws.on('message', (message: string) => {
        try {
            const parsedMessage: CustomMessage = JSON.parse(message);
            handleClientMessage(ws, parsedMessage);
        } catch (error) {
            ws.send(JSON.stringify({ action: 'error', data: 'Invalid message format.' }));
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

const handleClientMessage = (ws: WebSocket, message: CustomMessage) => {
    const { action, data } = message;

    switch (action) {
        case 'login':
            handleLogin(ws, data);
            break;
        case 'signup':
            handleSignUp(ws, data);
            break;
        default:
            ws.send(JSON.stringify({ action: 'error', data: 'Unknown action.' }));
    }
};

const handleLogin = (ws: WebSocket, data: any) => {
    const { username } = data;
    const user = users.find(u => u.username === username);
    if (user) {
        ws.send(JSON.stringify({ action: 'login', data: `Login successful. Welcome back, ${user.username} (Role: ${user.role})` }));
    } else {
        ws.send(JSON.stringify({ action: 'error', data: 'User not found. Please sign up.' }));
    }
};

const handleSignUp = (ws: WebSocket, data: any) => {
    const { username, role } = data;
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
            ws.send(JSON.stringify({ action: 'error', data: 'Invalid role. Please enter admin, chef, or employee.' }));
            return;
    }

    users.push(newUser);
    ws.send(JSON.stringify({ action: 'signup', data: `User created: ${newUser.username} (Role: ${newUser.role})` }));
};

console.log('WebSocket server is running on ws://localhost:8090');

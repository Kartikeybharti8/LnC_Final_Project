import WebSocket from 'ws';
import { CustomMessage } from '../server/server';
import { RoleOptionsHandler } from './role-options-handler';
import { getInput } from './input-handler';


const ws = new WebSocket('ws://localhost:8090');
const roleOptionsHandler = new RoleOptionsHandler(ws);

ws.on('open', () => {
    console.log('Connected to the server');
    promptUserForLogin();
});

ws.on('message', (message: string) => {
    try {
        const parsedMessage: CustomMessage = JSON.parse(message);
        handleServerMessage(parsedMessage);
    } catch (error) {
        console.log('Received invalid message format from server.');
    }
});

ws.on('close', () => {
    console.log('Disconnected from the server');
});

const promptUserForLogin = async() => {
    console.log("Please login to your account 1st")
    const userName = await getInput("Enter your username: ");
    const userPassword = await getInput("Enter your password: ");
    const message: CustomMessage = { action: 'login', data: { userName, userPassword } };
    ws.send(JSON.stringify(message));
};

const handleServerMessage = (message: CustomMessage) => {
    switch (message.action) {
        case 'message':
            console.log(`Server: ${message.data}`);
            break;
        case 'login':
            const user = message.data;
            proceedAfterLogin(user);
            break;
        case 'addedUser':
            console.log(`Server: ${message.data}`);
            roleOptionsHandler.showOptions("Admin");
            break;
        case 'updatedMenuPrice':
            console.log(`Server: ${message.data}`);
            roleOptionsHandler.showOptions("Admin");
            break;
        case 'updatedMenuStatus':
            console.log(`Server: ${message.data}`);
            roleOptionsHandler.showOptions("Admin");
            break;
        case 'viewMenuItems':
            console.log("Menu Items from db:")
            console.table(message.data)
            roleOptionsHandler.showOptions("Admin");
            break;
        case 'recommendMenuToRollOut':
            console.log("Menu Items to Roll Out:")
            console.table(message.data)
            roleOptionsHandler.showOptions("Chef");
            break;
        case 'addedEmployeeFeedback':
            console.log(`Server: ${message.data}`);
            roleOptionsHandler.showOptions("Employee");
            break;
        case 'rolloutMenuNotify':
            console.log(`Server: ${message.data}`);
            roleOptionsHandler.showOptions("Chef");
            break;
        case 'error':
            console.log(`Error: ${message.data}`);
            break;
        default:
            console.log('Unknown action received from server.');
    }
};

const proceedAfterLogin = (user: { userName: string; role: string }) => {
    console.log(`Welcome ${user.userName}, Role: ${user.role}`);
    roleOptionsHandler.showOptions(user.role);
};

console.log('WebSocket client is running');

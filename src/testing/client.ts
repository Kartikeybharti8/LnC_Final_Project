import WebSocket from 'ws';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ws = new WebSocket('ws://localhost:8090');

// Connection opened
ws.on('open', () => {
    console.log('Connected to the server');
});

// Listen for messages
ws.on('message', (message: string) => {
    try {
        const parsedMessage: CustomMessage = JSON.parse(message);
        handleServerMessage(parsedMessage);
    } catch (error) {
        console.log('Received invalid message format from server.');
    }
});

// Handle connection close
ws.on('close', () => {
    console.log('Disconnected from the server');
    rl.close();
});

interface CustomMessage {
    action: string;
    data: any;
}

const promptUser = () => {
    rl.question('Enter Your Choice:\n', (option) => {
        if (option === 'login' || option === 'signup') {
            handleUserOption(option);
        } else {
            console.log('Invalid option. Please type "login" or "signup".');
            promptUser();
        }
    });
};

const handleUserOption = (option: string) => {
    if (option === 'login') {
        rl.question('Enter your username: ', (username) => {
            const message: CustomMessage = { action: 'login', data: { username } };
            ws.send(JSON.stringify(message));
        });
    } else if (option === 'signup') {
        rl.question('Enter a username: ', (username) => {
            rl.question('Enter your role (admin, chef, employee): ', (role) => {
                const message: CustomMessage = { action: 'signup', data: { username, role } };
                ws.send(JSON.stringify(message));
            });
        });
    }
};

const handleServerMessage = (message: CustomMessage) => {
    switch (message.action) {
        case 'message':
            console.log(`server: ${message.data}`)
            promptUser();
            break;
        case 'login':
            console.log(`server: ${message.data}`)
            break;
        case 'signup':
            console.log(`Server: ${message.data}`);
            promptUser();
            break;
        case 'error':
            console.log(`Error: ${message.data}`);
            promptUser();
            break;
        default:
            console.log('Unknown action received from server.');
            promptUser();
    }
};

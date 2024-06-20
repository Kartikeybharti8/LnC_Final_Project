import WebSocket from 'ws';
import * as readline from 'readline';
import { CustomMessage } from '../server/server';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ws = new WebSocket('ws://localhost:8090');

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
    rl.close();
});

const promptUserForLogin = () => {
    console.log("Please login to your account 1st")
    rl.question('\nEnter your username: ', (userName) => {
        rl.question('Enter your password: ', (userPassword) => {
            const message: CustomMessage = { action: 'login', data: { userName, userPassword } };
            ws.send(JSON.stringify(message));
        });
    });
};


const handleServerMessage = (message: CustomMessage) => {
    switch (message.action) {
        case 'message':
            console.log(`Server: ${message.data}`);
            break;
        case 'login':
            // console.log(`Server: ${message.data}`);
            const user = message.data;
            console.log(user);
            promtAfterLogin(user);
            break;
        case 'error':
            console.log(`Error: ${message.data}`);
            break;
        default:
            console.log('Unknown action received from server.');
    }
};

const promtAfterLogin = (user: { userName: string; role: string }) => {
    console.log(`Welcome ${user.userName}, Role: ${user.role}`);
    switch (user.role) {
        case 'Admin':
            showAdminOptions();
            break;
        case 'Employee':
            showEmployeeOptions();
            break;
        case 'Chef':
            showChefOptions();
            break;
        default:
            console.log('Unknown role.');
    }
};

const showAdminOptions = () => {
    console.log('Admin Options:');
    console.log('1. Add User');
    console.log('2. Add Menu Item');
    console.log('3. Delete Menu Item');
    rl.question('Choose an option: ', (option) => {
        // Handle admin options here
        // Example:
        // if (option === '1') {
        //     // Add User
        // } else if (option === '2') {
        //     // Add Menu Item
        // }
        rl.close(); // Close readline for this example, handle appropriately in real use
    });
};

const showEmployeeOptions = () => {
    console.log('Employee Options:');
    console.log('1. View Menu');
    console.log('2. Select Food for Menu');
    console.log('3. Provide Feedback');
    rl.question('Choose an option: ', (option) => {
        // Handle employee options here
        // Example:
        // if (option === '1') {
        //     // View Menu
        // } else if (option === '2') {
        //     // Select Food for Menu
        // } else if (option === '3') {
        //     // Provide Feedback
        // }
        rl.close(); // Close readline for this example, handle appropriately in real use
    });
};

const showChefOptions = () => {
    console.log('Chef Options:');
    console.log('1. Roll Out Menu');
    console.log('2. View Employee Feedback');
    rl.question('Choose an option: ', (option) => {
        // Handle chef options here
        // Example:
        // if (option === '1') {
        //     // Roll Out Menu
        // } else if (option === '2') {
        //     // View Employee Feedback
        // }
        rl.close(); // Close readline for this example, handle appropriately in real use
    });
};

console.log('WebSocket client is running');

import { CustomMessage } from '../../server/web-socket-server';
import { RoleOptionsHandler } from '../role-options-handler/role-options-handler';
import { getInput } from '../input-handler';
import WebSocket from 'ws';
import { AdminMessageHandler } from './admin-message-handler';
import { ChefMessageHandler } from './chef-message-handler';
import { EmployeeMessageHandler } from './employee-message-handler';

export class MessageHandler {
    ws: WebSocket;
    private roleOptionsHandler: RoleOptionsHandler;
    private adminHandler: AdminMessageHandler;
    private chefHandler: ChefMessageHandler;
    private employeeHandler: EmployeeMessageHandler;

    constructor(ws: WebSocket) {
        this.ws = ws;
        this.roleOptionsHandler = new RoleOptionsHandler(ws);
        this.adminHandler = new AdminMessageHandler(this.roleOptionsHandler);
        this.chefHandler = new ChefMessageHandler(this.roleOptionsHandler);
        this.employeeHandler = new EmployeeMessageHandler(this.roleOptionsHandler);
    }

    public handleServerMessage = (message: CustomMessage) => {
        switch (message.action) {
            case 'message':
                this.handleMessage(message.data);
                break;
            case 'login':
                this.handleLogin(message.data);
                break;
            case 'logout':
                this.handleLogout(message.data);
                break;
            case 'addedUser':
                this.adminHandler.handleAddedUser(message.data);
                break;
            case 'addedMenuItem':
                this.adminHandler.handleAddedMenuItem(message.data);
                break;
            case 'updatedMenuPrice':
                this.adminHandler.handleUpdatedMenuPrice(message.data);
                break;
            case 'updatedMenuStatus':
                this.adminHandler.handleUpdatedMenuStatus(message.data);
                break;
            case 'viewMenuItems':
                this.adminHandler.handleViewMenuItems(message.data);
                break;
            case 'recommendMenuToRollOut':
                this.chefHandler.handleRecommendMenuToRollOut(message.data);
                break;
            case 'addedEmployeeFeedback':
                this.employeeHandler.handleAddedEmployeeFeedback(message.data);
                break;
            case 'rolloutMenuNotify':
                this.chefHandler.handleRolloutMenuNotify(message.data);
                break;
            case 'viewRolledOutMenu':
                this.employeeHandler.handleViewRolledOutMenu(message.data);
                break;
            case 'viewMenuItemsWithEmployeeVotes':
                this.chefHandler.handleViewMenuItemsWithEmployeeVotes(message.data);
                break;
            case 'voteRollOutMenuItem':
                this.employeeHandler.handleVoteRollOutMenuItem(message.data);
                break;
            case 'error':
                this.handleError(message.data);
                break;
            default:
                this.handleUnknownAction();
        }
    };

    public handleMessage = (data: any) => {
        console.log(`Server: ${data}`);
    };

    public handleLogin = (user: any) => {
        this.proceedAfterLogin(user);
    };

    public handleLogout = (data: any) => {
        console.log(`Server: ${data}`);
        this.promptUserForLogin();
    };

    public async promptUserForLogin() {
        console.log("Please login to your account first");
        const userName = await getInput("Enter your username: ");
        const userPassword = await getInput("Enter your password: ");
        const message: CustomMessage = { action: 'login', data: { userName, userPassword } };
        this.ws.send(JSON.stringify(message));
    }

    private proceedAfterLogin(user: { userName: string; role: string }) {
        console.log(`Welcome ${user.userName}, Role: ${user.role}`);
        this.roleOptionsHandler.showOptions(user.role);
    }

    public handleError = (data: any) => {
        console.log(`Error: ${data}`);
    };

    public handleUnknownAction = () => {
        console.log('Unknown action received from server.');
    };
}

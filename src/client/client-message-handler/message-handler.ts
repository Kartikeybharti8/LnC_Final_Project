import { CustomMessage } from '../../server/web-socket-server';
import { RoleOptionsHandler } from '../role-options-handler/role-options-handler';
import InputReader from '../input-handler';
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
    private inputReader: InputReader;

    constructor(ws: WebSocket, inputReader: InputReader) {
        this.ws = ws;
        this.roleOptionsHandler = new RoleOptionsHandler(ws, inputReader);
        this.adminHandler = new AdminMessageHandler(this.roleOptionsHandler);
        this.chefHandler = new ChefMessageHandler(this.roleOptionsHandler);
        this.employeeHandler = new EmployeeMessageHandler(this.roleOptionsHandler);
        this.inputReader = inputReader;
    }

    public handleServerMessage = (message: CustomMessage) => {
        switch (message.action) {
            case 'login':
                this.handleLogin(message.data);
                break;
            case 'logout':
                this.handleLogout(message.data);
                break;
            case 'noUserFound':
                this.handleNoUserFound(message.data);
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
            case 'viewMenuItemsAdmin':
                this.adminHandler.handleViewMenuItemsAdmin(message.data);
                break;
            case 'viewMenuItemsChef':
                this.chefHandler.handleViewMenuItemsChef(message.data);
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
            case 'viewEmployeeToBeDiscardedMenuItemList':
                this.employeeHandler.viewEmployeeToBeDiscardedMenuItemList(message.data);
                break;
            case 'viewMenuItemsWithEmployeeVotes':
                this.chefHandler.handleViewMenuItemsWithEmployeeVotes(message.data);
                break;
            case 'voteRollOutMenuItem':
                this.employeeHandler.handleVoteRollOutMenuItem(message.data);
                break;
            case 'viewChefToBeDiscardedMenuItemList':
                this.chefHandler.handleChefToBeDiscardedMenuItemList(message.data);
                break;
            case 'discardMenuItem':
                this.chefHandler.handleDiscardMenuItem(message.data);
                break;
            case 'viewSuggestions':
                this.chefHandler.handleViewDiscardItemsSuggestions(message.data);
                break;
            case 'addedEmployeeSuggestion':
                this.employeeHandler.handleAddedEmployeeSuggestion(message.data);
                break;
            case 'updatedUserPreference':
                this.employeeHandler.handleUpdatedUserPreference(message.data);
                break;
            case 'error':
                this.handleError(message.data);
                break;
            default:
                this.handleUnknownAction();
        }
    };

    public handleLogin = (user: any) => {
        this.proceedAfterLogin(user);
    };

    public handleLogout = (data: any) => {
        console.log(`Server: ${data}`);
        this.promptUserForLogin();
    };

    public handleNoUserFound = (data: any) => {
        console.log(`Server: ${data}`);
        this.promptUserForLogin();
    };

    public async promptUserForLogin() {
        console.log("Please login to your account first");
        const userName = await this.inputReader.getInput("Enter your username: ");
        const userPassword = await this.inputReader.getInput("Enter your password: ");
        const message: CustomMessage = { action: 'login', data: { userName, userPassword } };
        this.ws.send(JSON.stringify(message));
    }

    private proceedAfterLogin(user: any) {
        console.log(`Welcome ${user.userName}, Role: ${user.role}`);
        this.roleOptionsHandler.showOptions(user);
    }

    public handleError = (data: any) => {
        console.log(`Error: ${data}`);
    };

    public handleUnknownAction = () => {
        console.log('Unknown action received from server cannot continue.');
    };
}

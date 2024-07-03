import WebSocket from 'ws';
import { getInput } from './../input-handler';
import { CustomMessage } from '../../server/web-socket-server';

export class ChefOptionsHandler {
    private ws: WebSocket;

    constructor(ws: WebSocket) {
        this.ws = ws;
    }

    public async showOptions() {
        console.log("Chef Options:");
        console.log("1. View Recommended Items to Roll Out");
        console.log("2. Roll Out Menu");
        console.log("3. View Employee Votes");
        console.log("4. Logout");
        const option = await getInput("Choose an option by index: ");
        switch (option) {
            case "1":
                await this.recommendMenuToRollOut();
                break;
            case "2":
                await this.rollOutMenu();
                break;
            case "3":
                await this.viewEmployeeVotes();
                break;
            case "4":
                await this.logout();
                break;
            default:
                console.log("Invalid option.");
                await this.showOptions();
        }
    }

    private async recommendMenuToRollOut() {
        const message: CustomMessage = { action: 'recommendMenuToRollOut', data: [] };
        this.ws.send(JSON.stringify(message));
        console.log("View Recommended Menu for roll out.");
    }

    private async rollOutMenu() {
        const itemId = await getInput("Enter food ItemId: ");
        const customObjective = "RolloutItem";
        const notificationMessage = { itemId, customObjective };
        const message: CustomMessage = { action: 'rolloutMenuNotify', data: notificationMessage };
        this.ws.send(JSON.stringify(message));
        console.log("Roll out menu item request sent to server.");
    }

    private async viewEmployeeVotes() {
        const message: CustomMessage = { action: 'viewEmployeeVotes', data: [] };
        this.ws.send(JSON.stringify(message));
        console.log("View Employee Votes request sent to server.");
    }

    private async logout() {
        const message: CustomMessage = { action: 'logout', data: [] };
        this.ws.send(JSON.stringify(message));
        console.log('Logout request sent to server');
    }
}

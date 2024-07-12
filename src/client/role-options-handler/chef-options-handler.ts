import WebSocket from 'ws';
import InputReader from './../input-handler';
import { CustomMessage } from '../../server/web-socket-server';

export class ChefOptionsHandler {
    private ws: WebSocket;
    private inputReader: InputReader;


    constructor(ws: WebSocket, inputReader: InputReader) {
        this.ws = ws;
        this.inputReader = inputReader;
    }

    public async showOptions() {
        console.log("Chef Options:");
        console.log("1. View Recommended Items to Roll Out");
        console.log("2. Roll Out Menu");
        console.log("3. View Employee Votes");
        console.log("4. View items to Discard");
        console.log("5. Rollout Items to Employees before discard");
        console.log("6. Discard Item from Menu-Items")
        console.log("7. Logout");
        const option = await this.inputReader.getInput("Choose an option by index: ");
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
                await this.viewToBeDiscardedMenuItemList();
                break;
            case "5":
                await this.rolloutDiscardItemforFeedback();
                break;
            case "6":
                await this.discardMenuItem();
                break;
            case "7":
                await this.logout();
                break;
            default:
                console.log("Invalid option.");
                await this.showOptions();
        }
    }
    private async viewToBeDiscardedMenuItemList() {
        const message: CustomMessage = { action: 'viewToBeDiscardedMenuItemList', data: [] };
        this.ws.send(JSON.stringify(message));
        console.log("View discard items request sent to server.");
    }

    private async discardMenuItem() {
        const itemId = await this.inputReader.getInput("Enter food ItemId: ");
        const message: CustomMessage = { action: 'discardMenuItem', data: itemId };
        this.ws.send(JSON.stringify(message));
        console.log("Discard item request sent to server.");
    }

    private async rolloutDiscardItemforFeedback() {
        throw new Error('Function not implemented.');
    }

    private async recommendMenuToRollOut() {
        const message: CustomMessage = { action: 'recommendMenuToRollOut', data: [] };
        this.ws.send(JSON.stringify(message));
        console.log("View Recommended Menu for roll out.");
    }

    private async rollOutMenu() {
        const itemId = await this.inputReader.getInput("Enter food ItemId: ");
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


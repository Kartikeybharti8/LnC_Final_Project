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

    public async showOptions(user: any) {
        console.log("Chef Options:");
        console.log("1. View Recommended Items to Roll Out");
        console.log("2. Roll Out Menu");
        console.log("3. View Employee Votes");
        console.log("4. View items to Discard");
        console.log("5. Rollout Items to Employees before discard");
        console.log("6. View Employees Suggestions before discard")
        console.log("7. Discard Item from Menu-Items")
        console.log("8. Logout");
        const option = await this.inputReader.getInput("Choose an option by index: ");
        switch (option) {
            case "1":
                await this.recommendMenuToRollOut(user);
                break;
            case "2":
                await this.rollOutMenu(user);
                break;
            case "3":
                await this.viewEmployeeVotes(user);
                break;
            case "4": 
                await this.viewToBeDiscardedMenuItemList(user);
                break;
            case "5":
                await this.rolloutDiscardItemforFeedback(user);
                break;
            case "6":
                await this.viewDisacrdListSuggestions(user);
                break;
            case "7":
                await this.discardMenuItem(user);
                break;
            case "8":
                await this.logout();
                break;
            default:
                console.log("Invalid option.");
                await this.showOptions(user);
        }
    }

    private async viewDisacrdListSuggestions(user: any) {
        const message: CustomMessage = { action: 'viewDisacrdListSuggestions', data: [user] };
        this.ws.send(JSON.stringify(message));
        console.log("View discard items suggestions request sent to server.");
    }
    
    private async viewToBeDiscardedMenuItemList(user: any) {
        const message: CustomMessage = { action: 'viewToBeDiscardedMenuItemList', data: [user] };
        this.ws.send(JSON.stringify(message));
        console.log("View discard items request sent to server.");
    }

    private async discardMenuItem(user: any) {
        const itemId = await this.inputReader.getInput("Enter food ItemId: ");
        const message: CustomMessage = { action: 'discardMenuItem', data: [itemId, user] };
        this.ws.send(JSON.stringify(message));
        console.log("Discard item request sent to server.");
    }

    private async rolloutDiscardItemforFeedback(user: any) {
        const itemId = await this.inputReader.getInput("Enter food ItemId: ");
        const customObjective = "DeleteItem";
        const notificationMessage = { itemId, customObjective };
        const message: CustomMessage = { action: 'rolloutMenuNotify', data: [notificationMessage, user] };
        this.ws.send(JSON.stringify(message));
        console.log("Discard menu item rollout request sent to server.");
    }

    private async recommendMenuToRollOut(user: any) {
        const message: CustomMessage = { action: 'recommendMenuToRollOut', data: [user] };
        this.ws.send(JSON.stringify(message));
        console.log("View Recommended Menu for roll out.");
    }

    private async rollOutMenu(user: any) {
        const itemId = await this.inputReader.getInput("Enter food ItemId: ");
        const customObjective = "RolloutItem";
        const notificationMessage = { itemId, customObjective };
        const message: CustomMessage = { action: 'rolloutMenuNotify', data: [notificationMessage, user] };
        this.ws.send(JSON.stringify(message));
        console.log("Roll out menu item request sent to server.");
    }

    private async viewEmployeeVotes(user: any) {
        const message: CustomMessage = { action: 'viewEmployeeVotes', data: [user] };
        this.ws.send(JSON.stringify(message));
        console.log("View Employee Votes request sent to server.");
    }

    private async logout() {
        const message: CustomMessage = { action: 'logout', data: [] };
        this.ws.send(JSON.stringify(message));
        console.log('Logout request sent to server');
    }
}


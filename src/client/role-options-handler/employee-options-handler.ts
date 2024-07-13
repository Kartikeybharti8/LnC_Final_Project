import WebSocket from 'ws';
import InputReader from './../input-handler';
import { CustomMessage } from '../../server/web-socket-server';

export class EmployeeOptionsHandler {
    private ws: WebSocket;
    private inputReader: InputReader;

    constructor(ws: WebSocket, inputReader: InputReader) {
        this.ws = ws;
        this.inputReader = inputReader;
    }

    public async showOptions() {
        console.log("Employee Options:");
        console.log("1. View Rolled Out Menu");
        console.log("2. Vote for Item from Menu");
        console.log("3. Provide Menu Item Feedback");
        console.log("4. View menu list to be discarded");
        console.log("5. Provide Feedback to items before discard")
        console.log("6. Logout");
        const option = await this.inputReader.getInput("Choose an option by index: ");
        switch (option) {
            case "1":
                await this.viewRolledOutMenu();
                break;
            case "2":
                await this.voteRollOutMenuItem();
                break;
            case "3":
                await this.provideFeedback();
                break;
            case "4":
                await this.viewToBeDicardItem();
                break;
            case "5":
                await this.provideSuggestionsToDicardItem();
                break;
            case "6":
                await this.logout();
                break;
            default:
                console.log("Invalid option.");
                await this.showOptions();
        }
    }

    private async viewRolledOutMenu() {
        const message: CustomMessage = { action: 'viewRolledOutMenu', data: [] };
        this.ws.send(JSON.stringify(message));
        console.log("View Rolled Out Menu requested");
    }

    private async voteRollOutMenuItem() {
        const itemId = await this.inputReader.getInput("Enter food ItemId: ");
        const customObjective = "EmployeeVoted";
        const notificationMessage = { itemId, customObjective };
        const message: CustomMessage = { action: 'voteRollOutMenuItem', data: notificationMessage };
        this.ws.send(JSON.stringify(message));
        console.log("Vote for Roll out menu item request sent to server.");
    }

    private async viewToBeDicardItem() {
        const message: CustomMessage = { action: 'viewToBeDiscardedMenuItemList', data: ["Employee"] };
        this.ws.send(JSON.stringify(message));
        console.log("View discard menu item request send to server");
    }


    private async provideSuggestionsToDicardItem() {
        const itemId = await this.inputReader.getInput("Enter food ItemId: ");
        const foodName = await this.inputReader.getInput("Enter food name: ");
        const suggestions = await this.inputReader.getInput("Please enter suggestions to improve: ");
        const userSuggestions = { itemId, foodName, suggestions };
        const message: CustomMessage = { action: 'addEmployeeSuggestion', data: userSuggestions };
        this.ws.send(JSON.stringify(message));
        console.log("Discard menu item suggestions request sent to server.");
    }

    private async provideFeedback() {
        const itemId = await this.inputReader.getInput("Enter food ItemId: ");
        const foodName = await this.inputReader.getInput("Enter food name: ");
        const userRating = await this.inputReader.getInput("Enter food rating: ");
        const userComment = await this.inputReader.getInput("Enter food comment: ");

        const userFeedback = { itemId, foodName, userRating, userComment };
        const message: CustomMessage = { action: 'addEmployeeFeedback', data: userFeedback };
        this.ws.send(JSON.stringify(message));
        console.log("Menu item add request sent to server.");
    }

    private async logout() {
        const message: CustomMessage = { action: 'logout', data: [] };
        this.ws.send(JSON.stringify(message));
        console.log('Logout request sent to server');
    }
}

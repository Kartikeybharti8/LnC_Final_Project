import WebSocket from 'ws';
import { getInput } from './../input-handler';
import { CustomMessage } from '../../server/server';

export class EmployeeOptionsHandler {
    private ws: WebSocket;

    constructor(ws: WebSocket) {
        this.ws = ws;
    }

    public async showOptions() {
        console.log("Employee Options:");
        console.log("1. View Rolled Out Menu");
        console.log("2. Vote for Item from Menu");
        console.log("3. Provide Feedback");
        console.log("4. Logout");
        const option = await getInput("Choose an option by index: ");
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
        console.log("View Rolled Out Menu.");
    }

    private async voteRollOutMenuItem() {
        const itemId = await getInput("Enter food ItemId: ");
        const customObjective = "EmployeeVoted";
        const notificationMessage = { itemId, customObjective };
        const message: CustomMessage = { action: 'voteRollOutMenuItem', data: notificationMessage };
        this.ws.send(JSON.stringify(message));
        console.log("Vote for Roll out menu item request sent to server.");
    }

    private async provideFeedback() {
        const itemId = await getInput("Enter food ItemId: ");
        const foodName = await getInput("Enter food name: ");
        const userRating = await getInput("Enter food rating: ");
        const userComment = await getInput("Enter food comment: ");

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

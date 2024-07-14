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

    public async showOptions(user : any) {
        console.log("Employee Options:");
        console.log("1. View Rolled Out Menu");
        console.log("2. Vote for Item from Menu");
        console.log("3. Provide Menu Item Feedback");
        console.log("4. View menu list to be discarded");
        console.log("5. Provide Feedback to items before discard");
        console.log("6. Update your profile with your preferences")
        console.log("7. Logout");
        console.log(user)
        const option = await this.inputReader.getInput("Choose an option by index: ");
        switch (option) {
            case "1":
                await this.viewRolledOutMenu(user);
                break;
            case "2":
                await this.voteRollOutMenuItem(user);
                break;
            case "3":
                await this.provideFeedback(user);
                break;
            case "4":
                await this.viewToBeDicardItem(user);
                break;
            case "5":
                await this.provideSuggestionsToDicardItem(user);
                break;
            case "6":
                await this.updateProfileWithPreferences(user);
                break;
            case "7":
                await this.logout();
                break;
            default:
                console.log("Invalid option.");
                await this.showOptions(user);
        }
    }

    private async updateProfileWithPreferences(user: any) {
        const spiceLevel = await this.inputReader.getInput("Enter your spice levels (Low/Medium/High): ");
        const vegType = await this.inputReader.getInput("Are you (Veg/Non-Veg/Eggiterian): ");
        const sweet = await this.inputReader.getInput("Do you like sweet dishes(Yes/No): ");
        const foodOrigin = await this.inputReader.getInput("Enter your likeness in food (South-Indian/North-Indian/Continental/Chinese): ");
        
        const preferences =  { spiceLevel, vegType, sweet, foodOrigin };
        const message: CustomMessage = { action: 'updateProfileWithPreferences', data: [preferences, user] };
        this.ws.send(JSON.stringify(message));
        console.log("Update employee preference request sent to server.");
    }

    private async viewRolledOutMenu(user: any) {
        const message: CustomMessage = { action: 'viewRolledOutMenu', data: user };
        this.ws.send(JSON.stringify(message));
        console.log("View Rolled Out Menu requested");
    }

    private async voteRollOutMenuItem(user: any) {
        const itemId = await this.inputReader.getInput("Enter food ItemId: ");
        const customObjective = "EmployeeVoted";
        const notificationMessage = { itemId, customObjective };
        const message: CustomMessage = { action: 'voteRollOutMenuItem', data: [notificationMessage, user] };
        this.ws.send(JSON.stringify(message));
        console.log("Vote for Roll out menu item request sent to server.");
    }

    private async viewToBeDicardItem(user: any) {
        const message: CustomMessage = { action: 'viewToBeDiscardedMenuItemList', data: [user] };
        this.ws.send(JSON.stringify(message));
        console.log("View discard menu item request send to server");
    }


    private async provideSuggestionsToDicardItem(user: any) {
        const itemId = await this.inputReader.getInput("Enter food ItemId: ");
        const foodName = await this.inputReader.getInput("Enter food name: ");
        const suggestions = await this.inputReader.getInput("Please enter suggestions to improve: ");
        const userSuggestions = { itemId, foodName, suggestions };
        const message: CustomMessage = { action: 'addEmployeeSuggestion', data: [userSuggestions, user] };
        this.ws.send(JSON.stringify(message));
        console.log("Discard menu item suggestions request sent to server.");
    }

    private async provideFeedback(user: any) {
        const itemId = await this.inputReader.getInput("Enter food ItemId: ");
        const foodName = await this.inputReader.getInput("Enter food name: ");
        const userRating = await this.inputReader.getInput("Enter food rating: ");
        const userComment = await this.inputReader.getInput("Enter food comment: ");

        const userFeedback = { itemId, foodName, userRating, userComment };
        const message: CustomMessage = { action: 'addEmployeeFeedback', data: [userFeedback, user] };
        this.ws.send(JSON.stringify(message));
        console.log("Menu item add request sent to server.");
    }

    private async logout() {
        const message: CustomMessage = { action: 'logout', data: [] };
        this.ws.send(JSON.stringify(message));
        console.log('Logout request sent to server');
    }
}

import WebSocket from 'ws';
import InputReader from './../input-handler';
import { CustomMessage } from '../../server/web-socket-server';

export class AdminOptionsHandler {
    private ws: WebSocket;
    private inputReader: InputReader;

    constructor(ws: WebSocket, inputReader: InputReader) {
        this.ws = ws;
        this.inputReader = inputReader;
    }

    public async showOptions(user: any) {
        console.log("Admin Options:");
        console.log("1. Add User");
        console.log("2. Add Menu Item");
        console.log("3. Update Menu Item");
        console.log("4. View Menu Item");
        console.log("5. Logout");
        const option = await this.inputReader.getInput("Choose an option by index: ");
        switch (option) {
            case "1":
                await this.addUser();
                break;
            case "2":
                await this.addMenuItem(user);
                break;
            case "3":
                await this.updateMenuItem(user);
                break;
            case "4":
                await this.viewMenuItems(user);
                break;
            case "5":
                await this.logout();
                break;
            default:
                console.log("Invalid option.");
                await this.showOptions(user);
        }
    }

    private async addUser() {
        const userName = await this.inputReader.getInput("Enter username: ");
        const userPassword = await this.inputReader.getInput("Enter password: ");
        const role = await this.inputReader.getInput("Enter role (Admin/Employee/Chef): ");
        const user = { userName, userPassword, role };
        const message: CustomMessage = { action: 'addUser', data: user };
        this.ws.send(JSON.stringify(message));
        console.log("User add request sent to server.");
    }

    private async addMenuItem(user: any) {
        const foodName = await this.inputReader.getInput("Enter food name: ");
        const foodPrice = await this.inputReader.getInput("Enter food price: ");
        const foodStatus = await this.inputReader.getInput("Enter food status (Available/Not-Available): ");
        const mealType = await this.inputReader.getInput("Enter food type: ");
        const menuItem = { foodName, foodPrice, foodStatus, mealType };
        const message: CustomMessage = { action: 'addMenuItem', data: [menuItem, user] };
        this.ws.send(JSON.stringify(message));
        console.log("Menu item add request sent to server.");
    }

    private async updateMenuItem(user: any) {
        console.log("Update Menu Item functionality not implemented yet.");
        console.log("1. Update Menu Price");
        console.log("2. Update Menu Status");
        const option = await this.inputReader.getInput("Choose an option by index: ");
        switch (option) {
            case "1":
                await this.updateMenuItemPrice(user);
                break;
            case "2":
                await this.updateMenuItemStatus(user);
                break;
            default:
                console.log("Invalid option.");
                await this.updateMenuItem(user);
        }
    }

    private async viewMenuItems(user: any) {
        const message: CustomMessage = { action: 'viewMenuItems', data: [user] };
        this.ws.send(JSON.stringify(message));
        console.log("View Menu Items.");
    }

    private async logout() {
        const message: CustomMessage = { action: 'logout', data: [] };
        this.ws.send(JSON.stringify(message));
        console.log('Logout request sent to server');
    }

    private async updateMenuItemPrice(user: any) {
        const itemId = await this.inputReader.getInput("Enter food Item ID: ");
        const updatedPrice = await this.inputReader.getInput("Enter food price: ");
        const menuItem = { itemId, updatedPrice };
        const message: CustomMessage = { action: 'updateMenuPrice', data: [menuItem, user] };
        this.ws.send(JSON.stringify(message));
        console.log("Menu item price update request sent to server.");
    }

    private async updateMenuItemStatus(user: any) {
        const itemId = await this.inputReader.getInput("Enter food Item ID: ");
        const updatedStatus = await this.inputReader.getInput("Enter food status (Available/Not-Available): ");
        const menuItem = { itemId, updatedStatus };
        const message: CustomMessage = { action: 'updateMenuStatus', data: [menuItem, user] };
        this.ws.send(JSON.stringify(message));
        console.log("Menu item status update request sent to server.");
    }
}

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

    public async showOptions() {
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
                await this.addMenuItem();
                break;
            case "3":
                await this.updateMenuItem();
                break;
            case "4":
                await this.viewMenuItems();
                break;
            case "5":
                await this.logout();
                break;
            default:
                console.log("Invalid option.");
                await this.showOptions();
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

    private async addMenuItem() {
        const foodName = await this.inputReader.getInput("Enter food name: ");
        const foodPrice = await this.inputReader.getInput("Enter food price: ");
        const foodStatus = await this.inputReader.getInput("Enter food status (Available/Not-Available): ");
        const mealType = await this.inputReader.getInput("Enter food type: ");
        const menuItem = { foodName, foodPrice, foodStatus, mealType };
        const message: CustomMessage = { action: 'addMenuItem', data: menuItem };
        this.ws.send(JSON.stringify(message));
        console.log("Menu item add request sent to server.");
    }

    private async updateMenuItem() {
        console.log("Update Menu Item functionality not implemented yet.");
        console.log("1. Update Menu Price");
        console.log("2. Update Menu Status");
        const option = await this.inputReader.getInput("Choose an option by index: ");
        switch (option) {
            case "1":
                await this.updateMenuItemPrice();
                break;
            case "2":
                await this.updateMenuItemStatus();
                break;
            default:
                console.log("Invalid option.");
                await this.updateMenuItem();
        }
    }

    private async viewMenuItems() {
        const message: CustomMessage = { action: 'viewMenuItems', data: [] };
        this.ws.send(JSON.stringify(message));
        console.log("View Menu Items.");
    }

    private async logout() {
        const message: CustomMessage = { action: 'logout', data: [] };
        this.ws.send(JSON.stringify(message));
        console.log('Logout request sent to server');
    }

    private async updateMenuItemPrice() {
        const itemId = await this.inputReader.getInput("Enter food Item ID: ");
        const updatedPrice = await this.inputReader.getInput("Enter food price: ");
        const menuItem = { itemId, updatedPrice };
        const message: CustomMessage = { action: 'updateMenuPrice', data: menuItem };
        this.ws.send(JSON.stringify(message));
        console.log("Menu item price update request sent to server.");
    }

    private async updateMenuItemStatus() {
        const itemId = await this.inputReader.getInput("Enter food Item ID: ");
        const updatedStatus = await this.inputReader.getInput("Enter food status (Available/Not-Available): ");
        const menuItem = { itemId, updatedStatus };
        const message: CustomMessage = { action: 'updateMenuStatus', data: menuItem };
        this.ws.send(JSON.stringify(message));
        console.log("Menu item status update request sent to server.");
    }
}

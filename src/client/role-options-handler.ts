import WebSocket from 'ws';
import { getInput } from './input-handler';
import { CustomMessage } from '../server/server';

export class RoleOptionsHandler {
  private ws: WebSocket;

  constructor(ws: WebSocket) {
    this.ws = ws;
  }

  showOptions(role: string) {
    switch (role) {
      case "Admin":
        this.showAdminOptions();
        break;
      case "Employee":
        this.showEmployeeOptions();
        break;
      case "Chef":
        this.showChefOptions();
        break;
      default:
        console.log("Unknown role.");
    }
  }

  private async showAdminOptions() {
    console.log("Admin Options:");
    console.log("1. Add User");
    console.log("2. Add Menu Item");
    console.log("3. Update Menu Item");
    console.log("4. view Menu Item");
    
    const option = await getInput("Choose an option by index: ");

    switch (option) {
      case "1":
        this.addUser();
        break;
      case "2":
        this.addMenuItem();
        break;
      case "3":
        await this.updateMenuItem();
        break;
      case "4":
        await this.viewMenuItems();
        break;      
      default:
        console.log("Invalid option.");
        await this.showAdminOptions();
    }
  }

  private async showEmployeeOptions() {
    console.log("Employee Options:");
    console.log("1. View roll out menu");
    console.log("2. Select Food from Menu items");
    console.log("3. Provide Feedback");
    const option = await getInput("Choose an option by index: ");
    switch (option) {
      case "1":
        // this.viewRolledOutMenu();
        break;
      case "2":
        this.selectFoodForMenu();
        break;
      case "3":
        this.provideFeedback();
        break;
      default:
        console.log("Invalid option.");
        await this.showEmployeeOptions();
    }
  }

  private async showChefOptions() {
    console.log("Chef Options:");
    console.log("1. View items to roll out")
    console.log("2. Roll Out Menu");
    console.log("3. View Employee Feedback");
    console.log("4. Genrate monthly report not yet done");
    const option = await getInput("Choose an option by index: ");
    switch (option) {
      case "1": 
      this.viewMenutoRollOut();
        break;
      case "2":
        this.rollOutMenu();
        break;
      case "3":
        this.viewEmployeeFeedback();
        break;
      default:
        console.log("Invalid option.");
        await this.showChefOptions();
    }
  }

  private async addUser() {
    const userName = await getInput("Enter username: ");
    const userPassword = await getInput("Enter password: ");
    const role = await getInput("Enter role (Admin/Employee/Chef): ");

    const user = { userName, userPassword, role };
    const message: CustomMessage = { action: 'addUser', data: user };
    this.ws.send(JSON.stringify(message));
    console.log("User add request sent to server.");
  }


  private async addMenuItem() {
    const foodName = await getInput("Enter food name: ");
    const foodPrice = await getInput("Enter food price: ");
    const foodStatus = await getInput("Enter food status(Available/Not-Available): ");
    const mealType = await getInput("Enter food type: ");

    const menuItem = { foodName, foodPrice, foodStatus, mealType};
    const message: CustomMessage = { action: 'addMenuItem', data: menuItem };
    this.ws.send(JSON.stringify(message));
    console.log("Menu item add request sent to server.");
  }

  private async updateMenuItem() {
    console.log("Update Menu Item functionality not implemented yet.");
    console.log("1. Update Menu Price");
    console.log("2. Update Menu Status");
    const option = await getInput("Choose an option by index: ");
    switch (option) {
      case "1":
        await this.updateMenuItemPrice();
        break;
      case "2":
        await this.updateMenuItemStatus();
        break;
      default:
        console.log("Invalid option.");
        await this.showAdminOptions();
    }
  }

  private async viewMenutoRollOut() {
    const message: CustomMessage = { action: 'viewMenuToRollOut', data: [] };
    this.ws.send(JSON.stringify(message));
    console.log("View Menu for roll out."); 
  }
  private async viewMenuItems() {
    const message: CustomMessage = { action: 'viewMenuItems', data: [] };
    this.ws.send(JSON.stringify(message));
    console.log("View Menu.");
  }

  private async selectFoodForMenu() {
    console.log("Select Food for Menu functionality not implemented yet.");
  }

  private async provideFeedback() {
    const itemId = await getInput("Enter food ItemId: ");
    const foodName = await getInput("Enter food name: ");
    const userId = await getInput("Enter food userId: ");
    const userRating = await getInput("Enter food rating: ");
    const userComment = await getInput("Enter food comment: ");
    
    const userFeedback = {itemId,foodName,userId, userRating, userComment};
    const message: CustomMessage = { action: 'addEmployeeFeedback', data: userFeedback };
    this.ws.send(JSON.stringify(message));
    console.log("Menu item add request sent to server.");
  }

  private async rollOutMenu() {
    
  }

  private async viewEmployeeFeedback() {
    console.log("View Employee Feedback functionality not implemented yet.");
  }

  private async updateMenuItemPrice() {
    const itemId = await getInput("Enter food Item ID: ");
    const updatedPrice = await getInput("Enter food price: ");
    const menuItem = { itemId, updatedPrice };
    const message: CustomMessage = { action: 'updateMenuPrice', data: menuItem };
    this.ws.send(JSON.stringify(message));
    console.log("Menu item price update request sent to server.");
  }

  private async updateMenuItemStatus() {
    const itemId = await getInput("Enter food Item ID: ");
    const updatedStatus = await getInput("Enter food status(Available/Not-Available): ");
    const menuItem = { itemId, updatedStatus };
    const message: CustomMessage = { action: 'updateMenuStatus', data: menuItem };
    this.ws.send(JSON.stringify(message));
    console.log("Menu item status update request sent to server.");
  }
}

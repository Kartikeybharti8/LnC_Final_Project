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
    console.log("5. Logout");
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
      case "5":
        this.logout();
        break;    
      default:
        console.log("Invalid option.");
        await this.showAdminOptions();
    }
  }

  private async showEmployeeOptions() {
    console.log("Employee Options:");
    console.log("1. View roll out menu");
    console.log("2. Vote for item from Menu items");
    console.log("3. Provide Feedback");
    console.log("4. Logout");
    const option = await getInput("Choose an option by index: ");
    switch (option) {
      case "1":
        this.viewRolledOutMenu();
        break;
      case "2":
        this.voteRollOutMenuItem();
        break;
      case "3":
        this.provideFeedback();
        break;
      case "4":
        this.logout();
        break;
      default:
        console.log("Invalid option.");
        await this.showEmployeeOptions();
    }
  }

  private async showChefOptions() {
    console.log("Chef Options:");
    console.log("1. View Recommended items to roll out")
    console.log("2. Roll Out Menu");
    console.log("3. View Employee Votes");
    console.log("4. Logout");
    const option = await getInput("Choose an option by index: ");
    switch (option) {
      case "1": 
      this.recommendMenuToRollOut();
        break;
      case "2":
        this.rollOutMenu();
        break;
      case "3":
        this.viewEmployeeVotes();
        break;
      case "4":
        this.logout();
        break;
      default:
        console.log("Invalid option.");
        await this.showChefOptions();
    }
  }

  private async logout(){
    const message: CustomMessage = { action: 'logout', data: [] };
    this.ws.send(JSON.stringify(message));
    console.log('Logout request send to server');
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

  private async recommendMenuToRollOut() {
    const message: CustomMessage = { action: 'recommendMenuToRollOut', data: [] };
    this.ws.send(JSON.stringify(message));
    console.log("View Recommended Menu for roll out."); 
  }
  private async viewMenuItems() {
    const message: CustomMessage = { action: 'viewMenuItems', data: [] };
    this.ws.send(JSON.stringify(message));
    console.log("View Menu.");
  }

  private async viewRolledOutMenu() {
    const message: CustomMessage = { action: 'viewRolledOutMenu', data: [] };
    this.ws.send(JSON.stringify(message));
    console.log("View Roll Out Menu.");
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
    const itemId = await getInput("Enter food ItemId: ");
    const customObjective = "RolloutItem"
    const notificationMessage = {itemId, customObjective}
    const message: CustomMessage = { action: 'rolloutMenuNotify', data: notificationMessage };
    this.ws.send(JSON.stringify(message));
    console.log("Roll out menu item request sent to server.");
  }
  private async voteRollOutMenuItem() {
    const itemId = await getInput("Enter food ItemId: ");
    const customObjective = "EmployeeVoted"
    const notificationMessage = {itemId, customObjective}
    const message: CustomMessage = { action: 'voteRollOutMenuItem', data: notificationMessage };
    this.ws.send(JSON.stringify(message));
    console.log("Vote for Roll out menu item request sent to server.");
  }
  private async viewEmployeeVotes() {
    const message: CustomMessage = { action: 'viewEmployeeVotes', data: [] };
    this.ws.send(JSON.stringify(message));
    console.log("View Employee Votes request sent to server.");
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

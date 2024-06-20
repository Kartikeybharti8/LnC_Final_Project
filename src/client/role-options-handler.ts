import { getInput } from "./input-handler";

export class RoleOptionsHandler {
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
    console.log("4. Delete Menu Item");
    const option = await getInput("Choose an option by index: ");

    switch (option) {
      case "1":
        this.addUser();
        break;
      case "2":
        this.addMenuItem();
        break;
      case "3":
        this.updateMenuItem();
        break;
      case "4":
        this.deleteMenuItem();
        break;
      default:
        console.log("Invalid option.");
        this.showAdminOptions();
    }
  }

  private async showEmployeeOptions() {
    console.log("Employee Options:");
    console.log("1. View Menu");
    console.log("2. Select Food for Menu");
    console.log("3. Provide Feedback");
    const option = await getInput("Choose an option by index");
    switch (option) {
      case "1":
        this.viewMenu();
        break;
      case "2":
        this.selectFoodForMenu();
        break;
      case "3":
        this.provideFeedback();
        break;
      default:
        console.log("Invalid option.");
        this.showEmployeeOptions();
    }
  }

  private async showChefOptions() {
    console.log("Chef Options:");
    console.log("1. Roll Out Menu");
    console.log("2. View Employee Feedback");
    const option = await getInput("Choose an option by index: ");
    switch (option) {
      case "1":
        this.rollOutMenu();
        break;
      case "2":
        this.viewEmployeeFeedback();
        break;
      default:
        console.log("Invalid option.");
        this.showChefOptions();
    }
  }

  private addUser() {
    console.log("Add User functionality not implemented yet.");
  }

  private addMenuItem() {
    console.log("Add Menu Item functionality not implemented yet.");
  }

  private updateMenuItem() {
    console.log("Update Menu Item functionality not implemented yet.");
  }

  private deleteMenuItem() {
    console.log("Delete Menu Item functionality not implemented yet.");
  }

  private viewMenu() {
    console.log("View Menu functionality not implemented yet.");
  }

  private selectFoodForMenu() {
    console.log("Select Food for Menu functionality not implemented yet.");
  }

  private provideFeedback() {
    console.log("Provide Feedback functionality not implemented yet.");
  }

  private rollOutMenu() {
    console.log("Roll Out Menu functionality not implemented yet.");
  }

  private viewEmployeeFeedback() {
    console.log("View Employee Feedback functionality not implemented yet.");
  }
}

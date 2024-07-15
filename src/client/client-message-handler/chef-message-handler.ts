import { RoleOptionsHandler } from '../role-options-handler/role-options-handler';

export class ChefMessageHandler {
    private roleOptionsHandler: RoleOptionsHandler;

    constructor(roleOptionsHandler: RoleOptionsHandler) {
        this.roleOptionsHandler = roleOptionsHandler;
    }

    public handleRecommendMenuToRollOut(data: any){
        const user = data[1];
        data = data[0];
        console.log("Menu items to Roll Out:");
        console.table(data);
        this.roleOptionsHandler.showOptions(user);
    };

    public handleRolloutMenuNotify(data: any){
        const user = data[1];
        data = data[0];
        console.log(`Server: ${data}`);
        this.roleOptionsHandler.showOptions(user);
    };

    public handleViewMenuItemsWithEmployeeVotes = (data: any) => {
        const user = data[1];
        data = data[0];
        console.log("Menu Items voted from Employees:");
        console.table(data);
        this.roleOptionsHandler.showOptions(user);
    };
    public handleChefToBeDiscardedMenuItemList = (data: any) => {
        const user = data[1];
        data = data[0];
        console.log("Menu items to be Discarded:");
        console.table(data);
        this.roleOptionsHandler.showOptions(user);
    };
    public handleDiscardMenuItem(data: any){
        const user = data[1];
        data = data[0];
        console.log(`Server: ${data}`);
        this.roleOptionsHandler.showOptions(user);
    }
    public handleViewDiscardItemsSuggestions(data: any){
        const user = data[1];
        data = data[0];
        console.table(data);
        this.roleOptionsHandler.showOptions(user);
    }

    public handleViewMenuItemsChef = (data: any) => {
        const user = data[1];
        data = data[0];
        console.log("Menu Items from db:");
        console.table(data);
        this.roleOptionsHandler.showOptions(user);
    };
}

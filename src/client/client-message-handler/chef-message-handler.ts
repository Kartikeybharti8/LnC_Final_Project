import { RoleOptionsHandler } from '../role-options-handler/role-options-handler';

export class ChefMessageHandler {
    private roleOptionsHandler: RoleOptionsHandler;

    constructor(roleOptionsHandler: RoleOptionsHandler) {
        this.roleOptionsHandler = roleOptionsHandler;
    }

    public handleRecommendMenuToRollOut(data: any){
        console.log("Menu items to Roll Out:");
        console.table(data);
        this.roleOptionsHandler.showOptions("Chef");
    };

    public handleRolloutMenuNotify(data: any){
        console.log(`Server: ${data}`);
        this.roleOptionsHandler.showOptions("Chef");
    };

    public handleViewMenuItemsWithEmployeeVotes = (data: any) => {
        console.log("Menu Items voted from Employees:");
        console.table(data);
        this.roleOptionsHandler.showOptions("Chef");
    };
    public handleChefToBeDiscardedMenuItemList = (data: any) => {
        console.log("Menu items to be Discarded:");
        console.table(data);
        this.roleOptionsHandler.showOptions("Chef");
    };
    public handleDiscardMenuItem(data: any){
        console.log(`Server: ${data}`);
        this.roleOptionsHandler.showOptions("Chef");
    }
    public handleViewDiscardItemsSuggestions(data: any){
        console.table(data);
        this.roleOptionsHandler.showOptions("Chef");
    }

}

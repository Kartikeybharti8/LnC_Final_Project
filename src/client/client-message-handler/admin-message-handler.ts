import { RoleOptionsHandler } from '../role-options-handler/role-options-handler';

export class AdminMessageHandler {
    private roleOptionsHandler: RoleOptionsHandler;

    constructor(roleOptionsHandler: RoleOptionsHandler) {
        this.roleOptionsHandler = roleOptionsHandler;
    }

    public handleAddedUser = (data: any) => {
        console.log(`Server: ${data}`);
        this.roleOptionsHandler.showOptions("Admin");
    };

    public handleAddedMenuItem = (data: any) => {
        console.log(`Server: ${data}`);
        this.roleOptionsHandler.showOptions("Admin");
    };

    public handleUpdatedMenuPrice = (data: any) => {
        console.log(`Server: ${data}`);
        this.roleOptionsHandler.showOptions("Admin");
    };

    public handleUpdatedMenuStatus = (data: any) => {
        console.log(`Server: ${data}`);
        this.roleOptionsHandler.showOptions("Admin");
    };

    public handleViewMenuItems = (data: any) => {
        console.log("Menu Items from db:");
        console.table(data);
        this.roleOptionsHandler.showOptions("Admin");
    };
}

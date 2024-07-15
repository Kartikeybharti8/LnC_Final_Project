import { RoleOptionsHandler } from '../role-options-handler/role-options-handler';

export class AdminMessageHandler {
    private roleOptionsHandler: RoleOptionsHandler;

    constructor(roleOptionsHandler: RoleOptionsHandler) {
        this.roleOptionsHandler = roleOptionsHandler;
    }

    public handleAddedUser = (data: any) => {
        const user = data[1];
        data = data[0];
        console.log(`Server: ${data}`);
        this.roleOptionsHandler.showOptions(user);
    };

    public handleAddedMenuItem = (data: any) => {
        const user = data[1];
        data = data[0];
        console.log(`Server: ${data}`);
        this.roleOptionsHandler.showOptions(user);
    };

    public handleUpdatedMenuPrice = (data: any) => {
        const user = data[1];
        data = data[0];
        console.log(`Server: ${data}`);
        this.roleOptionsHandler.showOptions(user);
    };

    public handleUpdatedMenuStatus = (data: any) => {
        const user = data[1];
        data = data[0];
        console.log(`Server: ${data}`);
        this.roleOptionsHandler.showOptions(user);
    };

    public handleViewMenuItemsAdmin = (data: any) => {
        const user = data[1];
        data = data[0];
        console.log("Menu Items from db:");
        console.table(data);
        this.roleOptionsHandler.showOptions(user);
    };
}

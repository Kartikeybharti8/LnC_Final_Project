import { RoleOptionsHandler } from '../role-options-handler/role-options-handler';

export class EmployeeMessageHandler {
    private roleOptionsHandler: RoleOptionsHandler;

    constructor(roleOptionsHandler: RoleOptionsHandler) {
        this.roleOptionsHandler = roleOptionsHandler;
    }

    public handleAddedEmployeeFeedback = (data: any) => {
        const user = data[1];
        data = data[0];
        console.log(`Server: ${data}`);
        this.roleOptionsHandler.showOptions(user);
    };

    public handleViewRolledOutMenu = (data: any) => {
        const user = data[1]
        data = data[0];
        console.log("Rolled Out Menu Items:");
        console.table(data);
        this.roleOptionsHandler.showOptions(user);
    };

    public viewEmployeeToBeDiscardedMenuItemList = (data: any) => {
        const user = data[1];
        data = data[0];
        console.log("Menu Items to be discarded:");
        console.table(data);
        this.roleOptionsHandler.showOptions(user);
    };

    public handleVoteRollOutMenuItem = (data: any) => {
        const user = data[1];
        data = data[0];
        console.log(`Server: ${data}`);
        this.roleOptionsHandler.showOptions(user);
    };

    public handleAddedEmployeeSuggestion = (data: any) => {
        const user = data[1];
        data = data[0];
        console.log(`Server: ${data}`);
        this.roleOptionsHandler.showOptions(user);
    };

    public handleUpdatedUserPreference = (data: any) => {
        const user = data;
        console.log(`Server: ${user.userName} Your preferences are now updated`);
        this.roleOptionsHandler.showOptions(user);
    };
}

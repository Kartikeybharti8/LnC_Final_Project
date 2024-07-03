import { RoleOptionsHandler } from '../role-options-handler/role-options-handler';

export class EmployeeMessageHandler {
    private roleOptionsHandler: RoleOptionsHandler;

    constructor(roleOptionsHandler: RoleOptionsHandler) {
        this.roleOptionsHandler = roleOptionsHandler;
    }

    public handleAddedEmployeeFeedback = (data: any) => {
        console.log(`Server: ${data}`);
        this.roleOptionsHandler.showOptions("Employee");
    };

    public handleViewRolledOutMenu = (data: any) => {
        console.log("Rolled Out Menu Items:");
        console.table(data);
        this.roleOptionsHandler.showOptions("Employee");
    };

    public handleVoteRollOutMenuItem = (data: any) => {
        console.log(`Server: ${data}`);
        this.roleOptionsHandler.showOptions("Employee");
    };
}

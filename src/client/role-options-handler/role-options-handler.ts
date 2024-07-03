import WebSocket from 'ws';
import { AdminOptionsHandler } from './admin-options-handler';
import { ChefOptionsHandler } from './chef-options-handler';
import { EmployeeOptionsHandler } from './employee-options-handler';

export class RoleOptionsHandler {
    private ws: WebSocket;
    private adminOptionsHandler: AdminOptionsHandler;
    private chefOptionsHandler: ChefOptionsHandler;
    private employeeOptionsHandler: EmployeeOptionsHandler;

    constructor(ws: WebSocket) {
        this.ws = ws;
        this.adminOptionsHandler = new AdminOptionsHandler(ws);
        this.chefOptionsHandler = new ChefOptionsHandler(ws);
        this.employeeOptionsHandler = new EmployeeOptionsHandler(ws);
    }

    public showOptions(role: string) {
        switch (role) {
            case "Admin":
                this.adminOptionsHandler.showOptions();
                break;
            case "Employee":
                this.employeeOptionsHandler.showOptions();
                break;
            case "Chef":
                this.chefOptionsHandler.showOptions();
                break;
            default:
                console.log("Unknown role.");
        }
    }
}

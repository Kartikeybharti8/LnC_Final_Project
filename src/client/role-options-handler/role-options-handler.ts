import WebSocket from 'ws';
import { AdminOptionsHandler } from './admin-options-handler';
import { ChefOptionsHandler } from './chef-options-handler';
import { EmployeeOptionsHandler } from './employee-options-handler';
import InputReader from '../input-handler';

export class RoleOptionsHandler {
    private ws: WebSocket;
    private adminOptionsHandler: AdminOptionsHandler;
    private chefOptionsHandler: ChefOptionsHandler;
    private employeeOptionsHandler: EmployeeOptionsHandler;

    constructor(ws: WebSocket, inputReader: InputReader) {
        this.ws = ws;
        this.adminOptionsHandler = new AdminOptionsHandler(ws, inputReader);
        this.chefOptionsHandler = new ChefOptionsHandler(ws, inputReader);
        this.employeeOptionsHandler = new EmployeeOptionsHandler(ws, inputReader);
    }

    public showOptions(user: any) {
        const user_role = user.role;
        switch (user_role) {
            case "Admin":
                this.adminOptionsHandler.showOptions(user);
                break;
            case "Employee":
                this.employeeOptionsHandler.showOptions(user);
                break;
            case "Chef":
                this.chefOptionsHandler.showOptions(user);
                break;
            default:
                console.log("Unknown role you cannot continue...");       
        }
    }
}

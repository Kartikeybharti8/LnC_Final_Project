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

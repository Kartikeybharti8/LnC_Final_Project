import { WebSocket } from 'ws';
import MenuItemDatabaseManagement from '../database/menu-database';
import NotificationDatabaseManagement from '../database/notification-database';
import UserDatabaseManagement from '../database/user-database';

class MenuHandler {
    private menuDb: MenuItemDatabaseManagement;
    private notificationDb: NotificationDatabaseManagement;
    private userDb: UserDatabaseManagement;

    constructor() {
        this.menuDb = new MenuItemDatabaseManagement();
        this.notificationDb = new NotificationDatabaseManagement();
        this.userDb = new UserDatabaseManagement();
    }

    async handleAddMenuItem(ws: WebSocket, data: any) {
        const user = data[1];
        data = data[0];
        try {
            await this.menuDb.addmenuItemToDb(data);
            ws.send(JSON.stringify({ action: 'addedMenuItem', data: ['Menu item added successfully.', user] }));
        } catch (error) {
            ws.send(JSON.stringify({ action: 'error', data: 'Failed to add Menu Item.' }));
        }
    }

    async handleUpdateMenuPrice(ws: WebSocket, data: any) {
        const user = data[1];
        data = data[0];
        const { itemId, updatedPrice } = data;
        try {
            await this.menuDb.updateMenuPriceDb(itemId, updatedPrice);
            ws.send(JSON.stringify({ action: 'updatedMenuPrice', data: ['Menu item price updated successfully.', user] }));
        } catch (error) {
            ws.send(JSON.stringify({ action: 'error', data: 'Failed to update price Menu Item.' }));
        }
    }

    async handleUpdateMenuStatus(ws: WebSocket, data: any) {
        const user = data[1];
        data = data[0];
        const { itemId, updatedStatus } = data;
        try {
            await this.menuDb.updateMenuStatusDb(itemId, updatedStatus);
            ws.send(JSON.stringify({ action: 'updatedMenuStatus', data: ['Menu item Status updated successfully.', user] }));
        } catch (error) {
            ws.send(JSON.stringify({ action: 'error', data: 'Failed to update status of menu Item.' }));
        }
    }

    async viewMenuItems(ws: WebSocket, data: any) {
        const user = data[0];
        const menuItems = await this.menuDb.fetchMenuItemsFromDb();
        if (menuItems) {
            ws.send(JSON.stringify({ action: 'viewMenuItems', data: [menuItems, user] }));
        } else {
            ws.send(JSON.stringify({ action: 'error', data: 'Menu Items not found.' }));
        }
    }

    async viewRolledOutMenu(ws: WebSocket, data: any) {
        console.log("User:", data);
        const user = data;
        const updatedUser = await this.userDb.fetchUserFromDb(user.userName, user.userPassword);
        const itemObjects = await this.notificationDb.fetchItemIdsForCustomNotification('RolloutItem');
        const itemIds : number[] = itemObjects.map((item: { itemId: Number }) => item.itemId);
        const menuItems = await this.menuDb.fetchRolledOutMenuItemsFromDbByPreference(updatedUser, itemIds);
        if (menuItems) {
            ws.send(JSON.stringify({ action: 'viewRolledOutMenu', data: [menuItems, updatedUser] }));
        } else {
            ws.send(JSON.stringify({ action: 'error', data: 'No Rolled Out Menu Items found.' }));
        }
    }

    async discardMenuItem(ws: WebSocket, data: any) {
        const user = data[1];
        data = data[0];
        try{
            await this.menuDb.discardMenuItemFromDB(data);
            ws.send(JSON.stringify({ action: 'discardMenuItem', data: ["Menu Item deleted Successfully.", user] }));
        }catch {
            ws.send(JSON.stringify({ action: 'error', data: 'Error Deleting Menu Item' }));
        }
    }
}

export default MenuHandler;

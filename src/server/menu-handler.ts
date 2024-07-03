import { WebSocket } from 'ws';
import MenuItemDatabaseManagement from '../database/menu-database';
import NotificationDatabaseManagement from '../database/notification-database';

class MenuHandler {
    private menuDb: MenuItemDatabaseManagement;
    private notificationDb: NotificationDatabaseManagement;

    constructor() {
        this.menuDb = new MenuItemDatabaseManagement();
        this.notificationDb = new NotificationDatabaseManagement();
    }

    async handleAddMenuItem(ws: WebSocket, data: any) {
        const { foodName, foodPrice, foodStatus, mealType } = data;
        try {
            await this.menuDb.addmenuItemToDb(foodName, foodPrice, foodStatus, mealType);
            ws.send(JSON.stringify({ action: 'addedMenuItem', data: 'Menu item added successfully.' }));
        } catch (error) {
            ws.send(JSON.stringify({ action: 'error', data: 'Failed to add Menu Item.' }));
        }
    }

    async handleUpdateMenuPrice(ws: WebSocket, data: any) {
        const { itemId, updatedPrice } = data;
        try {
            await this.menuDb.updateMenuPriceDb(itemId, updatedPrice);
            ws.send(JSON.stringify({ action: 'updatedMenuPrice', data: 'Menu item price updated successfully.' }));
        } catch (error) {
            ws.send(JSON.stringify({ action: 'error', data: 'Failed to update price Menu Item.' }));
        }
    }

    async handleUpdateMenuStatus(ws: WebSocket, data: any) {
        const { itemId, updatedStatus } = data;
        try {
            await this.menuDb.updateMenuStatusDb(itemId, updatedStatus);
            ws.send(JSON.stringify({ action: 'updatedMenuStatus', data: 'Menu item Status updated successfully.' }));
        } catch (error) {
            ws.send(JSON.stringify({ action: 'error', data: 'Failed to update status of menu Item.' }));
        }
    }

    async viewMenuItems(ws: WebSocket, data: any) {
        const menuItems = await this.menuDb.fetchMenuItemsFromDb();
        if (menuItems) {
            ws.send(JSON.stringify({ action: 'viewMenuItems', data: menuItems }));
        } else {
            ws.send(JSON.stringify({ action: 'error', data: 'Menu Items not found.' }));
        }
    }

    async viewRolledOutMenu(ws: WebSocket, data: any) {
        const itemObjects = await this.notificationDb.fetchItemIdsForCustomNotification('RolloutItem');
        const itemIds = itemObjects.map((item: { itemId: Number }) => item.itemId);
        const menuItems = await this.menuDb.fetchRolledOutMenuItemsFromDb(itemIds);
        if (menuItems) {
            ws.send(JSON.stringify({ action: 'viewRolledOutMenu', data: menuItems }));
        } else {
            ws.send(JSON.stringify({ action: 'error', data: 'No Rolled Out Menu Items found.' }));
        }
    }
}

export default MenuHandler;

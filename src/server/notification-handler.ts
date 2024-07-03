import { WebSocket } from 'ws';
import NotificationDatabaseManagement from '../database/notification-database';
import MenuItemDatabaseManagement from '../database/menu-database';

class NotificationHandler {
    private notificationDb: NotificationDatabaseManagement;
    private menuDb: MenuItemDatabaseManagement;

    constructor() {
        this.notificationDb = new NotificationDatabaseManagement();
        this.menuDb = new MenuItemDatabaseManagement();
    }

    async rolloutMenuNotify(ws: WebSocket, data: any) {
        try {
            const { customObjective, itemId } = data;
            await this.notificationDb.addCustomNotification(itemId, customObjective);
            ws.send(JSON.stringify({ action: 'rolloutMenuNotify', data: "Menu items rolled out successfully." }));
        } catch (error) {
            ws.send(JSON.stringify({ action: 'error', data: 'Failed to roll out menu item.' }));
        }
    }

    async voteRollOutMenuItem(ws: WebSocket, data: any) {
        try {
            const { customObjective, itemId } = data;
            await this.notificationDb.addCustomNotification(itemId, customObjective);
            ws.send(JSON.stringify({ action: 'voteRollOutMenuItem', data: "Menu Item voted successfully." }));
        } catch (error) {
            ws.send(JSON.stringify({ action: 'error', data: 'Failed to vote menu item' }));
        }
    }

    async viewEmployeeVotes(ws: WebSocket, data: any) {
        try {
            const itemIdCount: { [key: number]: number } = {};
            const employeesVotes = await this.notificationDb.fetchItemIdsForCustomNotification('EmployeeVoted');
            employeesVotes.forEach((item: { itemId: number }) => {
                const itemId = item.itemId;
                if (itemId in itemIdCount) {
                    itemIdCount[itemId]++;
                } else {
                    itemIdCount[itemId] = 1;
                }
            });

            const itemIds = Object.keys(itemIdCount).map(Number);
            const menuItems = await this.menuDb.fetchRolledOutMenuItemsFromDb(itemIds);
            const menuItemsWithEmployeeVotes = menuItems.map((menuItem: any) => {
                const { sentiment, average_rating, ...filteredMenuItem } = menuItem;
                return {
                    ...filteredMenuItem,
                    count: itemIdCount[menuItem.itemId] || 0
                };
            });

            ws.send(JSON.stringify({ action: 'viewMenuItemsWithEmployeeVotes', data: menuItemsWithEmployeeVotes }));
        } catch (error) {
            ws.send(JSON.stringify({ action: 'error', data: 'Failed to view employee feedback' }));
        }
    }
}

export default NotificationHandler;

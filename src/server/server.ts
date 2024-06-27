import { WebSocketServer, WebSocket } from 'ws';
import { User } from '../models/user';
import UserDatabaseManagement from '../database/user-database';
import MenuItemDatabaseManagement from '../database/menu-database'
import FoodFeedbackDatabaseManagement from '../database/user-feedback'
import generateFoodRecommendations from '../services/recommendation_engine'
import NotificationDatabaseManagement from '../database/notification-database';

export interface CustomMessage {
    action: string;
    data: any;
}

class Server {
    private wss: WebSocketServer;

    constructor(port: number) {
        this.wss = new WebSocketServer({ port });

        this.wss.on('connection', (ws: WebSocket) => {
            console.log('New client connected');

            ws.on('message', (message: string) => {
                try {
                    const parsedMessage: CustomMessage = JSON.parse(message);
                    this.handleClientMessage(ws, parsedMessage);
                } catch (error) {
                    ws.send(JSON.stringify({ action: 'error', data: 'Invalid message format.' }));
                }
            });

            ws.on('close', () => {
                console.log('Client disconnected');
            });
        });

        console.log(`WebSocket server is running on ws://localhost:${port}`);
    }

    async handleClientMessage(ws: WebSocket, message: CustomMessage) {
        const { action, data } = message;        
        if (action === 'login') {
            await this.handleLogin(ws, data);
        } else if (action === 'addUser') {
            await this.handleAddUser(ws, data);
        } else if (action === 'addMenuItem') {
            await this.handleAddMenuItem(ws, data);
        }else if (action === 'updateMenuPrice') {
            await this.handleUpdateMenuPrice(ws, data);
        }else if (action === 'updateMenuStatus') {
            await this.handleUpdateMenuStatus(ws, data);
        }else if (action === 'addEmployeeFeedback') {
            await this.handleAddEmployeeFeedback(ws, data);
        }else if (action === 'viewMenuItems') {
            await this.viewMenuItems(ws, data);
        }else if (action === 'recommendMenuToRollOut') {
            await this.recommendMenuToRollOut(ws, data);
        }else if (action === 'rolloutMenuNotify') {
            await this.rolloutMenuNotify(ws, data);
        }else {
            ws.send(JSON.stringify({ action: 'error', data: 'Unknown action.' }));
        }
    }
    
    private async handleLogin(ws: WebSocket, data: any) {
        const userName = data.userName;
        const userPassword = data.userPassword;
        const userDb = new UserDatabaseManagement();
        const user: User = await userDb.fetchUserFromDb(userName, userPassword);
        if (user) {
            ws.send(JSON.stringify({ action: 'login', data: user }));
        } else {
            ws.send(JSON.stringify({ action: 'error', data: 'User not found.' }));
        }
    }
    private async viewMenuItems(ws: WebSocket, data: any) {
        const menuDb = new MenuItemDatabaseManagement();
        const menuItem = await menuDb.fetchMenuItemsFromDb();
        if (menuItem) {
            ws.send(JSON.stringify({ action: 'viewMenuItems', data: menuItem }));
        } else {
            ws.send(JSON.stringify({ action: 'error', data: 'Menu Item not found.' }));
        }
    }

    private async recommendMenuToRollOut(ws: WebSocket, data: any) {
        const feedbackDb = new FoodFeedbackDatabaseManagement();
        const feedbackList = await feedbackDb.fetchFeedbackTableFromDB();
        const recommendations = generateFoodRecommendations(feedbackList);
        console.log(recommendations)
        if (recommendations) {
            ws.send(JSON.stringify({ action: 'recommendMenuToRollOut', data: recommendations }));
        } else {
            ws.send(JSON.stringify({ action: 'error', data: 'Menu Items not found.' }));
        }
    }
    private async rolloutMenuNotify(ws: WebSocket, data: any) {
        try {
            const customObjective = data.customObjective;
            const itemId = data.itemId;
            const notificationDB = new NotificationDatabaseManagement();
            await notificationDB.addCustomNotification(itemId, customObjective);
            ws.send(JSON.stringify({ action: 'rolloutMenuNotify', data: "Menu items rolled out successfully." }));
        } catch (error) {
            ws.send(JSON.stringify({ action: 'error', data: 'Failed to add user.' }));
        }
    }

    private async handleAddUser(ws: WebSocket, data: any) {
        const { userName, userPassword, role } = data;
        const userDb = new UserDatabaseManagement();
        try {
            await userDb.addUserToDb(userName, userPassword, role);
            ws.send(JSON.stringify({ action: 'addedUser', data: 'User added successfully.' }));
        } catch (error) {
            ws.send(JSON.stringify({ action: 'error', data: 'Failed to add user.' }));
        }
    }
    private async handleAddMenuItem(ws: WebSocket, data: any) {
        const { foodName, foodPrice, foodStatus, mealType } = data;
        const menuDb = new MenuItemDatabaseManagement();
        try {
            await menuDb.addmenuItemToDb(foodName, foodPrice, foodStatus, mealType);
            ws.send(JSON.stringify({ action: 'addedMenuItem', data: 'Menu added successfully.' }));
        } catch (error) {
            ws.send(JSON.stringify({ action: 'error', data: 'Failed to add Menu Item.' }));
        }
    }
    private async handleUpdateMenuPrice(ws: WebSocket, data: any) {
        const { itemId, updatedPrice} = data;
        const menuDb = new MenuItemDatabaseManagement();
        try {
            await menuDb.updateMenuPriceDb(itemId, updatedPrice);
            ws.send(JSON.stringify({ action: 'updatedMenuPrice', data: 'Menu item price updated successfully.' }));
        } catch (error) {
            ws.send(JSON.stringify({ action: 'error', data: 'Failed to update price Menu Item.' }));
        }
    }
    private async handleUpdateMenuStatus(ws: WebSocket, data: any) {
        const { itemId, updatedStatus} = data;
        const menuDb = new MenuItemDatabaseManagement();
        try {
            await menuDb.updateMenuStatusDb(itemId, updatedStatus);
            ws.send(JSON.stringify({ action: 'updatedMenuStatus', data: 'Menu item Status updated successfully.' }));
        } catch (error) {
            ws.send(JSON.stringify({ action: 'error', data: 'Failed to update status of menu Item.' }));
        }
    }
    private async handleAddEmployeeFeedback(ws: WebSocket, data: any) {
        const { itemId, foodName, userId, userRating, userComment} = data;
        const feedbackDb = new FoodFeedbackDatabaseManagement();
        try {
            await feedbackDb.addUserFeedbackToDb(itemId, foodName, userId, userRating, userComment);
            ws.send(JSON.stringify({ action: 'addedEmployeeFeedback', data: 'user feedback added successfully.' }));
        } catch (error) {
            ws.send(JSON.stringify({ action: 'error', data: 'Failed to update status of menu Item.' }));
        }
    }
    
}

export default Server;

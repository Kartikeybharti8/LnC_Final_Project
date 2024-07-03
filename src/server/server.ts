// import { WebSocketServer, WebSocket } from 'ws';
// import { User } from '../models/user';
// import UserDatabaseManagement from '../database/user-database';
// import MenuItemDatabaseManagement from '../database/menu-database'
// import FoodFeedbackDatabaseManagement from '../database/user-feedback'
// import generateFoodRecommendations from '../services/recommendation_engine'
// import NotificationDatabaseManagement from '../database/notification-database';

// export interface CustomMessage {
//     action: string;
//     data: any;
// }

// class Server {
//     private wss: WebSocketServer;

//     constructor(port: number) {
//         this.wss = new WebSocketServer({ port });

//         this.wss.on('connection', (ws: WebSocket) => {
//             console.log('New client connected');

//             ws.on('message', (message: string) => {
//                 try {
//                     const parsedMessage: CustomMessage = JSON.parse(message);
//                     this.handleClientMessage(ws, parsedMessage);
//                 } catch (error) {
//                     ws.send(JSON.stringify({ action: 'error', data: 'Invalid message format.' }));
//                 }
//             });

//             ws.on('close', () => {
//                 console.log('Client disconnected');
//             });
//         });

//         console.log(`WebSocket server is running on ws://localhost:${port}`);
//     }

//     async handleClientMessage(ws: WebSocket, message: CustomMessage) {
//         const { action, data } = message;        
//         if (action === 'login') {
//             await this.handleLogin(ws, data);
//         } else if (action === 'logout') {
//             await this.logout(ws, data);
//         }else if (action === 'addUser') {
//             await this.handleAddUser(ws, data);
//         } else if (action === 'addMenuItem') {
//             await this.handleAddMenuItem(ws, data);
//         }else if (action === 'updateMenuPrice') {
//             await this.handleUpdateMenuPrice(ws, data);
//         }else if (action === 'updateMenuStatus') {
//             await this.handleUpdateMenuStatus(ws, data);
//         }else if (action === 'addEmployeeFeedback') {
//             await this.handleAddEmployeeFeedback(ws, data);
//         }else if (action === 'viewEmployeeVotes') {
//             await this.viewEmployeeVotes(ws, data);
//         }else if (action === 'viewMenuItems') {
//             await this.viewMenuItems(ws, data);
//         }else if (action === 'recommendMenuToRollOut') {
//             await this.recommendMenuToRollOut(ws, data);
//         }else if (action === 'rolloutMenuNotify') {
//             await this.rolloutMenuNotify(ws, data);
//         }else if (action === 'viewRolledOutMenu') {
//             await this.viewRolledOutMenu(ws, data);
//         }else if (action === 'voteRollOutMenuItem') {
//             await this.voteRollOutMenuItem(ws, data);
//         }else {
//             ws.send(JSON.stringify({ action: 'error', data: 'Unknown action.' }));
//         }
//     }

//     private async logout(ws: WebSocket, data: any){
//         console.log("Client disconnected");
//         ws.send(JSON.stringify({ action: 'logout', data: "You got successfully logged out" }));
//     };
    
    
//     private async handleLogin(ws: WebSocket, data: any) {
//         const userName = data.userName;
//         const userPassword = data.userPassword;
//         const userDb = new UserDatabaseManagement();
//         const user: User = await userDb.fetchUserFromDb(userName, userPassword);
//         if (user) {
//             ws.send(JSON.stringify({ action: 'login', data: user }));
//         } else {
//             ws.send(JSON.stringify({ action: 'error', data: 'User not found.' }));
//         }
//     }
//     private async viewMenuItems(ws: WebSocket, data: any) {
//         const menuDb = new MenuItemDatabaseManagement();
//         const menuItems= await menuDb.fetchMenuItemsFromDb();
//         if (menuItems) {
//             ws.send(JSON.stringify({ action: 'viewMenuItems', data: menuItems }));
//         } else {
//             ws.send(JSON.stringify({ action: 'error', data: 'Menu Items not found.' }));
//         }
//     }

//     private async viewRolledOutMenu(ws: WebSocket, data: any) {
//         const menuDb = new MenuItemDatabaseManagement();
//         const notificationDb = new NotificationDatabaseManagement();
//         const itemObjects = await notificationDb.fetchItemIdsForCustomNotification('RolloutItem');
//         const itemIds = itemObjects.map((item: { itemId: Number }) => item.itemId);
//         const menuItems = await menuDb.fetchRolledOutMenuItemsFromDb(itemIds);
//         if (menuItems) {
//             ws.send(JSON.stringify({ action: 'viewRolledOutMenu', data: menuItems }));
//         } else {
//             ws.send(JSON.stringify({ action: 'error', data: 'No Rolled Out Menu Items found.' }));
//         }
//     }
    
//     private async recommendMenuToRollOut(ws: WebSocket, data: any) {
//         const feedbackDb = new FoodFeedbackDatabaseManagement();
//         const feedbackList = await feedbackDb.fetchFeedbackFromDB();
//         const recommendations = generateFoodRecommendations(feedbackList);
//         console.log(recommendations)
//         if (recommendations) {
//             ws.send(JSON.stringify({ action: 'recommendMenuToRollOut', data: recommendations }));
//         } else {
//             ws.send(JSON.stringify({ action: 'error', data: 'Menu Items not found.' }));
//         }
//     }
//     private async rolloutMenuNotify(ws: WebSocket, data: any) {
//         try {
//             const customObjective = data.customObjective;
//             const itemId = data.itemId;
//             const notificationDB = new NotificationDatabaseManagement();
//             await notificationDB.addCustomNotification(itemId, customObjective);
//             ws.send(JSON.stringify({ action: 'rolloutMenuNotify', data: "Menu items rolled out successfully." }));
//         } catch (error) {
//             ws.send(JSON.stringify({ action: 'error', data: 'Failed to roll out menu item.' }));
//         }
//     }

//     private async voteRollOutMenuItem(ws: WebSocket, data: any) {
//         try {
//             const customObjective = data.customObjective;
//             const itemId = data.itemId;
//             const notificationDB = new NotificationDatabaseManagement();
//             await notificationDB.addCustomNotification(itemId, customObjective);
//             ws.send(JSON.stringify({ action: 'voteRollOutMenuItem', data: "Menu Item voted successfully." }));
//         } catch (error) {
//             ws.send(JSON.stringify({ action: 'error', data: 'Failed to vote menu item' }));
//         }
//     }

//     private async handleAddUser(ws: WebSocket, data: any) {
//         const { userName, userPassword, role } = data;
//         const userDb = new UserDatabaseManagement();
//         try {
//             await userDb.addUserToDb(userName, userPassword, role);
//             ws.send(JSON.stringify({ action: 'addedUser', data: 'User added successfully.' }));
//         } catch (error) {
//             ws.send(JSON.stringify({ action: 'error', data: 'Failed to add user.' }));
//         }
//     }
//     private async handleAddMenuItem(ws: WebSocket, data: any) {
//         const { foodName, foodPrice, foodStatus, mealType } = data;
//         const menuDb = new MenuItemDatabaseManagement();
//         try {
//             await menuDb.addmenuItemToDb(foodName, foodPrice, foodStatus, mealType);
//             ws.send(JSON.stringify({ action: 'addedMenuItem', data: 'Menu item added successfully.' }));
//         } catch (error) {
//             ws.send(JSON.stringify({ action: 'error', data: 'Failed to add Menu Item.' }));
//         }
//     }
//     private async handleUpdateMenuPrice(ws: WebSocket, data: any) {
//         const { itemId, updatedPrice} = data;
//         const menuDb = new MenuItemDatabaseManagement();
//         try {
//             await menuDb.updateMenuPriceDb(itemId, updatedPrice);
//             ws.send(JSON.stringify({ action: 'updatedMenuPrice', data: 'Menu item price updated successfully.' }));
//         } catch (error) {
//             ws.send(JSON.stringify({ action: 'error', data: 'Failed to update price Menu Item.' }));
//         }
//     }
//     private async handleUpdateMenuStatus(ws: WebSocket, data: any) {
//         const { itemId, updatedStatus} = data;
//         const menuDb = new MenuItemDatabaseManagement();
//         try {
//             await menuDb.updateMenuStatusDb(itemId, updatedStatus);
//             ws.send(JSON.stringify({ action: 'updatedMenuStatus', data: 'Menu item Status updated successfully.' }));
//         } catch (error) {
//             ws.send(JSON.stringify({ action: 'error', data: 'Failed to update status of menu Item.' }));
//         }
//     }
//     private async handleAddEmployeeFeedback(ws: WebSocket, data: any) {
//         const { itemId, foodName, userRating, userComment} = data;
//         const feedbackDb = new FoodFeedbackDatabaseManagement();
//         try {
//             await feedbackDb.addUserFeedbackToDb(itemId, foodName, userRating, userComment);
//             ws.send(JSON.stringify({ action: 'addedEmployeeFeedback', data: 'user feedback added successfully.' }));
//         } catch (error) {
//             ws.send(JSON.stringify({ action: 'error', data: 'Failed to add employee feedback' }));
//         }
//     }
//     private async viewEmployeeVotes(ws: WebSocket, data: any) {
//         const notificationDb = new NotificationDatabaseManagement();
//         const menuDb = new MenuItemDatabaseManagement();
        
//         try {
//             // Initialize an empty dictionary to store counts
//             const itemIdCount: { [key: number]: number } = {};
        
//             const employeesVotes = await notificationDb.fetchItemIdsForCustomNotification('EmployeeVoted');
//             console.log("votes",employeesVotes)
//             employeesVotes.forEach((item: { itemId: number }) => {
//                 const itemId = item.itemId;
//                 if (itemId in itemIdCount) {
//                     itemIdCount[itemId]++;
//                 } else {
//                     itemIdCount[itemId] = 1;
//                 }
//             });
//             console.log("itemcounts",itemIdCount);
        
//             const itemIds = Object.keys(itemIdCount).map(Number);
//             console.log("ids",itemIds);
//             const menuItems = await menuDb.fetchRolledOutMenuItemsFromDb(itemIds);
//             console.log("menu",menuItems);
//             const menuItemsWithEmployeeVotes = menuItems.map((menuItem: any) => {
//                 const { sentiment, average_rating, ...filteredMenuItem } = menuItem;
//                 return {
//                     ...filteredMenuItem,
//                     count: itemIdCount[menuItem.itemId] || 0
//                 };
//             });
        
//             console.table("votedMenu",menuItemsWithEmployeeVotes);
//             ws.send(JSON.stringify({ action: 'viewMenuItemsWithEmployeeVotes', data: menuItemsWithEmployeeVotes }));
//         } catch (error) {
//             ws.send(JSON.stringify({ action: 'error', data: 'Failed to view employee feedback' }));
//         }
//     }
// }

// export default Server;

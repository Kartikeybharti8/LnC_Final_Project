import { WebSocketServer, WebSocket } from 'ws';
import UserHandler from './user-handler';
import MenuHandler from './menu-handler';
import FeedbackHandler from './user-feedback-handler';
import NotificationHandler from './notification-handler';
import RecommendationHandler from './recommendation-handler'

export interface CustomMessage {
    action: string;
    data: any;
}

class AppServer {
    private wss: WebSocketServer;
    private userHandler: UserHandler;
    private menuHandler: MenuHandler;
    private feedbackHandler: FeedbackHandler;
    private notificationHandler: NotificationHandler;
    private recommendationHandler: RecommendationHandler;

    constructor(port: number) {
        this.wss = new WebSocketServer({ port });
        this.userHandler = new UserHandler();
        this.menuHandler = new MenuHandler();
        this.feedbackHandler = new FeedbackHandler();
        this.notificationHandler = new NotificationHandler();
        this.recommendationHandler = new RecommendationHandler();

        this.wss.on('connection', (ws: WebSocket) => {
            console.log('New client connected');
            ws.on('message', (message: string) => {
                try {
                    const parsedMessage: CustomMessage = JSON.parse(message);
                    this.handleMessage(ws, parsedMessage);
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

    private async handleMessage(ws: WebSocket, message: CustomMessage) {
        switch (message.action) {
            case 'login':
                await this.userHandler.handleLogin(ws, message.data);
                break;
            case 'logout':
                this.userHandler.handleLogout(ws, message.data);
                break;
            case 'addUser':
                await this.userHandler.handleAddUser(ws, message.data);
                break;
            case 'addMenuItem':
                await this.menuHandler.handleAddMenuItem(ws, message.data);
                break;
            case 'updateMenuPrice':
                await this.menuHandler.handleUpdateMenuPrice(ws, message.data);
                break;
            case 'updateMenuStatus':
                await this.menuHandler.handleUpdateMenuStatus(ws, message.data);
                break;
            case 'viewMenuItems':
                await this.menuHandler.viewMenuItems(ws, message.data);
                break;
            case 'viewRolledOutMenu':
                await this.menuHandler.viewRolledOutMenu(ws, message.data);
                break;
            case 'viewToBeDiscardedMenuItemList':
                await this.recommendationHandler.viewToBeDiscardedMenuItemList(ws, message.data);
                break;
            case 'rolloutMenuNotify':
                await this.notificationHandler.rolloutMenuNotify(ws, message.data);
                break;
            case 'voteRollOutMenuItem':
                await this.notificationHandler.voteRollOutMenuItem(ws, message.data);
                break;
            case 'viewEmployeeVotes':
                await this.notificationHandler.viewEmployeeVotes(ws, message.data);
                break;
            case 'addEmployeeFeedback':
                await this.feedbackHandler.handleAddEmployeeFeedback(ws, message.data);
                break;
            case 'recommendMenuToRollOut':
                await this.feedbackHandler.recommendMenuToRollOut(ws, message.data);
                break;
            case 'discardMenuItem':
                await this.menuHandler.discardMenuItem(ws, message.data);
                break;
            case 'addEmployeeSuggestion':
                await this.feedbackHandler.addEmployeeDiscardItemSuggestion(ws, message.data);
                break;
            case 'viewDisacrdListSuggestions':
                await this.feedbackHandler.viewDisacrdListSuggestions(ws, message.data);
                break;
            default:
                ws.send(JSON.stringify({ action: 'error', data: 'Invalid action.' }));
        }
    }
}

export default AppServer;

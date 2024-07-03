import { WebSocket } from 'ws';
import FoodFeedbackDatabaseManagement from '../database/user-feedback';
import generateFoodRecommendations from '../services/recommendation_engine';

class FeedbackHandler {
    private feedbackDb: FoodFeedbackDatabaseManagement;

    constructor() {
        this.feedbackDb = new FoodFeedbackDatabaseManagement();
    }

    async handleAddEmployeeFeedback(ws: WebSocket, data: any) {
        const { itemId, foodName, userRating, userComment } = data;
        try {
            await this.feedbackDb.addUserFeedbackToDb(itemId, foodName, userRating, userComment);
            ws.send(JSON.stringify({ action: 'addedEmployeeFeedback', data: 'User feedback added successfully.' }));
        } catch (error) {
            ws.send(JSON.stringify({ action: 'error', data: 'Failed to add employee feedback' }));
        }
    }

    async recommendMenuToRollOut(ws: WebSocket, data: any) {
        const feedbackList = await this.feedbackDb.fetchFeedbackFromDB();
        const recommendations = generateFoodRecommendations(feedbackList);
        if (recommendations) {
            ws.send(JSON.stringify({ action: 'recommendMenuToRollOut', data: recommendations }));
        } else {
            ws.send(JSON.stringify({ action: 'error', data: 'Menu Items not found.' }));
        }
    }
}

export default FeedbackHandler;

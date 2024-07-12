import { WebSocket } from 'ws';
import FoodFeedbackDatabaseManagement from '../database/user-feedback';
import {FoodRecommendationEngine} from '../services/recommendation_engine';


class FeedbackHandler {
    private feedbackDb: FoodFeedbackDatabaseManagement;
    private recommendationEngine: FoodRecommendationEngine;
    constructor() {
        this.feedbackDb = new FoodFeedbackDatabaseManagement();
        this.recommendationEngine = new FoodRecommendationEngine();
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
        try{
            const feedbackList = await this.feedbackDb.fetchFeedbackFromDB();
            const recommendations = await this.recommendationEngine.generateFoodRecommendations(ws, feedbackList);
            ws.send(JSON.stringify({ action: 'recommendMenuToRollOut', data: recommendations }));
        }catch (error){
            ws.send(JSON.stringify({ action: 'error', data: 'Menu Items not found.' }));
        }
    }
}

export default FeedbackHandler;

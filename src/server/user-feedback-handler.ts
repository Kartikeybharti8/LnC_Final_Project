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

    async addEmployeeDiscardItemSuggestion(ws: WebSocket, data: any) {
        const { itemId, foodName, suggestions } = data;
        try {
            await this.feedbackDb.addEmployeeDiscardItemSuggestionsToDb(itemId, foodName, suggestions);
            ws.send(JSON.stringify({ action: 'addedEmployeeSuggestion', data: 'User suggestions added successfully.' }));
        } catch (error) {
            ws.send(JSON.stringify({ action: 'error', data: 'Failed to add employee suggestions' }));
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

    async viewDisacrdListSuggestions(ws: WebSocket, data: any) {
        try{
            const suggestions = await this.feedbackDb.fetchDisacrdListSuggestions();
            ws.send(JSON.stringify({ action: 'viewSuggestions', data: suggestions }));
        }catch (error){
            ws.send(JSON.stringify({ action: 'error', data: 'Suggestions for menu items not found.' }));
        }
    }

}

export default FeedbackHandler;

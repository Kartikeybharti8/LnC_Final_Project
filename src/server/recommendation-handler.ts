import { WebSocket } from 'ws';
import { User } from '../models/user';
import RecommendationDatabaseHandler from './database/recommendation-database';
import { FoodItemRating } from '../services/recommendation_engine';

export default class RecommendationHandler {
    private recommendationDb: RecommendationDatabaseHandler;

    constructor() {
        this.recommendationDb = new RecommendationDatabaseHandler();
    }

    async storeRecommendationsToDatabase(ws: WebSocket, foodRatings: FoodItemRating[]){
        try {
            await this.recommendationDb.storeRecommendationsToDatabase(foodRatings);
        } catch (error) {
            console.log("Cannot add Recommendations to DB:", error)
        }
    }

    async viewToBeDiscardedMenuItemList(ws: WebSocket, data: any){
        const user = data[0];
        try{
            const discardItems = await this.recommendationDb.fetchItemsToDiscard();
            if (user.role === "Employee"){
                ws.send(JSON.stringify({ action: 'viewEmployeeToBeDiscardedMenuItemList', data: [discardItems, user] }));
            }else if (user.role === "Chef"){
                ws.send(JSON.stringify({ action: 'viewChefToBeDiscardedMenuItemList', data: [discardItems, user] }));
            }
        }catch(error){
            ws.send(JSON.stringify({ action: 'error', data: 'Error while displaying discardItems' }));
        }
    }

}

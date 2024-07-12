import { WebSocket } from 'ws';
import { User } from '../models/user';
import RecommendationDatabaseHandler from '../database/recommendation-database';
import { FoodItemRating } from '../services/recommendation_engine';

export default class RecommendationHandler {
    private recommendationDb: RecommendationDatabaseHandler;

    constructor() {
        this.recommendationDb = new RecommendationDatabaseHandler();
    }

    async storeRecommendationsToDatabase(ws: WebSocket, foodRatings: FoodItemRating[]){
        console.log('Storing recommendations to the database:', foodRatings);
        try {
            await this.recommendationDb.storeRecommendationsToDatabase(foodRatings);
        } catch (error) {
            console.log("Cannot add Recommendations to DB:", error)
        }
    }

    async viewToBeDiscardedMenuItemList(ws: WebSocket, data: any){
        try{
            const discardItems = await this.recommendationDb.fetchItemsToDiscard();
            console.log(discardItems)
            ws.send(JSON.stringify({ action: 'viewToBeDiscardedMenuItemList', data: discardItems }));
        }catch(error){
            ws.send(JSON.stringify({ action: 'error', data: 'Error while displaying discardItems' }));
        }
    }

}

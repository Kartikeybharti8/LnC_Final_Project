import { CafeteriaDatabaseConnection } from "./create-connection";
import { FoodItemRating } from "../services/recommendation_engine";

export default class RecommendationDatabaseHandler{
    private dbConnection: CafeteriaDatabaseConnection;

    constructor() {
        this.dbConnection = new CafeteriaDatabaseConnection();
      }
    
    async connect() {
        return await this.dbConnection.connect();
      }

    async storeRecommendationsToDatabase(foodRatings: FoodItemRating[]) {
        const connection = await this.connect();
        const sql = `
            INSERT INTO FoodRecommendations (itemId, foodName, average_rating, sentiment, userCount)
            VALUES ? ON DUPLICATE KEY UPDATE
            foodName = VALUES(foodName),
            average_rating = VALUES(average_rating),
            sentiment = VALUES(sentiment),
            userCount = VALUES(userCount);
        `;
        try{
            const values = foodRatings.map(rating => [rating.itemId, rating.foodName, rating.average_rating, rating.sentiment, rating.userCount]);
            await connection.query(sql, [values]);
            console.log('Recommendation added successfully');
        } catch (err) {
            console.error('Error adding Recommendation:', err);
        } finally {
            await connection.end();
        }
     }
    
    async fetchItemsToDiscard(){
        const connection = await this.connect();
        const sql = `
            SELECT * FROM FoodRecommendations WHERE average_rating < 2;
        `;
        try{
            const [discardItems] = await connection.query(sql);
            console.log('Discard Items fetched:', discardItems);
            return discardItems;
        } catch (err) {
            console.error('Error fetching discard Items:', err);
        } finally {
            await connection.end();
        }
    }
}  


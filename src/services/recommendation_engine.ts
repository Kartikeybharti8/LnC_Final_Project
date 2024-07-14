import { WebSocket } from 'ws';
import RecommendationHandler from '../server/recommendation-handler'

export interface FoodItemFeedback {
    feedbackId: string;
    itemId: string;
    foodName: string;
    userComment: string;
    userRating: number;
}

export interface FoodItemRating {
    itemId: string;
    foodName: string;
    average_rating: number;
    sentiment: string;
    userCount: number;
}

export class FoodRecommendationEngine {
    private recommendationHandler: RecommendationHandler;
    constructor() {
        this.recommendationHandler = new RecommendationHandler();
    }

    private async analyzeSentiment(feedback: string[]): Promise<string> {
        const positiveWords = ['good', 'great', 'excellent', 'amazing', 'positive', 'delicious', 'well', 'fresh', 'tasty', 'yummy', 'mazedaar', 'lajawaab', 'swaadish', 'fresh', 'well cooked', 'sweet', 'chatpata'];
        const negativeWords = ['bad', 'poor', 'terrible', 'negative', 'not', 'salty', 'ganda', 'no taste', 'tasteless', 'too spicy', 'too sweet', 'burnt', 'not fresh', 'old', 'not well cooked'];

        let positiveCount = 0;
        let negativeCount = 0;

        feedback.forEach(comment => {
            positiveWords.forEach(word => {
                if (comment.toLowerCase().includes(word)) {
                    positiveCount++;
                }
            });
            negativeWords.forEach(word => {
                if (comment.toLowerCase().includes(word)) {
                    negativeCount++;
                }
            });
        });

        if (positiveCount > negativeCount) {
            return "Most people loved this food, you can try it surely.";
        } else if (negativeCount > positiveCount) {
            return "Most people didn't get impressed, but we are improving.";
        } else {
            return "You can try this, as some people liked this.";
        }
    }

    public async generateFoodRecommendations(ws: WebSocket,feedbackList: FoodItemFeedback[]): Promise<FoodItemRating[]> {
        const foodRatingsMap: { [key: string]: { foodName: string, totalRating: number; userCount: number; feedback: string[] } } = {};

        feedbackList.forEach(feedback => {
            if (!foodRatingsMap[feedback.itemId]) {
                foodRatingsMap[feedback.itemId] = { foodName: feedback.foodName, totalRating: 0, userCount: 0, feedback: [] };
            }

            foodRatingsMap[feedback.itemId].totalRating += feedback.userRating;
            foodRatingsMap[feedback.itemId].userCount += 1;
            foodRatingsMap[feedback.itemId].feedback.push(feedback.userComment);
        });

        const foodRatings: FoodItemRating[] = await Promise.all(Object.keys(foodRatingsMap).map(async itemId => {
            const item = foodRatingsMap[itemId];
            const averageRating = item.totalRating / item.userCount;
            const sentiment = await this.analyzeSentiment(item.feedback);

            return {
                itemId: itemId,
                foodName: item.foodName,
                average_rating: averageRating,
                sentiment: sentiment,
                userCount: item.userCount,
            };
        }));

        await this.recommendationHandler.storeRecommendationsToDatabase(ws, foodRatings);

        return foodRatings;
    }

}

import { WebSocket } from 'ws';
import { FoodRecommendationEngine, FoodItemFeedback} from '../services/recommendation_engine';
import RecommendationHandler from '../server/recommendation-handler';

jest.mock('../server/recommendation-handler');

describe('FoodRecommendationEngine', () => {
    let engine: FoodRecommendationEngine;

    beforeEach(() => {
        engine = new FoodRecommendationEngine();
    });

    describe('analyzeSentiment', () => {
        it('should return positive sentiment when positive words outnumber negative words', async () => {
            const feedback = ['The food was excellent', 'Very tasty and fresh'];
            const sentiment = await engine['analyzeSentiment'](feedback);
            expect(sentiment).toBe("Most people loved this food, you can try it surely.");
        });

        it('should return negative sentiment when negative words outnumber positive words', async () => {
            const feedback = ['The food was not good', 'It was too salty'];
            const sentiment = await engine['analyzeSentiment'](feedback);
            expect(sentiment).toBe("Most people didn't get impressed, but we are improving.");
        });

        it('should return neutral sentiment when positive and negative words are equal', async () => {
            const feedback = ['The food was good but also too spicy'];
            const sentiment = await engine['analyzeSentiment'](feedback);
            expect(sentiment).toBe("You can try this, as some people liked this.");
        });
    });

    describe('generateFoodRecommendations', () => {
        it('should calculate the correct average rating and sentiment', async () => {
            const feedbackList: FoodItemFeedback[] = [
                {
                    feedbackId: '1',
                    itemId: 'item1',
                    foodName: 'Pizza',
                    userComment: 'Amazing and tasty',
                    userRating: 5
                },
                {
                    feedbackId: '2',
                    itemId: 'item1',
                    foodName: 'Pizza',
                    userComment: 'Too salty',
                    userRating: 2
                },
                {
                    feedbackId: '3',
                    itemId: 'item2',
                    foodName: 'Burger',
                    userComment: 'Delicious',
                    userRating: 4
                }
            ];

            const ws = new WebSocket('ws://localhost:8080');
            const mockStoreRecommendationsToDatabase = jest.spyOn(RecommendationHandler.prototype, 'storeRecommendationsToDatabase').mockResolvedValue();

            const foodRatings = await engine.generateFoodRecommendations(ws, feedbackList);

            expect(foodRatings).toEqual([
                {
                    itemId: 'item1',
                    foodName: 'Pizza',
                    average_rating: 3.5,
                    sentiment: "You can try this, as some people liked this.",
                    userCount: 2
                },
                {
                    itemId: 'item2',
                    foodName: 'Burger',
                    average_rating: 4,
                    sentiment: "Most people loved this food, you can try it surely.",
                    userCount: 1
                }
            ]);

            expect(mockStoreRecommendationsToDatabase).toHaveBeenCalledWith(ws, foodRatings);
        });
    });
});

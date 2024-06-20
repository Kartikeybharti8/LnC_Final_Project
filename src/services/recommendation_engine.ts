export interface FoodItemFeedback {
    food_item_id: string;
    userId: string;
    user_feedback: string[];
    rating: number;
}

export interface FoodItemRating {
    food_item_id: string;
    average_rating: number;
    sentiment: string;
}

// src/utils/sentimentAnalysis.ts
export function analyzeSentiment(feedback: string[]): string {
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'positive'];
    const negativeWords = ['bad', 'poor', 'terrible', 'negative'];

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
        return "Most people did'nt got impressed, but we are improving.";
    } else {
        return "You can try this, as some people liked this.";
    }
}

export function generateFoodRecommendations(feedbackList: FoodItemFeedback[]): FoodItemRating[] {
    const foodRatingsMap: { [key: string]: { totalRating: number; count: number; feedback: string[] } } = {};

    feedbackList.forEach(feedback => {
        if (!foodRatingsMap[feedback.food_item_id]) {
            foodRatingsMap[feedback.food_item_id] = { totalRating: 0, count: 0, feedback: [] };
        }

        foodRatingsMap[feedback.food_item_id].totalRating += feedback.rating;
        foodRatingsMap[feedback.food_item_id].count += 1;
        foodRatingsMap[feedback.food_item_id].feedback.push(...feedback.user_feedback);
    });

    const foodRatings: FoodItemRating[] = Object.keys(foodRatingsMap).map(foodItemId => {
        const item = foodRatingsMap[foodItemId];
        const averageRating = item.totalRating / item.count;
        const sentiment = analyzeSentiment(item.feedback);

        return {
            food_item_id: foodItemId,
            average_rating: averageRating,
            sentiment: sentiment
        };
    });

    return foodRatings;
}

const feedbackList: FoodItemFeedback[] = [
    {
        food_item_id: '1',
        userId: 'user1',
        user_feedback: ['This is great!', 'Really good'],
        rating: 5
    },
    {
        food_item_id: '1',
        userId: 'user2',
        user_feedback: ['Not bad', 'Could be better'],
        rating: 3
    },
    {
        food_item_id: '2',
        userId: 'user1',
        user_feedback: ['Terrible experience', 'Will not recommend'],
        rating: 1
    },
    {
        food_item_id: '2',
        userId: 'user3',
        user_feedback: ['Very bad', 'Poor quality'],
        rating: 2
    }
];

const recommendations = generateFoodRecommendations(feedbackList);
console.log(recommendations);


// Interfaces
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

// src/utils/sentimentAnalysis.ts
export function analyzeSentiment(feedback: string[]): string {
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'positive', 'delicious', 'well', 'fresh', 'tasty', ''];
    const negativeWords = ['bad', 'poor', 'terrible', 'negative', 'not'];

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

export default function generateFoodRecommendations(feedbackList: FoodItemFeedback[]): FoodItemRating[] {
    const foodRatingsMap: { [key: string]: { foodName: string, totalRating: number; userCount: number; feedback: string[] } } = {};

    feedbackList.forEach(feedback => {
        if (!foodRatingsMap[feedback.itemId]) {
            foodRatingsMap[feedback.itemId] = { foodName: feedback.foodName, totalRating: 0, userCount: 0, feedback: [] };
        }

        foodRatingsMap[feedback.itemId].totalRating += feedback.userRating;
        foodRatingsMap[feedback.itemId].userCount += 1;
        foodRatingsMap[feedback.itemId].feedback.push(feedback.userComment);
    });

    const foodRatings: FoodItemRating[] = Object.keys(foodRatingsMap).map(itemId => {
        const item = foodRatingsMap[itemId];
        const averageRating = item.totalRating / item.userCount;
        const sentiment = analyzeSentiment(item.feedback);
        
        return {
            itemId: itemId,
            foodName: item.foodName,
            average_rating: averageRating,
            sentiment: sentiment,
            userCount: item.userCount,
        };
    });

    return foodRatings;
}

// // Sample data
// const feedbackList: FoodItemFeedback[] = [
//     {
//         feedbackId: '1',
//         itemId: '1',
//         foodName: 'Burger',
//         userComment: 'Delicious and well-cooked!',
//         userRating: 4,
//     },
//     {
//         feedbackId: '2',
//         itemId: '1',
//         foodName: 'Burger',
//         userComment: 'Too yummy!!',
//         userRating: 3,
//     },
//     {
//         feedbackId: '3',
//         itemId: '2',
//         foodName: 'Pasta',
//         userComment: 'Tasty but a bit too salty.',
//         userRating: 3,
//     },
// ];

// // Generate recommendations
// const recommendations = generateFoodRecommendations(feedbackList);
// console.log(recommendations);

export interface MenuItem {
    itemId?: string;
    foodName: string;
    foodPrice: string;
    foodStatus: 'Available' | 'Not-Available'
    mealType: string; 
}
import { CafeteriaDatabaseConnection } from './create-connection';

export default class FoodFeedbackDatabaseManagement {
  private dbConnection: CafeteriaDatabaseConnection;

  constructor() {
    this.dbConnection = new CafeteriaDatabaseConnection();
  }

  async connect() {
    return await this.dbConnection.connect();
  }

  async addUserFeedbackToDb(itemId: number, foodName: string, userId: number, userRating: number, userComment: string) {
    const connection = await this.connect();
    try {
      const query = `INSERT INTO food_item_feedback (itemId, foodName, userId, userRating, userComment) VALUES (?, ?, ?, ?, ?)`;
      const values = [itemId, foodName, userId, userRating, userComment];
      await connection.query(query, values);
      console.log('User feedback added successfully');
    } catch (err) {
      console.error('Error adding user feedback:', err);
    } finally {
      await connection.end();
    }
  }
}

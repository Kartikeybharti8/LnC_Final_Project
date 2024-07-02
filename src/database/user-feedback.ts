import { CafeteriaDatabaseConnection } from './create-connection';

export default class FoodFeedbackDatabaseManagement {
  private dbConnection: CafeteriaDatabaseConnection;

  constructor() {
    this.dbConnection = new CafeteriaDatabaseConnection();
  }

  async connect() {
    return await this.dbConnection.connect();
  }

  async addUserFeedbackToDb(itemId: number, foodName: string, userRating: number, userComment: string) {
    const connection = await this.connect();
    try {
      const query = `INSERT INTO food_item_feedback (itemId, foodName, userRating, userComment) VALUES (?, ?, ?, ?)`;
      const values = [itemId, foodName, userRating, userComment];
      await connection.query(query, values);
      console.log('User feedback added successfully');
    } catch (err) {
      console.error('Error adding user feedback:', err);
    } finally {
      await connection.end();
    }
  }
  async fetchFeedbackFromDB(): Promise<any> {
    const connection = await this.connect();
    try {
      const query = `SELECT * FROM food_item_feedback ;`;
      const [queryResponse] = await connection.query(query);
      if (Array.isArray(queryResponse) && queryResponse.length > 0) {
        return queryResponse.slice(0, -1);
      }
      return [];
    } catch (err) {
      console.error('Error fetching Feedback:', err);
    } finally {
      await connection.end();
    }
  }

}

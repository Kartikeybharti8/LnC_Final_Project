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

  async addEmployeeDiscardItemSuggestionsToDb(itemId: number, foodName: string, suggestions: string) {
    const connection = await this.connect();
    try {
      const query = `INSERT INTO discard_menu_item_suggestion (itemId, foodName, suggestions) VALUES (?, ?, ?)`;
      const values = [itemId, foodName, suggestions];
      await connection.query(query, values);
      console.log('User suggestions added successfully');
    } catch (err) {
      console.error('Error adding user suggestions:', err);
    } finally {
      await connection.end();
    }
  }


  async fetchFeedbackFromDB(): Promise<any> {
    const connection = await this.connect();
    try {
      const query = `SELECT * FROM food_item_feedback ;`;
      const [queryResponse] = await connection.query(query);
      return queryResponse;
    } catch (err) {
      console.error('Error fetching Feedback:', err);
      return [];
    } finally {
      await connection.end();
    }
  }

  async fetchDisacrdListSuggestions() {
    const connection = await this.connect();
    try {
      const query = `SELECT * FROM  discard_menu_item_suggestion ;`;
      const [queryResponse] = await connection.query(query);
      return queryResponse;
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      return [];
    } finally {
      await connection.end();
    }
  }

}

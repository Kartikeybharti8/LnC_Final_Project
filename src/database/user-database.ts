import { User } from '../models/user';
import { CafeteriaDatabaseConnection } from './create-connection';

class UserDatabaseManagement {
  private dbConnection: CafeteriaDatabaseConnection;

  constructor() {
    this.dbConnection = new CafeteriaDatabaseConnection();
  }

  async connect() {
    return await this.dbConnection.connect();
  }

  async addUserToDb(userName: string, userPassword: string, role: string) {
    const connection = await this.connect();
    try {
      const query = `INSERT INTO user (userName, userPassword, role) VALUES (?, ?, ?)`;
      const values = [userName, userPassword, role];
      await connection.query(query, values);
      console.log('User added successfully');
    } catch (err) {
      console.error('Error adding user:', err);
    } finally {
      await connection.end();
    }
  }

  async fetchUserFromDb(userName: string, userPassword: string): Promise<any> {
    const connection = await this.connect();
    try {
      const query = `SELECT * FROM User WHERE userName = ? AND userPassword = ?`;
      const values = [userName, userPassword];
      const [queryResponse] : any = await connection.query(query, values);
      return queryResponse[0]
    } catch (err) {
      console.error('Error fetching user:', err);
    } finally {
      await connection.end();
    }
  }

  async updateUserPreferenceDb(userId: number, preferences: any) {
    const connection = await this.connect();
    const { spice_level, veg_type, sweet, food_origin } = preferences;
    try {
      const query = `
        UPDATE user
        SET spice_level = ?,
            veg_type = ?,
            sweet = ?,
            food_origin = ?
        WHERE userId = ? AND role = 'Employee';
    `;
      const values = [spice_level, veg_type, sweet, food_origin, userId];
      await connection.query(query, values);
      console.log("Preferences updated successfully")
    } catch (err) {
      console.error('Error updating preferences:', err);
    } finally {
      await connection.end();
    }
  }
}

export default UserDatabaseManagement;

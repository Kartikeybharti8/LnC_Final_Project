// import { CafeteriaDatabaseConnection } from './create-connection';

// async function main() {
//   const dbConnection = new CafeteriaDatabaseConnection();
//   const connection = await dbConnection.connect()
//   try {
//     const query = `
//       SELECT * FROM User WHERE userName = ? AND userPassword = ?`;
//     const values = ['Kartikey', 'Kartikey@123'];
//     const [user] = await connection.query(query, values);
//     console.log('User:', user);
//   } catch (err) {
//     console.error('Error:', err);
//   } finally {
//     await connection.end();
//   }
// }


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
      const query = `
        INSERT INTO User (userName, userPassword, role) VALUES (?, ?, ?)`;
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
}

export default UserDatabaseManagement;

// async function main() {
//   const userDb = new UserDatabaseManagement();

//   // // Add a user to the database
//   // await userDb.addUserToDb('Kartikey', 'Kartikey@123', 'Admin');

//   // Fetch a user from the database
//   const user = await userDb.fetchUserFromDb('Kartikey', 'Kartikey@123');
//   console.log("hi", user);
// }

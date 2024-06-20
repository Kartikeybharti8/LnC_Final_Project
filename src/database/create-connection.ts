import mysql from 'mysql2/promise';

export class CafeteriaDatabaseConnection {

   async connect() {
    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Tank@123',
        database: 'lnc_final_project',
      });
      return connection;
    } catch (err) {
      console.error('Error connecting to database:', err);
      throw err; 
    }
  }
}

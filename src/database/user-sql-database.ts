import mysql from 'mysql2/promise';

async function createDatabaseAndTable() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tank@123',
    database: 'lnc_final_project',
  });

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS lnc_final_project`);

    await connection.query(`USE lnc_final_project`);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS lnc_users (
        userid INT AUTO_INCREMENT PRIMARY KEY,
        usermail VARCHAR(255) NOT NULL,
        userpassword VARCHAR(255) NOT NULL
      )
    `);

    console.log('Database and table created successfully.');

    const [results, fields] = await connection.query(
        'SELECT * FROM `lnc_users` '
      );
    console.log(results); 
    console.log(fields);
    
  } catch (err) {
    console.error('Error creating database and table:', err);
  } finally {
    await connection.end();
  }
}

createDatabaseAndTable();


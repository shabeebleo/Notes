const donenv=require('dotenv')
const mysql = require('mysql2/promise');
donenv.config();



async function connect() {
  try {

   
    const connection = await mysql.createConnection({
      host: process.env.MY_SQL_HOST,
      user:  process.env.MY_SQL_USER,
      password:  process.env.MY_SQL_PASSWORD,
      database:  process.env.MY_SQL_DB,
  
    });
    console.log('Connected to MySQL database');
    return connection;
  } catch (error) {
    console.error('Error connecting to MySQL database:', error);
    throw error;
  }
}

module.exports = {
  connect
};

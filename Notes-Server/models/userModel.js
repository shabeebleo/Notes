
const db = require('../database/db');
const bcrypt = require('bcrypt');

const User = {};

User.create = async (username, email, password) => {
  const connection = await db.connect();
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
  return result.insertId;
};

User.findByEmail = async (email) => {
  const connection = await db.connect();
  const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};
User.findById = async (userId) => {
  const connection = await db.connect();
  const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [userId]);
  return rows[0];
};

module.exports = User;


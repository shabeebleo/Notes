

const db = require('../database/db');

const Note = {};

Note.create = async (title, content, userId) => {
  const connection = await db.connect();
  const [result] = await connection.query('INSERT INTO notes (title, content, created_at, user_id) VALUES (?, ?, CURRENT_TIMESTAMP(), ?)', [title, content, userId]);
  return result.insertId;
};

Note.findByUserId = async (userId) => {
  const connection = await db.connect();
  const [rows] = await connection.query('SELECT * FROM notes WHERE user_id = ?', [userId]);
  return rows;
};

Note.deleteById = async (noteId) => {
  const connection = await db.connect();
  const [result] = await connection.query('DELETE FROM notes WHERE id = ?', [noteId]);
  return result.affectedRows;
};

module.exports = Note;


const Note = require('../models/noteModel');

exports.createNote = async (req, res) => {
  console.log("create note ethi")
  const { title, content} = req.body;
  const userId=req.user.id
  
  try {
    const noteId = await Note.create(title, content, userId);
    res.status(201).json({ noteId });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};

exports.getNotesByUserId = async (req, res) => {
  console.log("get notesssssssss");
  const userId=req.user.id
  try {
    const notes = await Note.findByUserId(userId);
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};

exports.deleteNote = async (req, res) => {
  const { noteId } = req.params;
  try {
    const deletedRows = await Note.deleteById(noteId);
    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};

const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, noteController.createNote);
router.get("/", authMiddleware, noteController.getNotesByUserId);
router.delete("/:noteId", noteController.deleteNote);

module.exports = router;

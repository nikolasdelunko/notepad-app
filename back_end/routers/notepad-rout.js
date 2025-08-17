import express from "express";
import { createNote } from "../controllers/fs.js";
import { getNotes, getNoteById } from "../controllers/fr.js";
import { deleteNote } from "../controllers/fd.js";

const router = express.Router();

router.get("/notes", getNotes);

router.get("/notes/:id", getNoteById);

router.post("/notes", createNote);

router.put("/notes/:id", (req, res) => {
  res.send(`Update note with id ${req.params.id}`);
});

router.delete("/notes/:id", deleteNote);

export default router;

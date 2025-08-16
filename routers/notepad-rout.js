import express from "express";
import { createNote } from "../fs.js";

const router = express.Router();

router.get("/notes", (req, res) => {
  res.send("Get all notes");
});

router.get("/notes/:id", (req, res) => {
  res.send(`Get note with id ${req.params.id}`);
});

router.post("/notes", createNote);

router.put("/notes/:id", (req, res) => {
  res.send(`Update note with id ${req.params.id}`);
});

router.delete("/notes/:id", (req, res) => {
  res.send(`Delete note with id ${req.params.id}`);
});

export default router;

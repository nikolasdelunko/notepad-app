import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Получаем __dirname в ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createNote = (req, res) => {
  const noteObject = req.body;

  fs.mkdir(path.join(__dirname, "files_notes"), { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error creating directory");
    }
    const { title, content } = noteObject;

    if (title.length <= 0 || content.length <= 0) {
      console.error(err);
      return res.status(400).send("400 Bad Request");
    }

    const noteContent = JSON.stringify(noteObject, null, 2);
    const filename = `note_${Date.now()}.json`;

    fs.writeFile(
      path.join(__dirname, "files_notes", filename),
      noteContent,
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error writing file");
        }
        res.status(201).json({ message: "Note created", filename });
      }
    );
  });
};

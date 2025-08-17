import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функция для чтения всех заметок
export const getNotes = (req, res) => {
  const notesDir = path.join(__dirname, "files_notes");
  
  fs.readdir(notesDir, (err, files) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(200).json({ notes: [] });
      }
      console.error(err);
      return res.status(500).send("Error reading notes directory");
    }

    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    if (jsonFiles.length === 0) {
      return res.status(200).json({ notes: [] });
    }

    const notes = [];
    let filesProcessed = 0;

    jsonFiles.forEach(file => {
      fs.readFile(path.join(notesDir, file), 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading file ${file}:`, err);
        } else {
          try {
            const note = JSON.parse(data);
            note.filename = file;
            notes.push(note);
          } catch (parseErr) {
            console.error(`Error parsing file ${file}:`, parseErr);
          }
        }

        filesProcessed++;
        
        if (filesProcessed === jsonFiles.length) {
          res.status(200).json({ notes });
        }
      });
    });
  });
};

// Функция для чтения одной заметки по ID (имени файла)
export const getNoteById = (req, res) => {
  const filename = req.params.id;
  const filePath = path.join(__dirname, "files_notes", filename);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).send("Note not found");
      }
      console.error(err);
      return res.status(500).send("Error reading note");
    }

    try {
      const note = JSON.parse(data);
      res.status(200).json(note);
    } catch (parseErr) {
      console.error(parseErr);
      res.status(500).send("Error parsing note");
    }
  });
};
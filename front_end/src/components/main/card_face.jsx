import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NotesApp.css";

// Создаем экземпляр axios с базовыми настройками
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    // Здесь можно добавить авторизационный токен, если нужно
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
});

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Функция для загрузки заметок с сервера
  const fetchNotes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get("/notes");
      setNotes(response.data.notes);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Error fetching notes"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Загружаем заметки при монтировании компонента
  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !title.trim()) return;

    setIsLoading(true);
    try {
      const response = await api.post("/notes", {
        title,
        content: newNote,
      });

      setNotes([response.data, ...notes]);
      setNewNote("");
      setTitle("");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Error saving note"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNote = async (id) => {
    setIsLoading(true);
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Error deleting note"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="notes-app">
      <div className="notes-list">
        {isLoading && notes.length === 0 ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : notes.length === 0 ? (
          <p>No Notes</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-card">
              <div className="note-card-header">
                <h3>{note.title}</h3>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="delete-btn"
                  disabled={isLoading}
                >
                  ×
                </button>
              </div>
              <p>{note.content}</p>
              <small>
                {new Date(note.createdAt || note.date).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>

      <div className="note-editor">
        <h2>New Tittle</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tittle"
              className="note-title-input"
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Note text..."
              className="note-content-input"
              required
              disabled={isLoading}
            />
          </div>
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotesApp;

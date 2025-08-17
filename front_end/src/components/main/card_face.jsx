import React, { useState } from 'react';
import './NotesApp.css'; // Стили для компонента

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newNote.trim() || !title.trim()) return;
    
    const note = {
      id: Date.now(),
      title: title,
      content: newNote,
      date: new Date().toLocaleString()
    };
    
    setNotes([note, ...notes]);
    setNewNote('');
    setTitle('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="notes-app">
      <div className="notes-list">
        {notes.map(note => (
          <div key={note.id} className="note-card">
            <div className="note-card-header">
              <h3>{note.title}</h3>
              <button 
                onClick={() => deleteNote(note.id)} 
                className="delete-btn"
              >
                ×
              </button>
            </div>
            <p>{note.content}</p>
            <small>{note.date}</small>
          </div>
        ))}
      </div>
      
      <div className="note-editor">
        <h2>New Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tittle"
              className="note-title-input"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Текст заметки..."
              className="note-content-input"
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            SEND
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotesApp;
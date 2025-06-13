import React, { useEffect, useState } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null); // null = adding mode

  // Fetch notes from backend on load
  useEffect(() => {
    fetch('http://localhost:3001/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  // Add or Update Note
  const handleSave = () => {
    if (!title || !text) {
      alert('Please fill in both title and text.');
      return;
    }

    const noteData = { title, text };

    if (editingId) {
      // Update existing note
      fetch(`http://localhost:3001/notes/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData),
      })
        .then(res => res.json())
        .then(updated => {
          setNotes(notes.map(n => (n._id === editingId ? updated.note : n)));
          resetForm();
        });
    } else {
      // Add new note
      fetch('http://localhost:3001/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData),
      })
        .then(res => res.json())
        .then(newNote => {
          setNotes([...notes, newNote.note]);
          resetForm();
        });
    }
  };

  const deleteNote = (id) => {
    fetch(`http://localhost:3001/notes/${id}`, {
      method: 'DELETE',
    }).then(() => setNotes(notes.filter(note => note._id !== id)));
  };

  const editNote = (note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setText(note.text);
  };

  const resetForm = () => {
    setTitle('');
    setText('');
    setEditingId(null);
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
      <h1>📝 Notes</h1>

      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Note Title"
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      />
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Note Text"
        rows={4}
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      />
      <button onClick={handleSave} style={{ marginRight: 10 }}>
        {editingId ? '💾 Update Note' : '➕ Add Note'}
      </button>
      {editingId && (
        <button onClick={resetForm} style={{ backgroundColor: '#ccc' }}>
          ❌ Cancel
        </button>
      )}

      <hr style={{ margin: '20px 0' }} />

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {notes.map(note => (
          <li
            key={note._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: 10,
              marginBottom: 10,
            }}
          >
            <strong style={{ fontSize: 16 }}>{note.title}</strong>
            <p>{note.text}</p>
            <button onClick={() => editNote(note)} style={{ marginRight: 10 }}>
              ✏️ Edit
            </button>
            <button onClick={() => deleteNote(note._id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

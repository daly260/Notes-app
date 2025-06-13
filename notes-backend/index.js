const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors'); // ✅ Add this

const Note = require('./Note');
const app = express();
const PORT = 3001;

// ✅ Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000',   // frontend origin
}));

// Middleware to parse JSON
app.use(express.json());   

// MongoDB connection
mongoose.connect('mongodb+srv://admin:admin123@cluster0.na62hfm.mongodb.net/student-notes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes

//PUT (update) a note by ID

// PUT (update) a note by ID
app.put('/notes/:id', async (req, res) => {
  const { title, text } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, text },   // both fields supported
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note updated!', note: updatedNote });
  } catch (err) {
    res.status(500).json({ message: '❌ Error updating note', error: err });
  }
});


app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// POST a new note
app.post('/notes', async (req, res) => {
  const { title, text } = req.body;
  console.log("📥 Received note:", title, text);
  
  const note = new Note({ title, text });
  await note.save();
  
  console.log("✅ Note saved to DB:", note);
  res.status(201).json({ message: 'Note added!', note });
});



app.delete('/notes/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Note deleted!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

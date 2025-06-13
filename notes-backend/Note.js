// Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },  // ✅ Add this line
  text: { type: String, required: true }
});

module.exports = mongoose.model('Note', noteSchema);

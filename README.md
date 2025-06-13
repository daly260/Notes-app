# 📝 Notes App with React and Node.js

## Overview

This project is a simple full-stack **Notes App** built using **React** for the frontend, **Node.js + Express** for the backend, and **MongoDB** (via **Mongoose**) for data storage. It lets users create, view, delete, and edit notes.

## Features

* **Add Notes**: Quickly add text-based notes.
* **View Notes**: Retrieve and display all notes from the database.
* **Delete Notes**: Remove a note by clicking a button.
* **Edit Notes**: Update an existing note's text.
* **REST API**: Backend provides API endpoints for CRUD operations.

## How It Works

1. The backend connects to a **MongoDB Atlas** cluster using Mongoose.
2. The React frontend communicates with the backend via **fetch** API.
3. Notes are stored and managed in MongoDB.

## Installation

### Prerequisites

Make sure you have:
- Node.js and npm installed
- MongoDB Atlas cluster created

### 1️⃣ Clone the repository

```bash
git clone https://github.com/daly260/notes-app.git
cd notes-app
````

### 2️⃣ Set up the backend

```bash
cd backend
npm install
```

Update MongoDB connection string in `index.js`:

```js
mongoose.connect('mongodb+srv://<your-username>:<your-password>@<your-cluster>.mongodb.net/student-notes')
```

Run the backend:

```bash
node index.js
# or with nodemon
npx nodemon index.js
```

### 3️⃣ Set up the frontend

```bash
cd ../frontend
npm install
npm start
```

The app will run at **[http://localhost:3000](http://localhost:3000)**
Backend API runs at **[http://localhost:3001](http://localhost:3001)**

## API Endpoints

* `GET /notes` → Get all notes
* `POST /notes` → Create a new note
* `DELETE /notes/:id` → Delete a note
* `PUT /notes/:id` → Edit/update a note

## Example Usage (via curl)

```bash
# Add a note
curl -X POST -H "Content-Type: application/json" -d '{"text":"My first note"}' http://localhost:3001/notes

# Get notes
curl http://localhost:3001/notes

# Delete note
curl -X DELETE http://localhost:3001/notes/<note_id>

# Edit note
curl -X PUT -H "Content-Type: application/json" -d '{"text":"Updated note text"}' http://localhost:3001/notes/<note_id>
```

## Security Notice

⚠️ **This project is for educational purposes.** Make sure to secure your MongoDB credentials and API in production environments.

## License

This project is open-source and intended for learning purposes. Feel free to modify and improve!

```


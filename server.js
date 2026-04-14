const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 4040;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public', { index: false }));

// Database setup
const db = new sqlite3.Database('./registrations.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Create table
db.run(`CREATE TABLE IF NOT EXISTS registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  ign TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Optional: keep the old viewer route until removed manually
app.get('/view', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'view.html'));
});

app.post('/register', (req, res) => {
  const { name, ign } = req.body;
  if (!name || !ign) {
    return res.status(400).json({ error: 'Name and IGN are required' });
  }

  const stmt = db.prepare('INSERT INTO registrations (name, ign) VALUES (?, ?)');
  stmt.run(name, ign, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Registration successful', id: this.lastID });
  });
  stmt.finalize();
});

app.get('/api/registrations', (req, res) => {
  db.all('SELECT id, name, ign, timestamp FROM registrations ORDER BY timestamp DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
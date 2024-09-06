const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./contacts.db');

// Create contacts table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      additionalInfo TEXT,
      verified INTEGER DEFAULT 0 
    )
  `);
});

module.exports = db;
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const cors = require('cors');


const app = express();
// Enable CORS for all routes
app.use(cors());

const port = 8888;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// API endpoint to create a contact
app.post('/contacts', (req, res) => {
  const { firstName, lastName, email, phone, additionalInfo } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !phone) {
    return res.status(400).json({ error: 'All fields except additionalInfo are required' });
  }

  const query = `INSERT INTO contacts (firstName, lastName, email, phone, additionalInfo) VALUES (?, ?, ?, ?, ?)`;

  db.run(query, [firstName, lastName, email, phone, additionalInfo], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// API endpoint to list all contacts
app.get('/contacts', (req, res) => {
  db.all('SELECT * FROM contacts', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// API endpoint to update a contact to be verified
app.put('/contacts/:id/verify', (req, res) => {
    const { id } = req.params;

    const query = `UPDATE contacts SET verified = 1 WHERE id = ?`;
    db.run(query, [id], function (err) {
        if (err) {
        return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
        return res.status(404).json({ error: 'Contact not found' });
        }

        res.json({ message: 'Contact marked as verified' });
    });
});

// API endpoint to delete a contact
app.delete('/contacts/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM contacts WHERE id = ?`;

  db.run(query, id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
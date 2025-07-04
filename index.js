const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3500;

// Middleware
app.use(express.json());

// PostgreSQL connection
const con = new Pool({ 
 host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'suvarna',
  database: 'testdb',
});

con.connect().then(() => console.log("Connected to PostgreSQL"));

// POST: Create
app.post('/students', (req, res) => {
  const { id, name, email } = req.body;
  const insert_query = 'INSERT INTO students (id, name, email) VALUES ($1, $2, $3)';
  con.query(insert_query, [id, name, email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "DATA POSTED" });
  });
});

// GET: All
app.get('/students', (req, res) => {
  con.query("SELECT * FROM students", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result.rows);
  });
});

// GET: One
app.get('/students/:id', (req, res) => {
  const id = req.params.id;
  con.query("SELECT * FROM students WHERE id = $1", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.rows.length === 0) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(result.rows[0]);
  });
});

// PUT: Update
app.put('/students/:id', (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  const update_query = "UPDATE students SET name = $1, email = $2 WHERE id = $3";
  con.query(update_query, [name, email, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "UPDATED" });
  });
});

// DELETE
app.delete('/students/:id', (req, res) => {
  const id = req.params.id;
  con.query("DELETE FROM students WHERE id = $1", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "DELETED" });
  });
});

// Server Start
app.listen(port, () => {
  console.log("Server running at http://localhost:${port}");
});
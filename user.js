const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import the database connection

//--------Create a new user-----------

router.post('/', async (req, res) => {
    const { name, email } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO user (name, email) VALUES ($1, $2) RETURNING *', [name, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//Read all users

router.get('/',  async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM user ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//Read a single user by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM user where id = $1', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//Update a user

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const result = await pool.query(
            'UPDATE user SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//Delete a user

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM user WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json({ msg: 'User deleted successfully', deletedUser: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
// backend/index.js
require('dotenv').config();
const express = require('express');
const db      = require('./db');
const app     = express();

app.use(express.json());

// --- existing health check ---
app.get('/health', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW() AS now');
        res.json({ status: 'OK', now: result.rows[0].now });
    } catch (err) {
        res.status(500).json({ status: 'ERROR', message: err.message });
    }
});

// --- add these CRUD routes for /users ---

// Create a user
app.post('/users', async (req, res) => {
    const { username, password_hash, email } = req.body;
    try {
        const { rows } = await db.query(
            `INSERT INTO users (username, password_hash, email)
       VALUES ($1, $2, $3)
       RETURNING id, username, email`,
            [username, password_hash, email]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Find by email
app.get('/users/email/:email', async (req, res) => {
    try {
        const { rows } = await db.query(
            'SELECT id, username, email FROM users WHERE email = $1',
            [req.params.email]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Update user
app.put('/users/:id', async (req, res) => {
    const { username, password_hash, email } = req.body;
    try {
        const { rows } = await db.query(
            `UPDATE users
       SET username=$1, password_hash=$2, email=$3
       WHERE id=$4
       RETURNING id, username, email`,
            [username, password_hash, email, req.params.id]
        );
        if (!rows.length) return res.status(404).json({ error: 'Not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete user
app.delete('/users/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM users WHERE id = $1', [req.params.id]);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- existing app.listen(...) below ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

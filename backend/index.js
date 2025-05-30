// backend/index.js
require('dotenv').config();
console.log('> Using .env:', __dirname + '/.env');
console.log('> PORT=', process.env.PORT);
console.log('> DATABASE_URL=', process.env.DATABASE_URL);

const express = require('express');
const db      = require('./db');
const app     = express();

app.use(express.json());

app.get('/health', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW() AS now');
        res.json({ status: 'OK', now: result.rows[0].now });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'ERROR', message: err.message });
    }
});

// … later we’ll add /users routes here …

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

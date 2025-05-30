// backend/db.js
require('dotenv').config();
const { Pool } = require('pg');

// Explicitly hand the URL to the Pool constructor.
// This avoids any ambiguity in how the env var is loaded.
const pool = new Pool({
    connectionString: process.env.DATABASE_URL.trim(),
    // you can also set ssl: { rejectUnauthorized: false } here if needed
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};

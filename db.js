const { Pool} = require('pg');
require('dotenv').config(); 

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'postgres',
    password: process.env.DB_PASSWORD || 'yogitha',
    port: process.env.DB_PORT || 5432,

});

//Optional: Test the connection
pool.connect((err, client, done) => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log('Connected to the database');
        done(); //Release the client back to the pool
    }
});

module.exports = pool;
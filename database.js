// const { Pool } = require("pg");

// module.exports = pool = new Pool({
//     user: "postgres",
//     password: process.env.PGPW,
//     host: "localhost",
//     port: 5432,
//     database: "sample",
// });

const { Client } = require('pg');

module.exports =  pool = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect();

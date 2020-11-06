const { Pool } = require("pg");

module.exports = pool = new Pool({
    user: "postgres",
    password: process.env.PGPW,
    host: "localhost",
    port: 5432,
    database: "sample",
});



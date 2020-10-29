require('dotenv').config();

const mysql = require('mysql');


const conn = mysql.createConnection({
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});
conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = conn;
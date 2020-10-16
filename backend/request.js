const mysql = require('mysql');


const conn = mysql.createConnection({
    database: 'groupomania',
    host: "localhost",
    user: "root",
    password: "Leane140304",
    port: '3400'
});
conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = conn;
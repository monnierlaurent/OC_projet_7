const mysql = require('mysql');


const conn = mysql.createConnection({
    database: 'groupomania',
    host: "localhost",
    user: "root",
    password: ""
});
conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = conn;
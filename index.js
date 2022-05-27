const express = require("express");
const app = express();
var mysql = require('mysql');
const { DEC8_BIN } = require("mysql/lib/protocol/constants/charsets");

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'ed_eblock'
  });

app.get('/', function (req, res) {


    const getAll = "SELECT * FROM Vehicle";

    db.query(getAll, (err, result) => {
        res.send(result);
    });
})

app.listen(3000, () => {
    console.log("Server running successfully on 3000, man!");
  });
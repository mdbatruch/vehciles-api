const express = require("express");
const app = express();
var mysql = require('mysql');
const cors = require("cors");
const bodyParser = require('body-parser');
var fs = require('fs');
const config = require("./recommended.json");
const { DEC8_BIN } = require("mysql/lib/protocol/constants/charsets");

const { loadUser } = require("./user_model");

console.log(config);

app.use(cors());

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


app.get('/recommendedVehicles/buyer_1/', function (req, res) {

  // let rawdata = fs.readFileSync('./recommended.json');
  // let recommended= JSON.parse(rawdata);
  // console.log('test');

  res.send(loadUser());

  // const getOne = "SELECT * FROM Vehicle";

  // db.query(getAll, (err, result) => {
  //     res.send(result);
  // });
})

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
    console.log("Server running successfully on 3000, man!");
  });
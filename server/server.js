const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
var mysql = require('mysql');

const app = express();
 
app.use(cors());
// parse application/json
app.use(bodyParser.json());
  
//create database connection
const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'ed_eblock'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

app.get('/', function (req, res) {
    res.send('request sent')
})

app.post('/insert', function (req, res) {
  
  const make = req.body.make;

  conn.query('INSERT INTO vehicles (make) VALUES (?)', 
  [make], 
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Inserted");
    }
  });
})
 
app.listen(3001, () => {
  console.log("Server running successfully on 3001, man!");
});
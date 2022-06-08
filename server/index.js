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
app.use(express.json());

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'ed_eblock'
  });

app.get('/', function (req, res) {

    const getAll = "SELECT * FROM vehicles";

    db.query(getAll, (err, result) => {
        res.send(result);
    });
})

app.get('/vehicles', function (req, res) {

  const getAll = "SELECT * FROM vehicles";

  db.query(getAll, (err, result) => {
      res.send(result);
  });
})

app.delete('/delete/:id', (req, res) => {

  const id = req.params.id

  const deleteOne = "DELETE FROM vehicles WHERE id = ?";

    db.query(deleteOne, id, (err, result) => {
        
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
      
    });
})

app.get('/update/:id', function (req, res) {

  const id = req.params.id

  const getOne = "SELECT * FROM vehicles WHERE id = ?";

  console.log(id)

  db.query(getOne, [id], (err, result) => {
      res.send(result);

      console.log(result)
  });
})

app.put('/update', function (req, res) {

  const id = req.body.id
  const year = req.body.year
  const model = req.body.model
  const seller = req.body.seller

  const updateOne = "UPDATE vehicles SET year = ?, model = ?, seller = ? WHERE id = ?";

  db.query(updateOne, [year, model, seller, id], (err, result) => {

      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }

  });
})

app.put('/update_one', function (req, res) {

  const id = req.body.id
  const model = req.body.model

  const updateOne = "UPDATE vehicles SET model = ? WHERE id = ?";

  db.query(updateOne, [model, id], (err, result) => {

      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }

  });
})

app.get('/recommendedVehicles/buyer_1/', function (req, res) {

  res.send(loadUser());

})

app.post('/insert', function (req, res) {

  // console.log(req);
  
  const year = req.body.year;
  const make = req.body.make;
  const model = req.body.model_type;
  const variant = req.body.variant;
  const body_type = req.body.body_type;
  const transmission = req.body.transmission;
  const fuel_type = req.body.fuel_type;
  const displacement = req.body.displacement;
  const seller = req.body.seller;
  const ask_price = req.body.ask_price;

  db.query('INSERT INTO vehicles (year, make, model, variant, body_type, transmission, fuel_type, displacement, seller, ask_price) VALUES (?,?,?,?,?,?,?,?,?,?)', 
  [year, make, model, variant, body_type, transmission, fuel_type, displacement, seller, ask_price],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Inserted");
    }
  });
})

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
    console.log("Server running successfully on 3000, maner!");
  });
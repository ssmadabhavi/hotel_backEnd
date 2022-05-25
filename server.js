const express = require("express");
const app = express();
const port = 3000;
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
const reservRoutes = require("./routes/reservRoute");


// Api Header and Body Configuration
app.use(bodyParser.json()); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });


// Route Configuration
app.use("/reserve", reservRoutes);


// MongoDb connection 
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/HotelReservation");
}


// listen to port defined
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
SchemaName : reservations
*/
const reservationSchema = new Schema({
  reservationId: Number,
  guestId: Number,
  guestName: { type: String, required: true },
  hotelName: { type: String, required: true },
  arrivalDate: { type: String, required: true },
  deptDate: { type: String, required: true },
  reservationStatus: { type: String, required: true },
  baseAmount: { type: Number, required: true },
  taxAmount: { type: Number, required: true },
});

module.exports = mongoose.model("reservations", reservationSchema);

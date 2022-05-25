const Reservation = require("../models/reservation.model");
const { validationResult } = require("express-validator");

/*
Function: getReservations
Objective: get All Reservations 
Params: request, response, next
*/
exports.getReservations = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;
  try {
    const totalItems = await Reservation.find().countDocuments();
    const reservations = await Reservation.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "Fetched Reservations successfully.",
      reservations: reservations,
      totalItems: totalItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



/*
Function: getReservation
Objective: get Single Reservation
Params: request, response, next
*/
exports.getReservation = async (req, res, next) => {
  const resId = req.params.resId;
  const reservation = await Reservation.findOne({ reservationId: resId });
  try {
    if (!reservation) {
      const error = new Error('Could not find reservation.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Reservation fetched.', reservation: reservation });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



/*
Function: addReservation
Objective: Create Reservations
Params: request, response, next
*/
exports.addReservation = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }

  let count = await Reservation.find().count();

  let newId = count + 1;
  const reservation = new Reservation({
    reservationId: newId,
    guestId: 1000 + newId,
    guestName: req.body.guestName,
    hotelName: req.body.hotelName,
    arrivalDate: req.body.arrivalDate,
    deptDate: req.body.deptDate,
    reservationStatus: req.body.reservationStatus,
    baseAmount: req.body.baseAmount,
    taxAmount: req.body.taxAmount,
  });
  
  try {
    await reservation.save();

    res.status(201).json({
      message: "Reservation created successfully!",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/*
Function: cancelReservation
Objective: Cancel Reservation
Params: request, response, next
*/
exports.cancelReservation = async (req, res, next) => {
  const resId = req.params.resId;
  try {
   // const reservation = await Reservation.findOne({ reservationId: resId });
    const reservation = await Reservation.findOneAndUpdate({ reservationId: resId }, { $set: { reservationStatus: "Cancelled" } });
    console.log(reservation);
    if (!reservation) {
      const error = new Error('Could not find Reservation.');
      error.statusCode = 404;
      throw error;
    }
   
    res.status(200).json({ message: 'Reservation cancelled.' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

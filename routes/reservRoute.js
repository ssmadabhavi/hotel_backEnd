
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const reservationController = require('../controllers/reservation.controller..js');

// Fetch Multiple Reservation
router.get('/reservations', reservationController.getReservations);

// Fetch Single Reservation
router.get('/reservation/:resId', reservationController.getReservation);


// //Fetch Guest Summary
// router.get('/reservSummary/:guestName', reservationController.getGuestSummary);


// Add Reservations

router.post(
    '/addReservation',
    [
        body('guestName').not().isEmpty().trim().escape(),
        body('hotelName').not().isEmpty().trim().escape(),
        body('arrivalDate').not().isEmpty().trim().escape(),
        body('deptDate').not().isEmpty().trim().escape(),
         body('reservationStatus').not().isEmpty().trim().escape(),
         body('baseAmount').not().isEmpty().trim().escape(),
         body('taxAmount').not().isEmpty().trim().escape(),
    ],
    reservationController.addReservation
  );
  

  
router.put(
  '/cancelReservation/:resId',
  reservationController.cancelReservation
);

module.exports = router;

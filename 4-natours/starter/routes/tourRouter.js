const express = require('express');
const router = express.Router();
const TourController = require('../controllers/TourController');


router
  .route('/')
  .get(TourController.getAllTour)
  .post( TourController.createTour);

router
  .route('/:id')
  .get(TourController.getTour)
  .delete(TourController.deleteTour);

module.exports = router;

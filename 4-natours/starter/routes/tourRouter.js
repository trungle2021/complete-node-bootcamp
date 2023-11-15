const express = require('express');
const router = express.Router();
const TourController = require('../controllers/TourController');

router.param('id', TourController.checkID);

router
  .route('/')
  .get(TourController.getAllTour)
  .post(TourController.checkBody, TourController.createTour);

router
  .route('/:id')
  .get(TourController.getTour)
  .delete(TourController.deleteTour);

module.exports = router;

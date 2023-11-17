const Tour = require('./../models/tourModel');

const getTour = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const tour = await Tour.findOne(id);
    if (!tour) {
      return res.status(404).json({
        status: 'failed',
        data: null,
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        tour: doc,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllTour = async (req, res) => {
  //BUILD QUERY
  const query = {...req.query}
  const excludedQuery = ["page","limit","sort","fields"]
  excludedQuery.forEach(el => delete query[el])



  //ADVANCED FILTERING
  let queryString = JSON.stringify(query);
  queryString = queryString.replace(/\b(gt|lt|gte|lte)\b/g, match => `$${match}`)
  
  //ADVANCE SORTING
  let sortQuery = JSON.stringify(req.query.sort).split(",").join(" ");

  try {
    const tours = await Tour.find(JSON.parse(queryString)).sort(JSON.parse(sortQuery));
    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'success',
      data: {
        tours: err,
      },
    });
  }
};

const createTour = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const tour = await Tour.create(data);
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

const updateTour = async (req, res) => {
  const id = req.params.id;
  const tour = await Tour.findById(id);
};

const deleteTour = async (req, res) => {
  const id = req.params.id;
  await Tour.findOneAndDelete({ _id: id });
  res.status(200).json({
    status: 'success',
    data: null,
  });
};

module.exports = {
  getAllTour,
  getTour,
  createTour,
  deleteTour,
};

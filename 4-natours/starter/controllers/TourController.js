const fs = require('fs');
const path = require('path');

const tours = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../dev-data', 'data', 'tours-simple.json')
  )
);

const checkID = (req, res, next, val) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      status: 'fail',
      data: null,
      message: 'ID is require',
    });
  }

  if (isNaN(id) || parseInt(id) <= 0) {
    return res.status(400).json({
      status: 'fail',
      data: null,
      message: 'Invalid ID',
    });
  }
  next();
};

const checkBody = (req, res, next) => {
  const body = req.body;
  if (!body.hasOwnProperty('name') || !body.hasOwnProperty('price')) {
    return res.status(400).json({
      status: 'fail',
      message: 'Name And Price is required',
    });
  }
  next();
};

const getTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((item) => item.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      data: null,
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};

const getAllTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours: tours,
    },
  });
};

const createTour = (req, res) => {
  const data = req.body;
  const newId = tours[tours.length - 1].id + 1;
  const newTours = Object.assign({ id: newId }, data);
  tours.push(newTours);
  fs.writeFile(
    path.join(__dirname, './dev-data', 'data', 'tours-simple.json'),
    JSON.stringify(tours),
    (err) =>
      res.status(201).json({
        status: 'success',
        data: {
          newTours,
        },
      })
  );
};

const deleteTour = (req, res) => {
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
  checkID,
  checkBody,
};

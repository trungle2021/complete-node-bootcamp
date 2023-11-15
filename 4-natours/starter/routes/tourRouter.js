const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const tours = JSON.parse(fs.readFileSync(path.join(__dirname, '../dev-data',"data","tours-simple.json")))

const getTour = (req, res) => {
    const id = Number(req.params.id);
    const tour = tours.find(item => item.id === id)
    if(!tour){
        return res.status(404).json({
            status: 'failed',
            data: null
        })
    }
    res.status(200).json({
        status: 'success',
        data:{
            tour: tour
        }
    })
}

const getAllTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data:{
            tours: tours
        }
    })
}

const createTour = (req, res) => {
    const data = req.body;
    const newId = tours[tours.length -1].id + 1;
    const newTours = Object.assign({id: newId}, data)
    tours.push(newTours);
    fs.writeFile(path.join(__dirname, './dev-data',"data","tours-simple.json"), JSON.stringify(tours), err => res.status(201).json({
        status: 'success',
        data:{
            newTours
        }
    }))
}

const deleteTour = (req, res) => {
    const id = Number(req.params.id);
    const tour = tours.find(item => item.id === id)
    if(!tour){
        return res.status(404).json({
            status: 'failed',
            data: null
        })
    }
    tour.remove
}

router.route('/api/v1/tours')
      .get(getAllTour)
      .post(createTour)

router.route('/api/v1/tours/:id')
      .get(getTour)
      .delete(deleteTour)

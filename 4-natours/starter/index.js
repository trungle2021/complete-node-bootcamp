const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const tours = JSON.parse(fs.readFileSync(path.join(__dirname, './dev-data',"data","tours-simple.json")))

app.use(express.json());

app.get('/api/v1/tours/:id', (req, res) => {
    const id = Number(req.params.id);
    const tour = tours.find(item => item.id === id)
    console.log(tour)
    res.status(200).json({
        status: 'success',
        data:{
            tour: tour
        }
    })
});

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        data:{
            tours: tours
        }
    })
});

app.post('/api/v1/tours', (req, res) => {
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
})

const port = 3000;
app.listen(port,()=>{
    console.log("Listening on port: " + port);
});
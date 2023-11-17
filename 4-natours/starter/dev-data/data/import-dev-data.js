const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Tour = require('./../../models/tourModel')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<DATABASE_PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection successfully');
  })
  .catch((err) => console.log(err));

  //READ JSON FILE
  const tours = JSON.parse(fs.readFileSync(path.join(__dirname,"tours-simple.json"), 'utf8'))

  //IMPORT DATA TO DB
 const importData = async () => {
    try{
        await Tour.create(tours)
        console.log("Import data successfully")
    }catch(err){
        console.log(err);
    }
 }

 // DELETE ALL DATA EXISTING FROM DB
 const deleteData = async () => {
    try{
        await Tour.deleteMany({})
        console.log("Delete data successfully")
    }catch(err){
        console.log(err);
    }
 }
console.log(process.argv)
 if(process.argv[2] === '--import'){
    importData()
 }else if(process.argv[2] === '--delete'){
    deleteData()
 }else{
    console.log("Invalid arguments")
 }

  



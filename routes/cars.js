//Modules
const express = require('express');
const Car = require('../models/Car');
const Booking = require('../models/Booking');
const router = express.Router();

//Get the whole list of Cars
router.get('/',async (req,res)=>{
    try{
        const cars = await Car.find();
        res.json(cars);
    }catch(err){
        res.json({message:err});
    }
});

//Add a new Car
router.post('/add',async(req,res)=>{
    console.log(req.body);

    //Checking if the vehicle is present in db or not.
    const checkIfDuplicate = await Car.find({
        vehicleNumber: req.body.vehicleNumber,
    });

    if(checkIfDuplicate.length!=0){
        res.json({message:"The car already exists!"});
    }else{
        const car = new Car({
            vehicleNumber: req.body.vehicleNumber,
            model: req.body.model,
            seatingCapacity: req.body.seatingCapacity,
            rentPerDay:req.body.rentPerDay,
            isBooked: req.body.isBooked,
        });
    
        try{
            const carData = await car.save();
            res.json(carData);
        }catch(err){
            res.json({message:err});
        }
    }
    

});

router.get('/model/:model',async (req,res)=>{
    console.log(req.params.model);
    try{
        const specificCars = await Car.find({model:req.params.model});
        res.json(specificCars);
    }catch(err){
        res.json({message:err});
    }
});
router.get('/:id',async (req,res)=>{
    console.log(req.params.id);
    try{
        const specificCars = await Car.find({vehicleNumber:req.params.id});
        res.json(specificCars);
    }catch(err){
        res.json({message:err});
    }
});
router.get('/isBooked/:isBooked',async (req,res)=>{
    console.log(req.params.isBooked);
    try{
        const specificCars = await Car.find({isBooked:req.params.isBooked});
        res.json(specificCars);
    }catch(err){
        res.json({message:err});
    }
});

router.get('/seatingCapacity/:seatingCapacity',async (req,res)=>{
    console.log(req.params.seatingCapacity);
    try{
        const specificCars = await Car.find({seatingCapacity:req.params.seatingCapacity});
        res.json(specificCars);
    }catch(err){
        res.json({message:err});
    }
});



//Update Car
router.patch('/updateCar/:id',async (req,res)=>{
    console.log(req.params.id);
    const car = await Car.find({
        vehicleNumber:req.params.id
    });
    if(car[0]['isBooked']==true){
        res.json({message:'Cannot be updated, because booked.'})
    }else{
        try{
            const updateCar = await Car.updateOne({vehicleNumber:req.params.id},{$set:{rentPerDay:req.body.rentPerDay}});
            res.json(updateCar);
        }catch(err){
            res.json({message:err});
        }   
    }
    
});

//Delete Car
router.delete('/deleteCar/:id',async (req,res)=>{
    console.log(req.params.id);
    const car = await Car.find({
        vehicleNumber:req.params.id
    });
    if(car[0]['isBooked']==true){
        res.json({message:'Cannot be deleted, because booked.'})
    }else{
        try{
            const deleteCar = await Car.remove({vehicleNumber:req.params.id});
            res.json(deleteCar);
        }catch(err){
            res.json({message:err});
        }
    }
});



//Export Function
module.exports = router;
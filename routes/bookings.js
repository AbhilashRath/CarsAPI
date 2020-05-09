//Modules
const express = require('express');
const Car = require('../models/Car');
const Booking = require('../models/Booking');
const router = express.Router();

router.get('/',async (req,res)=>{
    try{
        const specificBookings = await Booking.find();
        res.json(specificBookings);
    }catch(err){
        res.json({message:err});
    }
});

router.get('/:id',async (req,res)=>{
    console.log(req.params.id);
    try{
        const specificBookings = await Booking.find({vehicleNumber:req.params.id});
        res.json(specificBookings);
    }catch(err){
        res.json({message:err});
    }
});
router.get('/issueDate/:issueDate',async (req,res)=>{
    console.log(req.params.issueDate);
    try{
        const specificBookings = await Booking.find({issueDate:req.params.issueDate});
        res.json(specificBookings);
    }catch(err){
        res.json({message:err});
    }
});
router.get('/returnDate/:returnDate',async (req,res)=>{
    console.log(req.params.returnDate);
    try{
        const specificBookings = await Booking.find({returnDate:req.params.returnDate});
        res.json(specificBookings);
    }catch(err){
        res.json({message:err});
    }
});
router.get('/name/:name',async (req,res)=>{
    console.log(req.params.name);
    try{
        const specificBookings = await Booking.find({name:req.params.name});
        res.json(specificBookings);
    }catch(err){
        res.json({message:err});
    }
});
router.post('/bookCar', async(req,res)=>{
    //console.log(req.body);
    var issuedate = Date.parse(req.body.issueDate);
    var returndate = Date.parse(req.body.returnDate);
    // console.log(issuedate);
    // console.log(returndate);
    const carPresent = await Car.find({
        vehicleNumber:req.body.vehicleNumber,
    });
    if(carPresent.length==0){
        res.json({message:'Car not present in DB.'});
    }
    const alreadyBooked1 = await Booking.find({
        vehicleNumber:req.body.vehicleNumber,
        issueDate: req.body.issueDate,
    });
    const alreadyBooked2 = await Booking.find({
        vehicleNumber:req.body.vehicleNumber,
        returnDate: req.body.returnDate,
    });
    if((alreadyBooked1.length!=0)||(alreadyBooked2.length!=0)){
        res.json({message:'Already booked on given dates.'})
    }
    if(issuedate>=returndate){
        res.json({message:'Cannot return before booking'})
    }else{
        const booking = new Booking({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            vehicleNumber: req.body.vehicleNumber,
            issueDate:req.body.issueDate,
            returnDate: req.body.returnDate,
        });
    
        try{
            const updateCar = await Car.updateOne({vehicleNumber:req.body.vehicleNumber},{$set:{isBooked:true}});
            const bookingData = await booking.save();
            res.json(bookingData);
        }catch(err){
            res.json({message:err});
        }        
    }
});

module.exports = router;
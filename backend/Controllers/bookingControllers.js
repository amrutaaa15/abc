const mongoose=require('mongoose');
const bookingSchema=require('../models/bookingSchema');
const locationSchema=require('../models/locationSchema');
const bookingModel=mongoose.model("slotBooking",bookingSchema)
const locationModel=mongoose.model("locationBooking",locationSchema)

const bookSlot=(req,res)=>{
let bookings=new bookingModel(req.body)
bookings.save((err) => {
    if (err) {
        bookingModel.findOneAndUpdate({ userId: req.body.userId },{ $push: { location: req.body.location ,vehicle:req.body.vehicle,fromTime:req.body.fromTime,toTime:req.body.toTime,date:req.body.date,bookings:req.body.bookings} }, (err, data) => {
            if(err){
                console.log("err")
            }else{
                // console.log("data")
            }
        })
    }
})
}

const locationBooking=(req,res)=>{
    locationModel.findOneAndUpdate({ locationName: req.body.location },{ $push: { bookedSlots: req.body.bookings} }, (err, data) => {
        if(err){
            console.log("err")
        }else{
            // console.log("data")
        }
    })
}

const getSlots=(req,res)=>{
    locationModel.find({}, (err, data) => {
        if (err) throw err;
        res.send(data)
    })
}
module.exports={
    bookSlot:bookSlot,
    locationBooking:locationBooking,
    getSlots:getSlots
}
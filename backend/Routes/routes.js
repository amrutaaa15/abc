const express = require('express');
const router = express.Router();
const connectDb=require('../Database/connectDb')
const upload=require('../multer/upload')
const userGuard=require('../Authentication/auth')

const userController=require('../Controllers/userConterollers')
const bookingController=require('../Controllers/bookingControllers')
connectDb()


router.post('/adduser', upload.single('photo'),userController.addUser)
router.post('/loginuser',userController.loginUser)
// router.get('/dash',userGuard,controller.dashboard)
router.post('/bookslot',bookingController.bookSlot)
router.post('/locationslot',bookingController.locationBooking)
router.get('/getslots',bookingController.getSlots)

module.exports=router


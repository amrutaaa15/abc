const mongoose=require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const multer = require('multer')
const jwtSecret = "asd889asdas5656asdas887";
const userSchema=require('../models/userSchema')
const userModel=mongoose.model('user',userSchema)

const addUser=(req,res)=>{
    const saltRounds = 10;
    const myPlaintextPassword =req.body.password;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(myPlaintextPassword, salt);
    const url = req.protocol + '://' + req.get('host') + '/Images/' + req.file.filename
    console.log(url)
    let ins = new userModel({ firstName: req.body.firstName, lastName: req.body.lastName, emailAddress: req.body.emailAdd, password: hash,photo:url})
    ins.save((err) => {
        if (err) {
            console.log(err.message)
            res.json({ message: "Oops !User already exists please try to login ", err: 1 })
        }
        else{
            res.json({err:0})
        }
        // else {
        //     rand = Math.floor((Math.random() * 100) + 54);
        //     host = req.get('host');
        //     link = "http://" + req.get('host') + "/api"+"/users"+"/verify?id=" + rand;
        //     console.log(link)
        //     let smtpTransoprt = nodemailer.createTransport({
        //         service: 'gmail',
        //         port: 465,
        //         auth: {
        //             user: process.env.email,
        //             pass: process.env.password,
        //         }
        //     });
        //     mailOptions = {
        //         to: req.body.emailAdd,
        //         subject: "Please confirm your Email account",
        //         html: `Please click here to verify <a href=${link} >verify email</a>`
        //     }
        //     console.log(mailOptions);
        //     smtpTransoprt.sendMail(mailOptions, function (error, response) {
        //         if (error) {
        //             console.log(error);
        //             res.send("error");
        //         } else {
        //             console.log("Message sent: ");
        //             res.json({
        //                 success: true,
        //                 status_code: 200,
        //                 message: `Hey ! ${req.body.firstName} was registered successfully`,
        //                 err: 0
        //             })
        //         }
        //     });
           
        // }

    })
   
}
const loginUser=(req,res)=>{
    userModel.findOne({ emailAddress: req.body.emailAdd }, (err, data) => {

        if (err) {
            res.send("its error")
        }
        else if (data == null) {
            res.json({ err: 1, message: "Please write correct email id" })
        }
        // else if(data.isVerified==false){
          
        //     res.json({err:1,message:"please verify your email address"})
        // }
        else if ((bcrypt.compareSync(req.body.password, data.password))) {
            let payload = {
                emailAdd: req.body.emailAdd,
                photo:data.photo,
                id: data._id,
            }
            const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
            res.json({
                err: 0,
                success: true,
                status_code: 200,
                message: `Hey !${data.firstName} You have logged In successfully`,
                token: token
            })
        }
        else {
            res.json({ err: 1, message: "Please Write correct pasword " })
        }
    })
}

module.exports={
    addUser:addUser,
    loginUser:loginUser,
  
}
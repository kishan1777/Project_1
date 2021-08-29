/*const nodemailer = require('nodemailer');
const express = require('express');
const { User } = require('./user');
const router = express.Router();


router.post('/', async (req, res) => {
    try{
        let user = await User.findOne({email:req.query.email});
        if(!user) return res.send('user not found');

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth:{
                user:'mai',
                pass: 'vg'
            }
        });
    
        let info = await transporter.sendMail({
            from: 'mail2',
            to: user.email,
            subject: 'OTP for signup',
            text: `Use ${user.otp} as your OTP`
        })

        res.send('OTP is send to your email')
    
        //console.log("Message sent: %s", info.messageId);
    }
    catch(ex){
        res.status(400).send(ex.message);
    }
    
});

module.exports = router;
   
*/


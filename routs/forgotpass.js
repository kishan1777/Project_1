const express = require('express');
const { User, genrateOtp } = require('../module/user');
const router = express();

router.put('/',async (req, res) => {
    try{
        let user = await User.findOne({email:req.query.email});
        if (!user) return res.status(400).send('Email not found.');
    
        user.otp = genrateOtp();
        user = await user.save();
    
        return res.send('OTP has been send to you.');
    }
    catch(ex){
        res.send(ex.toString());
    }
  
});

module.exports = router;
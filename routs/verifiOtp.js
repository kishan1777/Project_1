const express = require('express');
const { User } = require('../module/user');
const router = express();


router.put('/',async (req, res) => {
    try{
        let user = await User.findOne({email:req.query.email});
        if (!user) return res.status(400).send('User noy found.');
        console.log(user.otp);

        if (user.otp == req.query.otp){
            user.isVerified = true
        }
        else{
            res.send('galat hai')
        }
        user.save();
        
        res.send({
            name:user.name,
            isVerified: user.isVerified
        });
    }
    catch(ex){
        res.status(401).send('Something went worng.')
    }
});

module.exports = router;

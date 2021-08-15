const express = require('express');
const { validate, User, validateUpadtedUser } = require('../module/user');
const router = express();
const bcrypt = require('bcrypt');
const joi = require('joi');


router.post('/', async (req, res) => {
    try{
       
        let user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send('Email is incorrect.');

        const checkPassword = await bcrypt.compare(req.body.password, user.password);
        if(!checkPassword) return res.status(400).send('Password is incorrect.');

        if (user.isVerified == true) {
            const token = user.genrateAuthToken();   
            res.header('x-auth-token',token).send({
                name:user.name,
                email: user.email
            });
        }
        else{
            res.status(400).send('Acount is not verified.');
        }    
    }
    catch(ex){
        res.status(500).send('something went worng.');
        console.log(ex)
    }
});

router.put('/', async (req, res) => {
    try{
        let user = await User.findOne({email:req.query.email});
        if(!user) return res.status(400).send('Email is incorect.');

        const checkPassword = await bcrypt.compare(req.query.password, user.password);
        if(!checkPassword) return res.status(400).send('Invalide password.');

        const {error} = validateUpadtedUser(req.body.name, req.body.password);
        if(error) return res.status(400).send(error.details[0].message);

        if (user.isVerified == true) {
            if(req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }
    
            if(req.body.name) {
                user.name = req.body.name 
            }
    
            user = await user.save();
            res.send({
                name: user.name,
                email: user.email
            });
        }
        else{
            res.status(400).send('user is not verified.');
        }
   
    }
    catch(ex){
        res.status(400).send('something went worng');
    }
});

module.exports = router;
const express = require('express');
const { validate, User, genrateOtp } = require('../module/user');
const router = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
    try{
        const {error} = validate(req.body.name, req.body.email, req.body.password);
        if(error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({email:req.body.email});
        if(user) return res.status(400).send('User Already Ragistared.');

        let isAdmin = await User.findOne({isAdmin:req.body.isAdmin});
        if(isAdmin === true) return res.status(400).send('Admin is already ragistared');

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin,
            otp: genrateOtp()
        
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        
        user.save();
    
        res.send({
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });

       /* const transporter = nodemailer.createTransport({

        })*/
          
    }
    catch(ex){
        res.status(500).send("something went worng");
        console.log(ex);

    }
    
});

router.delete('/:id',[auth, admin], async (req,res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if(!user) return res.status(404).send('Id Not Found.');
    res.send({
        name:user.name,
        email:user.email
    });
});

router.get('/', [auth, admin], async (req, res) => {
    let user = await User.findOne({email:req.query.email});
    if(user) return res.send({
        name:user.name,
        email:user.email,
        _id: user._id
    });
    else{
        user = await User
            .find()
            .select({name:1, email:1, _id:1} );
        res.send(user);
    }    
});

router.put('/', [auth, admin], async (req, res) => {
    try{
        let user = await User.findOne({email: req.query.email});
        if(!user) return res.status(400).send('User with this email is not exist.');
    
        user.subAdmin = req.body.subAdmin;
        if(!user.subAdmin) return res.status(400).send('subAdmin not created')
    
        user = await user.save();
        res.send('subAdmin is created.')
    }
    catch(ex){
        res.status(400).send('something went worng.');
    }
});


module.exports = router;

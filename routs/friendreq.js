const express = require('express');
const { Friend } = require('../module/friendreq');
const { User } = require('../module/user');
const router = express();

router.post('/', async (req, res) => {
    try{
        const userFrom = await User.findOne({email:req.query.email});
        if(!userFrom) return res.status(400).send('invalid email');

        const userTo = await User.findOne({email:req.body.email});
        if(!userTo) return res.status(400).send('this user not found');

        let friends = await Friend.findOne({email:req.body.email});
        
        if(friends){
            if(friends.to == userTo.email && friends.from == userFrom.email){
                return res.status(400).send('requst alrady sent.');
            }
        }
        else{

            friends = new Friend({
                from: userFrom.email,
                to: userTo.email,
                requsted: true
            });
    
            friends = await friends.save();
            res.send(friends);
        }

    }
    catch(ex){
        res.status(400).send(ex.message);
        console.log(ex);
    }

   
});

router.get('/', async (req, res) => {
    try{
        let user = await Friend
            .find({to: req.query.email, requsted: true})
            .select({from: 1});
        if (!user.length) return res.status(400).send('no friend request.');

        res.send(user);
        
    }
    catch(ex){
        res.status(400).send(ex.message);
    }
});

router.put('/', async (req, res) => {
    try{
        let user = await Friend.findOne({_id: req.query._id})
        if (!user) return res.status(400).send('no requst');

        if(user.requsted == true) {

            user.requsted = false
            user.accepted = true

            await user.save()
            return res.send(`you accepted ${user.from} requst`);
        }
        else{
            res.send(`${user.to} is alrady fraind with ${user.from}`);
        }
        
    }
    catch(ex){
        res.status(400).send(ex.message);
        console.log(ex)
    }
});

module.exports = router;
const express = require('express');
const router = express();
const bcrypt = require('bcrypt');
const { User } = require('../module/user');

router.put('/', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.query.email });
        if (!user) return res.status(400).send('User not found.');

        if (user.otp == req.query.otp) {

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);

                await user.save();
            }
            else {
                return res.status(400).send('New password required');
            }

            return res.send('password is updated.');
        }
        else {
            res.status(400).send('Invalid OTP');
        }
    }
    catch (ex) {
        res.status(400).send('something went worng');

    }

});

module.exports = router;
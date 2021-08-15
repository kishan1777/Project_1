const mongoose = require('mongoose');
const joi = require('joi');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:3,
        uppercase: true
    },
    email: {
        type: String,
        required: true,
        maxlenghth: 100,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlenghth:1024
    },
    isAdmin: {
        type: Boolean,
    },
    otp: {
        type: Number
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    subAdmin: {
        type: Boolean,
    },
    friends: {
        type: [String]
    }
});
userSchema.methods.genrateAuthToken = function(){
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, 'project1');
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(name, email, password) {
    const schema = joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().max(100).required().email(),
        password: joi.string().min(8).max(1024).required()
    });
    return schema.validate({name: name, email: email, password: password});
};

function validateUpadtedUser(name, password) {
    const schema = joi.object({
        name: joi.string().min(3),
        password: joi.string().min(8).max(1024)
    });
    return schema.validate({name:name, password: password});
};

function genrateOtp() {
    const otp = Math.floor(Math.random() * 10000);
    return otp
};

exports.User = User;
exports.validate = validateUser;
exports.validateUpadtedUser = validateUpadtedUser;
exports.genrateOtp = genrateOtp;

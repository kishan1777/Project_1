const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./routs/users');
const login = require('./routs/login');
const verifiOtp = require('./routs/verifiOtp');
const forgotpass = require('./routs/forgotpass');
const resetpass = require('./routs/resetpass');
const friendreq = require('./routs/friendreq');
//const sendemail = require('./routs/sendemail');

app.use(express.json());
app.use('/api/user',user);
app.use('/api/login', login);
app.use('/api/verifiotp', verifiOtp);
app.use('/api/forgotpassword', forgotpass);
app.use('/api/resetpassword', resetpass);
app.use('/api/friendreq', friendreq);
//app.use('/api/sendemail', sendemail);

mongoose.connect('mongodb://localhost/project1',{ useUnifiedTopology: true  ,useNewUrlParser: true })
    .then(() => console.log('conected...'))
    .catch((err) => console.error('not conected...',err));

const port = process.env.PORT || 4000;
app.listen(port);
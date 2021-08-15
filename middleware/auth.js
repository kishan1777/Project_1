const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(400).send('Access Denide,no token provided.');

    try{
        const decoded = jwt.verify(token, 'project1');
        req.user = decoded;
        next();
    }
    catch(ex){
        res.status(400).send('Invalid Token')
    }
};

module.exports = auth;
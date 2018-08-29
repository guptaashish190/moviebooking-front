const router = require('express').Router();
const passport = require('passport');
const JWT = require('jsonwebtoken');
const config = require('../config/keysecrets');
// Passport Config
require('../config/passport');

// Local Auth
router.post('/local', passport.authenticate('local', {
    session: false,
}), (req, res) => {
    console.log(req.user);
    res.send(req.user);
});

router.post('/local/admin', passport.authenticate('localAdmin', {
    session: false,
}), (req, res) => {
    console.log(req.user);
    res.send(req.user);
});

// Google Authentication
router.get('/google',passport.authenticate('google',{
    scope: ['profile', 'email'],
    prompt : "select_account" 
}));

router.get('/admin/google',passport.authenticate('googleAdmin',{
    scope: ['profile', 'email'],    
    prompt : "select_account"
}));

// Google Auth Callback
router.get('/google/redirect',passport.authenticate('google',{session: false}), (req,res) => {
    let token = '';
    if(req.user.newUser){
        const data = {
            user: req.user.user,
            newUser: req.user.newUser
        };
        token = JWT.sign(data, config.jwtSecret);
    } else if (req.user.newAdmin){
        const data = {
            user: req.user.user,
            newAdmin: req.user.newAdmin
        }
        token = JWT.sign(data, config.jwtSecret);
    } else if (req.user.adminToken){
        token = req.user.adminToken;
    }
    else{
         token  = req.user.token;
    }
    res.redirect("http://localhost:8080/redirect/?token=" + token); 
});

router.get('/verifyToken', (req,res) => {
    const token = req.headers.authorization.split(" ")[1];
    JWT.verify(token,config.jwtSecret, (err,user) => {
        if(err) return res.status(401).send({err})
        res.json({user});
    });
});

module.exports = router;

const router = require('express').Router();
const User = require('../models/user');
const JWT = require('jsonwebtoken');
const config = require('../config/keysecrets');
const UserInfo = require('../models/userInfo');

router.post('/new/validateUsername', (req,res) => {
    const { username } = req.body;
    User.findOne({USERNAME: username}, (err, user) => {
        if(user){
            res.json({valid: false});
        }else{
            res.json({valid: true});
        }
    });
});

router.post('/new/addUser' , (req,res) => {
    new User({
        USERNAME: req.body.userInfo.USERNAME,
        PASSWORD: req.body.userInfo.PASSWORD,
        GOOGLEID: req.body.userInfo.GOOGLEID
        }).save().then((user) => {
            new UserInfo({
                GOOGLEID: req.body.userInfo.GOOGLEID,
                DISPLAYNAME: req.body.userInfo.DISPLAYNAME,
                PHOTO: req.body.userInfo.PHOTO,
                EMAIL: req.body.userInfo.EMAIL,
                AGE: req.body.userInfo.AGE
            }).save().then(userInfo => {
                const token = JWT.sign(userInfo.toJSON(), config.jwtSecret);
                res.send({
                    token,
                    status: "ok",
                    error: null
                });
            });
        
    }).catch((err)=>{
        console.log(err);
        res.send({
            status: "err",
            err: err
        })
    });
});

module.exports = router;
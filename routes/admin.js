const router = require('express').Router();
const Admin = require('../models/admin');
const JWT = require('jsonwebtoken');
const config = require('../config/keysecrets');
const AdminInfo = require('../models/adminInfo');

router.post('/new/validateAdminName', (req,res) => {
    const { ADMINNAME } = req.body;
    console.log(ADMINNAME);
    Admin.findOne({ADMINNAME: ADMINNAME}, (err, admin) => {
        if(admin){
            res.json({valid: false});
        }else{
            res.json({valid: true});
        }
    });
});

router.post('/new/addAdmin' , (req,res) => {
    if(req.body.adminInfo.ADMINKEY === config.adminLoginSecret){
        new Admin({
            ADMINNAME: req.body.adminInfo.ADMINNAME,
            PASSWORD: req.body.adminInfo.PASSWORD
            }).save().then((user) => {
                new AdminInfo({
                    ADMINNAME: req.body.adminInfo.ADMINNAME,
                    DISPLAYNAME: req.body.adminInfo.DISPLAYNAME,
                    EMAIL: req.body.adminInfo.EMAIL,
                    AGE: req.body.adminInfo.AGE
                }).save().then(adminInfo => {
                    const token = JWT.sign(adminInfo.toJSON(), config.jwtSecret);
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
    }else{
        res.send({
            status: "err",
            err: "Invalid key"
        })
    }
    
});


module.exports = router;
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const keys = require('./keysecrets');
const User = require('../models/user');
const UserInfo = require('../models/userInfo');
const Admin = require('../models/admin');
const AdminInfo = require('../models/adminInfo');
const JWT = require('jsonwebtoken');
const secrets = require('./keysecrets');
//Local Strategy
passport.use('local',new LocalStrategy({
}, (username, password, done) => {
    User.findOne({USERNAME : username}).then((user) => {
        bcrypt.compare(password, user.PASSWORD, (err, valid) => {
            if(valid){
                UserInfo.findOne({GOOGLEID: user.GOOGLEID}, (err,userinfo) => {
                    done(null, {
                        token: JWT.sign(userinfo.toJSON(), secrets.jwtSecret),
                    });
                });
            } else {
                done(null, {
                    token: null,
                });
            }   
        })
    }).catch(() => {
        done(null, {
            user: null,
            err: 'User not found'
        });
    });

}));
passport.use('localAdmin',new LocalStrategy({
}, (username, password, done) => {
    console.log(username, password);
    Admin.findOne({ADMINNAME : username}).then((admin) => {
        bcrypt.compare(password, admin.PASSWORD, (err, valid) => {
            if(valid){
                AdminInfo.findOne({ADMINNAME: username}, (err,adminInfo) => {
                    done(null, {
                        token: JWT.sign(adminInfo.toJSON(), secrets.jwtSecret),
                    });
                });
            } else {
                done(null, {
                    token: null,
                });
            }
        })
    }).catch(() => {
        done(null, {
            user: null,
            err: 'Admin not found'
        });
    });

}));
passport.use('google',new GoogleStrategy(
    {
        callbackURL: '/auth/google/redirect',
        clientID : keys.googleAPI.ID,
        clientSecret: keys.googleAPI.secret
    },
    (accessToken, refreshToken, profile, done) =>{
        console.log("user wala");
        User.findOne({GOOGLEID: profile.id}, (err,user) => {
            if(user){
                UserInfo.findOne({GOOGLEID: user.GOOGLEID}, (err,userinfo) => {
                    done(null, {
                        token: JWT.sign(userinfo.toJSON(), secrets.jwtSecret),
                    });
                });
            } else {
                const newUser = {
                    GOOGLEID: profile.id,
                    DISPLAYNAME: profile.displayName,
                    EMAIL: profile.emails.value,
                    PHOTO: profile.photos[0].value
                };
                done(null, {
                    newUser: true,
                    user: newUser
                });
            }
        });
    }
));
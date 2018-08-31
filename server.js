// Imports
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const loginRouter = require('./routes/login-auth');
const keys = require('./config/keysecrets');
const profileRouter = require('./routes/profile');
const adminRouter = require('./routes/admin');
const editDBRouter = require('./routes/editdb');
const passport = require('passport');
//mongoose.set('debug', true);

const app = express();
 //Connect to mongodb

 mongoose.connect(`mongodb://${keys.mongoDB.user}:${keys.mongoDB.password}@ds129762.mlab.com:29762/movieticketbooking`, err => {
        err ? console.log(err) : console.log("Connected to db");
});

// Use BodyParser for handlingPOST Requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Specify Port 
const PORT = process.env.PORT || 3005;

// Use Morgan for logging
app.use(morgan("dev"));

// Serve Static Files
app.use(express.static(__dirname + "/client/public"));

// Use cors for Cross origin issues
app.use(cors({exposedHeaders: 'Authorization'}));

app.use(passport.initialize());

// Login Router
app.use("/auth",loginRouter);

//Profile Routes
app.use("/profile", profileRouter);

//Admin Routes
app.use("/admin", adminRouter);

//Edit Database Routes
app.use("/editdb", editDBRouter);


// Listening to PORT
app.listen(PORT, ()=>{
    console.log("Listening on PORT: " + PORT);
});
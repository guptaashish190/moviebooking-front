const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const AdminSchema = new Schema({
    ADMINNAME: String,
    PASSWORD: String,
});

AdminSchema.pre('save', function(next){
    const admin = this;
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
  
      bcrypt.hash(admin.PASSWORD, salt, function(err, hash) {
          if (err) return next(err);
          admin.PASSWORD = hash;
          next();
      });
    });
  });

module.exports = mongoose.model("Admin", AdminSchema, "Admin");
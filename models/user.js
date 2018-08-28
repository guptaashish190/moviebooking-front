const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    USERNAME: String,
    PASSWORD: String,
    GOOGLEID: String,
});

UsersSchema.pre('save', function(next){
    const user = this;
    console.log(user);
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
  
      bcrypt.hash(user.PASSWORD, salt, function(err, hash) {
          if (err) return next(err);
          user.PASSWORD = hash;
          next();
      });
    });
  });

module.exports = mongoose.model("Users", UsersSchema, "Users");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserInfoSchema = new Schema({
    GOOGLEID: String,
    DISPLAYNAME: String,
    PHOTO: String,
    EMAIL: String,
    AGE: Number,
});

module.exports = mongoose.model("UserInfo", UserInfoSchema, "UserInfo");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminInfoSchema = new Schema({
    ADMINNAME: String,
    DISPLAYNAME: String,
    EMAIL: String,
    AGE: String,
});

module.exports = mongoose.model("AdminInfo", AdminInfoSchema, "AdminInfo");
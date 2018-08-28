const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminInfoSchema = new Schema({
    GOOGLEID: String,
    EMAIL: String,
    PHOTO: String,
    AGE: String,
});

module.exports = mongoose.model("AdminInfo", AdminInfoSchema, "AdminInfo");
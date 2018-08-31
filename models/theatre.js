const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TheatreSchema = new Schema({
    NAME: String,
    MOVIES: Array,
    LOCATION: String,
    ID: String,
});

module.exports = mongoose.model("Theatres", TheatreSchema, "Theatres");
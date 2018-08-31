const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MoviesSchema = new Schema({
    NAME: String,
    THEATRES: Array,
    LANGUAGEID: String,
    PHOTO: String,
    DESCRIPTION: String,
    ID: String,
});

module.exports = mongoose.model("Movies", MoviesSchema, "Movies");
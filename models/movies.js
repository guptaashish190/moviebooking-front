const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MoviesSchema = new Schema({
    NAME: String,
    THEATRES: Array,
    TIMES: Array,
    LANGUAGEID: String,
});

module.exports = mongoose.model("Movies", MoviesSchema, "Movies");
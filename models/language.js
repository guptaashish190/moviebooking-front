const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
    Language: String,
    ID: String,
});

module.exports = mongoose.model("Language", LanguageSchema, "Language");
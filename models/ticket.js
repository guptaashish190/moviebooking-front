const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    MOVIEID: String,
    TIME: String,
    BUYERID: String,
    AMOUNT: Number,
    NUMBERSEATS: Number,
});

module.exports = mongoose.model("Ticket", TicketSchema, "Ticket");
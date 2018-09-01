const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    MOVIEID: String,
    TIME: String,
    DATE: String,
    SEATS: String,
    GOOGLEID: String,
    THEATREID: String,
});

module.exports = mongoose.model("Ticket", TicketSchema, "Ticket");
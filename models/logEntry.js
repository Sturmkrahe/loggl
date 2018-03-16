var mongoose = require('mongoose');

var logEntrySchema = new mongoose.Schema({
    date: Date,
    hours: Number,
    category: String,
    description: String,
});
var LogEntry = mongoose.model("LogEntry", logEntrySchema);

module.exports = LogEntry;
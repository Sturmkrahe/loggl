var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logEntrySchema = new mongoose.Schema({
    date: Date,
    hours: Number,
    category: String,
    description: String,
    creator: {type: Schema.Types.ObjectId, ref: 'User'}
});

var LogEntry = mongoose.model("LogEntry", logEntrySchema);

module.exports = LogEntry;
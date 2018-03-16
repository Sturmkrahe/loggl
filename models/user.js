var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var LogEntry = require('./logEntry')

var userSchema = new mongoose.Schema({
    displayName: String,
    logEntries: [LogEntry.schema]
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);

module.exports = User;
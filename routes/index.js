var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

var logEntrySchema = new mongoose.Schema({
    date: Date,
    hours: Number,
    category: String,
    description: String
});
var Entry = mongoose.model("Entry", logEntrySchema);

/* GET */
router.get('/', function(req, res, next) {
    Entry.find().sort('-date').find({}, function(err, entries) {
        if (err) {
            res.status(err.status || 500);
            res.render('error');
        }
        else {
            res.render('index', { entries: entries });
        }
    });
});

// CREATE
router.post('/', function(req, res) {
    var date = req.body.date;
    var category = req.body.category;
    var hours = req.body.hours;
    var description = req.body.description;
    
    var newEntry = { date: date, category: category, hours: hours, description: description };

    Entry.create(newEntry, function(err, newEntry) {
        if (err) {
            res.status(err.status || 500);
            res.render('error');
        }
        else {
            console.log("Created entry: \n" + newEntry);
            res.redirect("/");
        }
    });

});

module.exports = router;

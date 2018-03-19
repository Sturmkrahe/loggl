var express = require('express');
var router = express.Router();
var passport = require("passport");
var middleware = require("../middleware");

var User = require('../models/user');
var LogEntry = require('../models/logEntry');

// INDEX
router.get('/', middleware.isLoggedIn, (req, res) => {
    LogEntry.find({
            creator: req.user.id
        })
        .sort({
            date: 'desc'
        })
        .then((entries) => {
            res.render('index', {
                logEntries: entries
            });
        })
        .catch((error) => {
            res.send(error.stack);
        });
});

// NEW
router.post('/', middleware.isLoggedIn, (req, res) => {
    var date = req.body.date;
    var category = req.body.category;
    var hours = req.body.hours;
    var description = req.body.description;
    var creator = req.user.id;

    var newLogEntry = new LogEntry({
        date: date,
        category: category,
        hours: hours,
        description: description,
        creator: creator
    });

    newLogEntry.save()
        .then((entry) => {
            console.log("Created entry: \n" + entry);
            res.redirect('/');
        })
        .catch((error) => {
            res.send(error.stack)
        });
});

// DESTROY
router.delete('/:id', middleware.isLoggedIn, (req, res) => {
    LogEntry.findOneAndRemove({
            _id: req.params.id,
            creator: req.user.id
        })
        .then((entry) => {
            console.log("Deleted entry: \n" + entry);
            res.redirect("/");
        })
        .catch((error) => {
            res.send(error.stack);
        });
});

module.exports = router;
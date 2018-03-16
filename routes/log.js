var express = require('express');
var router = express.Router();
var passport = require("passport");
var middleware = require("../middleware");

var User = require('../models/user');
var LogEntry = require('../models/logEntry');

// INDEX
router.get('/', middleware.isLoggedIn, (req, res) => {
    User.findById(req.user.id, (err, user) => {
        if (err) {
            res.send(err.stack);
        } else {
            res.render('index', {
                logEntries: user.logEntries
            });
        }
    });
});

// NEW
router.post('/', middleware.isLoggedIn, (req, res) => {
    var date = req.body.date;
    var category = req.body.category;
    var hours = req.body.hours;
    var description = req.body.description;

    var newLogEntry = {
        date: date,
        category: category,
        hours: hours,
        description: description,
    };

    User.findById(req.user.id, (err, user) => {
        if (err) {
            res.send(err.stack);
        } else {
            user.logEntries.push(newLogEntry)
            user.save(function (err) {
                if (err) {
                    res.send(err.stack);
                }
                console.log("Created entry: \n" + newLogEntry);
                res.redirect('/');
            });
        }
    });
});

// DESTROY
router.delete('/:id', middleware.isLoggedIn, (req, res) => {
    User.findById(req.user.id, (err, user) => {
        if (err) {
            res.send(err.stack);
        } else {
            user.logEntries.id(req.params.id).remove();

            user.save(function (err) {
                if (err) {
                    res.send(err.stack);
                } else {
                    console.log("Deleted entry: \n" + req.user.id);
                    res.redirect("/");
                }
            });
        }
    });
});

module.exports = router;
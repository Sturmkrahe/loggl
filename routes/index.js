var express = require('express');
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    User.register(new User({
        username: req.body.username
    }), req.body.password, (err, user) => {
        if (err) {
            res.send(err.stack);
        }

        passport.authenticate('local')(req, res, () => {
            res.redirect('log');
        });
    });
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate('local', {
    successRedirect: '/log',
    failureRedirect: '/login',
}), (req, res) => {});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/login");
 });

// INDEX
router.get('/', (req, res) => {
    res.redirect('log');
});

module.exports = router;
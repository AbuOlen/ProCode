const express = require("express");

 
 
module.exports = {
    showHomePage: function (req, res) {
        res.render("login");
    },
    showFailedPage: function (req, res) {
        res.send('You Failed to log in!');
    },
    isLoggedIn: function (req, res, next) {     // Auth middleware that checks if the user is logged in
        if (req.user) {
            next();
        } else {
            res.sendStatus(401);
        }
    },
    showWelcomePage: function (req, res) {
        res.send(`Welcome mr/s ${req.user.displayName}!`);
    },
    redirectToWelcome: function(req, res) {
        console.log(req.user);
        // Successful authentication, redirect home.
        res.redirect('/good');
    },
    viewProfileFacebook: function(req, res) {
        res.render('profile', { user: req.user });
    },
    logout: function(req, res) {
        req.session = null;
        req.logOut();
        res.redirect('/');
    },
};


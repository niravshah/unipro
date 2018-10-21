var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var api_key = process.env.MAILGUN_KEY;
var domain = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var sequelize = require('sequelize');
var models = require('../sequelize/models');
var bcrypt = require('bcrypt');
var salt = 10;

router.post('/login', function (req, res) {

    var where = {email: req.body.data.email};

    models.User.scope({method: ['tenant', req.body.data.tenant]})
        .findOne({where: where})
        .then(function (user) {
            if (user) {
                if (bcrypt.compareSync(req.body.data.password, user.password)) {
                    if (user.active === true) {
                        let token = jwt.sign({
                            data: {email: user.email, admin: user.admin, active: user.active}
                        }, process.env.JWT_SECRET, {
                            expiresIn: "30d",
                            algorithm: 'HS256'
                        });
                        res.json({'token': token})

                    } else {
                        res.status(500).json({message: 'User is not Active. Please contact us at : info@uniprocure.com'})
                    }
                } else {
                    res.status(500).json({message: 'Could not login with those credentials'})
                }

            } else {
                res.status(500).json({message: 'Could not login with those credentials'})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'Could not login with those credentials', err: err.message})
        });

});

router.post('/signup', function (req, res) {

    var where = {email: req.body.data.email};

    models.User.scope({method: ['tenant', req.body.data.tenant]})
        .findOne({where: where})
        .then(function (user) {
            if (user) {
                res.status(500).json({message: 'That email address is already registered'})
            } else {
                var hash = bcrypt.hashSync(req.body.data.password, salt);
                var newUser = models.User.build({
                    tenant_id: req.body.data.tenant,
                    name: req.body.data.name,
                    email: req.body.data.email,
                    password: hash,
                    reset: false,
                    active: false
                });

                newUser.save().then(user => {
                    res.json({message: 'User Sign Up Successful'})
                }).catch(exp => {
                    res.status(500).json({message: 'Could not sign-up right now.' + exp.message, err: exp})
                })
            }
        }).catch(err => {
        res.status(500).json({message: 'Could not sign-up right now.' + exp.message, err: err})
    });


});

module.exports = router;

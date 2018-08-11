var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var factory = require('../utils/factory');

router.post('/login', function (req, res) {

    var UserTM = factory.getTenantModel(User, req.subdomains[0]);
    UserTM.findOne({email: req.body.data.email}).exec(function (err, user) {
        if (err) {
            res.status(500).json({message: err.message})
        } else if (user) {
            if (user.password === req.body.data.password && user.active) {
                let token = jwt.sign({
                    data: {email: user.email, admin: user.admin, active: user.active}
                }, process.env.JWT_SECRET, {
                    expiresIn: 3600,
                    algorithm: 'HS256'
                });
                res.json({'token': token})
            } else {
                res.status(500).json({message: 'Could not login with those credentials'})
            }

        } else {
            res.status(500).json({message: 'Could not login with those credentials'})
        }
    });

});

module.exports = router;

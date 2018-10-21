var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var sequelize = require('sequelize');
var models = require('../sequelize/models');

router.post('/login', function (req, res) {

    var where = {email: req.body.data.email};


    models.User.scope({method: ['tenant', req.body.data.tenant]})
        .findOne({where: where})
        .then(function (user) {
            if (user) {
                if (user.password === req.body.data.password && user.active) {
                    let token = jwt.sign({
                        data: {email: user.email, admin: user.admin, active: user.active}
                    }, process.env.JWT_SECRET, {
                        expiresIn: "30d",
                        algorithm: 'HS256'
                    });
                    res.json({'token': token})
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

module.exports = router;

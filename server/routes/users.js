var express = require('express');
var router = express.Router();
var factory = require('../utils/factory');
var msgs = require('../utils/messages');
var M = require('../models/user');


router.get('/', function (req, res) {
    var TM = factory.getTenantModel(M, req.subdomains[0]);
    TM.find({}).exec(function (err, locations) {
        if (err) {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        } else {
            res.json(locations)
        }
    })
});

router.post('/', function (req, res) {
    var TM = factory.getTenantModel(M, req.subdomains[0]);

    TM.findOne({email: req.body.data.email}, function (err, location) {
        if (err) {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        } else {
            if (location) {
                res.status(500).json({message: msgs.object_already_existis(req.body.data.email)})
            } else {

                var nTM = new TM();
                nTM.email = req.body.data.email;
                nTM.password = req.body.data.password;
                nTM.name = req.body.data.name;
                nTM.admin = req.body.data.admin;
                nTM.active = true;

                nTM.save(function (err, location) {
                    if (err) {
                        res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
                    } else {
                        if (location) {
                            res.json({message: "New User Record Added Successfully", object: location})
                        } else {
                            res.status(500).json({message: msgs.unexpected_error_message})
                        }
                    }
                });
            }
        }
    });
});

router.post('/delete', function (req, res) {
    var TM = factory.getTenantModel(M, req.subdomains[0]);
    var ids = req.query.ids.split(",");
    var idArr = [];
    ids.forEach(function (id) {
        idArr.push(parseInt(id));
    });
    TM.find({user_id: {$in: idArr}}).remove().exec(function (err, item) {
        if (err) {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        } else {
            res.json({message: 'Delete Successful'})
        }
    });
});


module.exports = router;
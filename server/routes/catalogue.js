var express = require('express');
var router = express.Router();
var factory = require('../utils/factory');
var msgs = require('../utils/messages');
var M = require('../models/catalogue');


router.get('/', function (req, res) {
    var TM = factory.getTenantModel(M, req.subdomains[0]);
    TM.find({}).populate({path: 'supplier_ref', select: 'supplier_name'}).exec(function (err, locations) {
        if (err) {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        } else {
            res.json(locations)
        }
    })
});

router.post('/', function (req, res) {
    var TM = factory.getTenantModel(M, req.subdomains[0]);
    var nTM = new TM();
    nTM.gs1_gtin = req.body.data.gs1_gtin;
    nTM.description = req.body.data.description;
    nTM.supplier_ref = req.body.data.supplier_ref._id;

    nTM.save(function (err, item) {
        if (err) {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        } else {
            if (item) {
                res.json({message: "New Catalogue Record Added Successfully", object: item})
            } else {
                res.status(500).json({message: msgs.unexpected_error_message})
            }
        }
    });
});

module.exports = router;
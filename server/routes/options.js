var express = require('express');
var router = express.Router();
var factory = require('../utils/factory');
var SM = require('../models/supplier');
var CM = require('../models/catalogue');
var LM = require('../models/location');

router.get('/supplier_ref', function (req, res) {
    var SMTM = factory.getTenantModel(SM, req.subdomains[0]);
    SMTM.find({}).select('supplier_id supplier_name gs1_gsrn').exec(function (err, suppliers) {
        if (err) {
            res.status(500).json({message: err.message})
        } else {
            res.json({data: suppliers})
        }
    });
});

router.get('/catalogue_ref', function (req, res) {
    var CMTM = factory.getTenantModel(CM, req.subdomains[0]);
    CMTM.find({}).select('supplier_ref gs1_gtin description').exec(function (err, suppliers) {
        if (err) {
            res.status(500).json({message: err.message})
        } else {
            res.json({data: suppliers})
        }
    });
});

router.get('/location_ref', function (req, res) {
    var LMTM = factory.getTenantModel(LM, req.subdomains[0]);
    LMTM.find({}).select('gs1_gln description building').exec(function (err, suppliers) {
        if (err) {
            res.status(500).json({message: err.message})
        } else {
            res.json({data: suppliers})
        }
    });
});

module.exports = router;
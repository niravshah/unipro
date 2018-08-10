var express = require('express');
var router = express.Router();
var factory = require('../utils/factory');
var SM = require('../models/supplier');

router.get('/supplier', function (req, res) {
    var SMTM = factory.getTenantModel(SM, req.subdomains[0]);
    SMTM.find({}).select('supplier_id supplier_name gs1_gsrn').exec(function (err, options) {
        if (err) {
            res.status(500).json({message: err.message})
        } else {
            res.json({data:options})
        }
    });
});

module.exports = router;
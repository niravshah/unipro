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

router.get('/details', function (req, res) {
    var TM = factory.getTenantModel(M, req.subdomains[0]);
    var ids = req.query.ids.split(",");
    var idArr = [];
    ids.forEach(function (id) {
        idArr.push(parseInt(id));
    });
    TM.find({catalogue_id: {$in: idArr}}).populate({
        path: 'supplier_ref',
        select: 'supplier_name'
    }).exec(function (err, items) {
        if (err) {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        } else {
            res.json(items)
        }
    });
});

router.post('/:id', function (req, res) {
    var TM = factory.getTenantModel(M, req.subdomains[0]);
    TM.findOne({catalogue_id: req.params.id}, function (err, item) {
        if (err) {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        } else {
            if (item) {
                req.body.data.supplier_ref = req.body.data.supplier_ref._id;
                TM.findOneAndUpdate({catalogue_id: req.params.id}, req.body.data, {new: true}, function (err, loc) {
                    if (err) {
                        res.status(500).json({message: msgs.object_update_error(req.params.id), err: err.message})
                    } else {
                        res.json(loc)
                    }
                })
            } else {
                res.status(500).json({message: msgs.object_not_found(req.params.id)})
            }
        }
    })
});


router.post('/delete/:id', function (req, res) {
    var TM = factory.getTenantModel(M, req.subdomains[0]);
    TM.find({catalogue_id: req.params.id}).remove().exec(function (err, item) {
        if (err) {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        } else {
            res.json({message: 'Delete Successful'})
        }
    });
});

module.exports = router;
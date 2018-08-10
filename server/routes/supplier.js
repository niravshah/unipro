var express = require('express');
var router = express.Router();
var msgs = require('../utils/messages');
var factory = require('../utils/factory');
var M = require('../models/supplier');

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

router.get('/details', function (req, res) {
    var TM = factory.getTenantModel(M, req.subdomains[0]);
    var ids = req.query.ids.split(",");
    var idArr = [];
    ids.forEach(function (id) {
        idArr.push(parseInt(id));
    });
    TM.find({supplier_id: {$in: idArr}}).exec(function (err, locations) {
        if (err) {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        } else {
            res.json(locations)
        }
    });
});

router.post('/', function (req, res) {
    var TM = factory.getTenantModel(M, req.subdomains[0]);

    TM.findOne({gs1_gsrn: req.body.data.gs1_gsrn}, function (err, location) {
        if (err) {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        } else {
            if (location) {
                res.status(500).json({message: msgs.object_already_existis(req.body.data.gs1_gsrn)})
            } else {

                var nTM = new TM();
                nTM.gs1_gsrn = req.body.data.gs1_gsrn;
                nTM.supplier_name = req.body.data.supplier_name;
                nTM.contact_person = req.body.data.contact_person;
                nTM.contact_number = req.body.data.contact_number;
                nTM.address = req.body.data.address;
                nTM.additional_details = req.body.data.additional_details;
                nTM.save(function (err, location) {
                    if (err) {
                        res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
                    } else {
                        if (location) {
                            res.json({message: "New Supplier Record Added Successfully", object: location})
                        } else {
                            res.status(500).json({message: msgs.unexpected_error_message})
                        }
                    }
                });
            }
        }
    });
});

router.post('/:id', function (req, res) {
    var TM = factory.getTenantModel(M, req.subdomains[0]);
    TM.findOne({supplier_id: req.params.id}, function (err, item) {
        if (err) {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        } else {
            if (item) {
                TM.findOneAndUpdate({supplier_id: req.params.id}, req.body.data, {new: true}, function (err, loc) {
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
    TM.find({supplier_id: req.params.id}).remove().exec(function (err, item) {
        if (err) {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        } else {
            res.json({message: 'Delete Successful'})
        }
    });
});


module.exports = router;
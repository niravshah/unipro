var express = require('express');
var router = express.Router();
var factory = require('../utils/factory');
var msgs = require('../utils/messages');
var M = require('../models/stock');
var LM = require('../models/location');


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

router.get('/location/:id', function (req, res) {

    var TM = factory.getTenantModel(M, req.subdomains[0], req.body.data);
    var LMTM = factory.getTenantModel(LM, req.subdomains[0], req.body.data);

    LMTM.findOne({location_id: req.params.id}).exec(function (err, location) {
        if (err) {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        } else {
            if (location) {
                TM.find({location_ref: location}).populate("location_ref catalogue_ref").exec(function (err, items) {
                    if (err) {
                        res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
                    } else {
                        if (items) {
                            res.json(items)
                        } else {
                            res.status(500).json({message: msgs.unexpected_error_message})
                        }
                    }
                })
            } else {
                res.status(500).json({message: msgs.unexpected_error_message})
            }
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
    TM.find({stock_id: {$in: idArr}}).exec(function (err, items) {
        if (err) {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        } else {
            res.json(items)
        }
    });
});

router.post('/', function (req, res) {
    var TM = factory.getTenantModel(M, req.subdomains[0]);
    var nTM = new TM();
    nTM.description = req.body.data.description;
    nTM.quantity = req.body.data.quantity;
    nTM.catalogue_ref = req.body.data.catalogue_ref._id;
    nTM.location_ref = req.body.data.location_ref._id;

    nTM.save(function (err, location) {
        if (err) {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        } else {
            if (location) {
                res.json({message: "New Goods Record Added Successfully", object: location})
            } else {
                res.status(500).json({message: msgs.unexpected_error_message})
            }
        }
    });
});

router.post('/:id', function (req, res) {
    var TM = factory.getTenantModel(M, req.subdomains[0]);
    TM.findOne({stock_id: req.params.id}, function (err, item) {
        if (err) {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        } else {
            if (item) {
                req.body.data.catalogue_ref = req.body.data.catalogue_ref._id;
                req.body.data.location_ref = req.body.data.location_ref._id;

                TM.findOneAndUpdate({stock_id: req.params.id}, req.body.data, {new: true}, function (err, loc) {
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
    TM.find({stock_id: req.params.id}).remove().exec(function (err, item) {
        if (err) {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        } else {
            res.json({message: 'Delete Successful'})
        }
    });
});

module.exports = router;

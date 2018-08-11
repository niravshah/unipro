var express = require('express');
var router = express.Router();
var factory = require('../utils/factory');
var msgs = require('../utils/messages');
var LocationModel = require('../models/location');


router.get('/', function (req, res) {
    var LocationTenantModel = factory.getTenantModel(LocationModel, req.subdomains[0]);
    LocationTenantModel.find({}).exec(function (err, locations) {
        if (err) {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        } else {
            res.json(locations)
        }
    })
});

router.get('/details', function (req, res) {
    var LocationTenantModel = factory.getTenantModel(LocationModel, req.subdomains[0]);
    var ids = req.query.ids.split(",");
    var idArr = []
    ids.forEach(function (id) {
        idArr.push(parseInt(id));
    });
    LocationTenantModel.find({location_id: {$in: idArr}}).exec(function (err, locations) {
        if (err) {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        } else {
            res.json(locations)
        }
    });
});

router.post('/', function (req, res) {
    var LocationTenantModel = factory.getTenantModel(LocationModel, req.subdomains[0]);
    LocationTenantModel.findOne({gs1_gln: req.body.gs1_gln}, function (err, location) {
        if (err) {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        } else {
            if (location) {
                res.status(500).json({message: msgs.object_already_existis(req.body.gs1_gln)})
            } else {


                var nTM = new LocationTenantModel();
                nTM.gs1_gln = req.body.gs1_gln;
                nTM.description = req.body.description;
                nTM.building = req.body.building;
                nTM.floor = req.body.floor;
                nTM.shelf = req.body.shelf;
                nTM.store = req.body.store;
                nTM.postcode = req.body.postcode;
                nTM.save(function (err, location) {
                    if (err) {
                        res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
                    } else {
                        if (location) {
                            res.json({message: "New Location created successfully", object: location})
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
    console.log(req.params.id);
    var LocationTenantModel = factory.getTenantModel(LocationModel, req.subdomains[0]);
    LocationTenantModel.findOne({location_id: req.params.id}, function (err, location) {
        if (err) {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        } else {
            if (location) {
                LocationTenantModel.findOneAndUpdate({location_id: req.params.id}, req.body.data, {new: true}, function (err, loc) {
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


router.post('/upload', function (req, res) {
    res.json(req.body)
});


module.exports = router;

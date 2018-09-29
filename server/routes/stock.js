var express = require('express');
var router = express.Router();
var factory = require('../utils/factory');
var msgs = require('../utils/messages');
var M = require('../models/stock');
var LM = require('../models/location');
var sequelize = require('sequelize');
var models = require('../sequelize2/models');


router.get('/', function (req, res) {

    console.log("Request Query:", req.query);
    var recordsPerPage = parseInt(req.query.perPage);
    var pageNo = parseInt(req.query.page);

    var where = {};
    var searchTerm = req.query.search;
    if (searchTerm) {
        pageNo = 1;
        where['$Item.description$'] = {[sequelize.Op.like]: '%' + searchTerm + '%'}
    }
    if (req.query.location_id > 0) {
        where['location_id'] = req.query.location_id
    }

    var pageOffset = parseInt(req.query.perPage) * ( pageNo - 1);
    models.Inventory.scope({method: ['tenant', req.body.data.tenant]})
        .findAndCountAll({
            where: where,
            include: [{
                model: models.Item,
                attributes: ['product_code', 'description']
            },
                {
                    model: models.Location,
                    attributes: ['id', 'description']
                },
                {
                    model: models.CostCentre,
                    attributes: ['id', 'cost_centre']
                }],
            limit: recordsPerPage,
            offset: pageOffset
        })
        .then(function (stock) {
            res.json(stock)
        })
        .catch(err => {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        })
});


router.get('/details', function (req, res) {

    var ids = req.query.ids.split(",");
    var idArr = [];
    ids.forEach(function (id) {
        idArr.push(parseInt(id));
    });

    models.Inventory.scope({method: ['tenant', req.body.data.tenant]})
        .findAndCountAll({
            include: [{all: true}, {model: models.Item, include: [models.Manufacturer]}],
            where: {
                inventory_id: {[sequelize.Op.in]: idArr},
                active: {[sequelize.Op.eq]: true}
            }
        })
        .then(function (stock) {
            res.json(stock)
        })
        .catch(err => {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        })
});

router.get('/usage', function (req, res) {
    var ids = req.query.ids.split(",");
    var idArr = [];
    ids.forEach(function (id) {
        idArr.push(parseInt(id));
    });

    var usageDate = {};

    models.Inventory.scope({method: ['tenant', req.body.data.tenant]})
        .findAndCountAll({
            include: [{all: true}],
            where: {
                inventory_id: {[sequelize.Op.in]: idArr}
            }
        })
        .then(function (stock) {
            res.json(stock)
        })
        .catch(err => {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        })


    idArr.forEach(function (id) {
        usageDate[id] = [
            {
                name: 'Actual',
                data: {
                    '2018-01-01': 100000,
                    '2018-02-01': 200000,
                    '2018-03-01': 250000,
                    '2018-04-01': 350000,
                    '2018-05-01': 550000,
                    '2018-06-01': 750000,
                    '2018-07-01': 850000,
                    '2018-08-01': 900000
                }
            },
            {
                name: 'Forecast', data: {
                '2018-01-01': 125000, '2018-02-01': 150000, '2018-03-01': 200000, '2018-04-01': 250000,
                '2018-05-01': 300000, '2018-06-01': 350000, '2018-07-01': 400000, '2018-08-01': 500000,
                '2018-09-01': 600000, '2018-10-01': 650000, '2018-11-01': 800000, '2018-12-01': 1200000
            }
            }
        ]
    });

    res.json(usageDate);
});

router.post('/:id', function (req, res) {
    var oldRecrod = req.body.data;

    var newRecord = models.Inventory.build({
        tenant_id: oldRecrod.tenant_id,
        supplier_id: oldRecrod.supplier_id,
        item_id: oldRecrod.item_id,
        location_id: oldRecrod.location_id,
        cost_centre: oldRecrod.cost_centre,
        inventory_id: oldRecrod.inventory_id,
        min_level: oldRecrod.min_level,
        max_level: oldRecrod.max_level,
        current_level: oldRecrod.current_level,
        active: true
    });

    newRecord.save().then(nR => {
        models.Inventory.scope({method: ['tenant', req.body.data.tenant]})
            .update({active: false}, {where: {'id': oldRecrod.id}}).then(resp => {
            res.json(nR)
        }).catch(err => {
            res.status(500).json(err);
        });
    }).catch(err => {
        res.status(500).json(err);
    });

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

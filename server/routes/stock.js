var express = require('express');
var async = require('async');
var router = express.Router();
var msgs = require('../utils/messages');
var sequelize = require('sequelize');
var models = require('../sequelize/models');


router.get('/', function (req, res) {

    var recordsPerPage = parseInt(req.query.perPage);
    var pageNo = parseInt(req.query.page);

    var where = {active: true};
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

router.get('/orders', function (req, res) {
    var ids = req.query.ids.split(",");
    var idArr = [];
    ids.forEach(function (id) {
        idArr.push(parseInt(id));
    });

    models.Order.scope({method: ['tenant', req.body.data.tenant]})
        .findAndCountAll({
            include: [{all: true}],
            where: {
                product_code: {[sequelize.Op.in]: idArr}
            }
        })
        .then(function (orders) {
            res.json(orders);
        })
        .catch(err => {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        })

});

router.get('/catalogues', function (req, res) {
    var ids = req.query.ids.split(",");
    var idArr = [];
    ids.forEach(function (id) {
        idArr.push(parseInt(id));
    });

    models.Catalogue.scope({method: ['tenant', req.body.data.tenant]})
        .findAndCountAll({
            include: [{all: true}],
            where: {
                item_id: {[sequelize.Op.in]: idArr}
            }
        })
        .then(function (cats) {
            var suppids = [];
            cats.rows.forEach(cat => {
                suppids.push(cat.supplier_id);
            });
            var where = {};
            where['supplier_id'] = {[sequelize.Op.in]: suppids}
            models.CarriageCharge.scope({method: ['tenant', req.body.data.tenant]})
                .findAndCountAll({
                    where: where,
                    include: [{
                        all: true
                    }]
                })
                .then(function (cc) {
                    res.json({cats: cats, cc: cc})
                })
                .catch(err => {
                    res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
                })
        })
        .catch(err => {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        })

});

router.get('/gtin', function (req, res) {
    var gtin = req.query.gtin;

    models.Inventory.scope({method: ['tenant', req.body.data.tenant]})
        .findAndCountAll({
            include: [{all: true}, {model: models.Item, include: [models.Manufacturer]}],
            where: {
                '$Item.gtin$': {[sequelize.Op.eq]: gtin},
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
        .then(function (inventories) {

            if (inventories.count > 0) {
                idArr.forEach(function (id) {
                    var data = {};
                    var sixmonths = {};
                    var twelve_months = {};
                    var seven_days = {};
                    var thirty_days = {};
                    inventories.rows.forEach(row => {
                        if (row.inventory_id == id) {
                            console.log("Inventory Data:", row.createdAt, typeof row.createdAt);
                            data[row.getCreatedDate()] = row.current_level;

                            if (row.isCreatedAtSevenDaysAgo()) {
                                seven_days[row.getCreatedDate()] = row.current_level;
                            }
                        }
                    });

                    console.log("Inventory Data:", data);
                    usageDate[id] = [
                        {
                            name: 'Current Usage',
                            data: data
                        }, {
                            name: 'Seven Data',
                            data: seven_days
                        }
                    ]
                });
            }

            res.json(usageDate);
        })
        .catch(err => {
            res.status(500).json({message: msgs.unexpected_error_message, err: err.message})
        })


})
;
router.post('/checkout', function (req, res) {
    console.log("Request Data:", req.body.items);

    async.forEachOf(req.body.items, function (value, key, callback) {
        console.log(value, key);


        models.Inventory.scope({method: ['tenant', req.body.data.tenant]})
            .findOne({where: {'id': key}})
            .then(item => {

                var newRecord = models.Inventory.build({
                    tenant_id: item.tenant_id,
                    supplier_id: item.supplier_id,
                    item_id: item.item_id,
                    location_id: item.location_id,
                    cost_centre: item.cost_centre,
                    inventory_id: item.inventory_id,
                    min_level: item.min_level,
                    max_level: item.max_level,
                    current_level: item.current_level - value,
                    active: true
                });

                newRecord.save().then(nR => {
                    models.Inventory.scope({method: ['tenant', req.body.data.tenant]})
                        .update({active: false}, {where: {'id': item.id}}).then(resp => {
                        callback()
                    }).catch(err => {
                        callback(err);
                    });
                }).catch(err => {
                    callback(err);
                });
                callback();
            })
            .catch(err => {
                callback(err);
            });

    }, function (err) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json({msg: "ok"});
        }
    });

    /*req.body.items.forEach(item => {

     var newRecord = models.Inventory.build({
     tenant_id: item.tenant_id,
     supplier_id: item.supplier_id,
     item_id: item.item_id,
     location_id: item.location_id,
     cost_centre: item.cost_centre,
     inventory_id: item.inventory_id,
     min_level: item.min_level,
     max_level: item.max_level,
     current_level: item.current_level - item.qty,
     active: true
     });

     newRecord.save().then(nR => {
     models.Inventory.scope({method: ['tenant', req.body.data.tenant]})
     .update({active: false}, {where: {'id': item.id}}).then(resp => {
     res.json(nR)
     }).catch(err => {
     res.status(500).json(err);
     });
     }).catch(err => {
     res.status(500).json(err);
     });

     });
     */


});

router.post('/:id', function (req, res) {

    console.log(req.body.data);
    models.Inventory.scope({method: ['tenant', req.body.data.tenant]})
        .update(req.body.data, {where: {'inventory_id': req.params.id}})
        .then(resp => {
            models.Item.scope({method: ['tenant', req.body.data.tenant]}).update(
                req.body.data.Item, {where: {'id': req.body.data.Item.id}}
            ).then(resp2 => {
                res.json({inventory: resp, item: resp2})
            }).catch(err => {
                res.status(500).json(err);
            })
        }).catch(err => {
        res.status(500).json(err);
    });

});

router.post('/:id/level_up', function (req, res) {

    models.Inventory.scope({method: ['tenant', req.body.data.tenant]})
        .findOne({where: {inventory_id: req.params.id, active: true}}).then(oldRecrod => {

        var newRecord = models.Inventory.build({
            tenant_id: oldRecrod.tenant_id,
            supplier_id: oldRecrod.supplier_id,
            item_id: oldRecrod.item_id,
            location_id: oldRecrod.location_id,
            cost_centre: oldRecrod.cost_centre,
            inventory_id: oldRecrod.inventory_id,
            min_level: oldRecrod.min_level,
            max_level: oldRecrod.max_level,
            current_level: oldRecrod.current_level + 1,
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
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.post('/:id/level_down', function (req, res) {

    models.Inventory.scope({method: ['tenant', req.body.data.tenant]})
        .findOne({where: {inventory_id: req.params.id, active: true}}).then(oldRecrod => {

        var newRecord = models.Inventory.build({
            tenant_id: oldRecrod.tenant_id,
            supplier_id: oldRecrod.supplier_id,
            item_id: oldRecrod.item_id,
            location_id: oldRecrod.location_id,
            cost_centre: oldRecrod.cost_centre,
            inventory_id: oldRecrod.inventory_id,
            min_level: oldRecrod.min_level,
            max_level: oldRecrod.max_level,
            current_level: oldRecrod.current_level - 1,
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

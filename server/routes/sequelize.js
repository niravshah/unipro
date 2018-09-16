var express = require('express');
var router = express.Router();
var models = require('../sqlize/models');
var path = require('path');


var Bulk = require('../utils/sequelizeBulkInsert');


router.get('/users/:name', function (req, res) {
    models.User.build({username: req.params.name}).save().then(function (user, err) {
        res.json([err, user]);
    })
});

router.get('/users', function (req, res) {
    models.User.find({}).then(function (err, users) {
        res.json([err, users]);
    })
});

router.get('/locations', function (req, res) {
    models.Location.scope({method:['tenant',req.body.data['tenant'].id]}).find({}).then(function (err, locations) {
        res.json([err, locations]);
    })
});

router.get('/bulk/tenants', function (req, res) {
    var bulk = new Bulk(models.Tenant);
    var fpath = path.join(__dirname, '..', 'sqlize', 'data', 'tenant.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk/tax_codes', function (req, res) {
    var bulk = new Bulk(models.TaxCode);
    var fpath = path.join(__dirname, '..', 'sqlize', 'data', 'tax_code.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk/eclass', function (req, res) {
    var bulk = new Bulk(models.EClass);
    var fpath = path.join(__dirname, '..', 'sqlize', 'data', 'eclass.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk/cost_centre', function (req, res) {
    var bulk = new Bulk(models.CostCentre);
    var fpath = path.join(__dirname, '..', 'sqlize', 'data', 'cost_centre.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk/suppliers', function (req, res) {
    var bulk = new Bulk(models.Supplier);
    var fpath = path.join(__dirname, '..', 'sqlize', 'data', 'suppliers.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk/product_groups', function (req, res) {
    var bulk = new Bulk(models.ProductGroup);
    var fpath = path.join(__dirname, '..', 'sqlize', 'data', 'product_group.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk/locations', function (req, res) {
    var bulk = new Bulk(models.Location);
    var fpath = path.join(__dirname, '..', 'sqlize', 'data', 'location.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk/contracts', function (req, res) {
    var bulk = new Bulk(models.Contract);
    var fpath = path.join(__dirname, '..', 'sqlize', 'data', 'contract.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk/products', function (req, res) {
    var bulk = new Bulk(models.Product);
    var fpath = path.join(__dirname, '..', 'sqlize', 'data', 'product.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk/orders', function (req, res) {
    var bulk = new Bulk(models.Order);
    var fpath = path.join(__dirname, '..', 'sqlize', 'data', 'order.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk/inventory', function (req, res) {
    var bulk = new Bulk(models.Inventory);
    var fpath = path.join(__dirname, '..', 'sqlize', 'data', 'inventory.csv');
    bulkImport(bulk, fpath, res);
});

function bulkImport(bulk, fpath, res) {
    bulk.importFile(fpath, function (resp) {
        res.json({message: "Data Import Successful", resp: resp})
    }, function (err) {
        res.json({message: "Data Import Failed", err: err});
    })
}

module.exports = router;
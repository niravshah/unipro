var express = require('express');
var router = express.Router();
var models = require('../sequelize/models');
var path = require('path');


var Bulk = require('../utils/sequelizeBulkInsert');

router.get('/bulk2/tenants', function (req, res) {
    var bulk = new Bulk(models.Tenant);
    var fpath = path.join(__dirname, '..', 'sequelize', 'data', 'tenant.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk2/locations', function (req, res) {
    var bulk = new Bulk(models.Location);
    var fpath = path.join(__dirname, '..', 'sequelize', 'data', 'location.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk2/manufacturers', function (req, res) {
    var bulk = new Bulk(models.Manufacturer);
    var fpath = path.join(__dirname, '..', 'sequelize', 'data', 'manufacturer.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk2/catalogues', function (req, res) {
    var bulk = new Bulk(models.Catalogue);
    var fpath = path.join(__dirname, '..', 'sequelize', 'data', 'catalogue.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk2/carriage_charges', function (req, res) {
    var bulk = new Bulk(models.CarriageCharge);
    var fpath = path.join(__dirname, '..', 'sequelize', 'data', 'carraige_charges.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk2/items', function (req, res) {
    var bulk = new Bulk(models.Item);
    var fpath = path.join(__dirname, '..', 'sequelize', 'data', 'item.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk2/inventories', function (req, res) {
    var bulk = new Bulk(models.Inventory);
    var fpath = path.join(__dirname, '..', 'sequelize', 'data', 'inventory.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk2/suppliers', function (req, res) {
    var bulk = new Bulk(models.Supplier);
    var fpath = path.join(__dirname, '..', 'sequelize', 'data', 'supplier.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk2/cost_centre', function (req, res) {
    var bulk = new Bulk(models.CostCentre);
    var fpath = path.join(__dirname, '..', 'sqlize', 'data', 'cost_centre.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk2/order_types', function (req, res) {
    var bulk = new Bulk(models.OrderType);
    var fpath = path.join(__dirname, '..', 'sequelize', 'data', 'order_type.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk2/eclass', function (req, res) {
    var bulk = new Bulk(models.Eclass);
    var fpath = path.join(__dirname, '..', 'sequelize', 'data', 'eclass.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk2/tax_codes', function (req, res) {
    var bulk = new Bulk(models.TaxCode);
    var fpath = path.join(__dirname, '..', 'sequelize', 'data', 'tax_code.csv');
    bulkImport(bulk, fpath, res);
});

router.get('/bulk2/orders', function (req, res) {
    var bulk = new Bulk(models.Order);
    var fpath = path.join(__dirname, '..', 'sequelize', 'data', 'order.csv');
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
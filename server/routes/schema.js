var express = require('express');
var schemas = require('../utils/schemas');

var router = express.Router();

router.get('/location', function (req, res) {
    res.json(schemas.getSummarySchema(schemas.location_schema));
});

router.get('/location/headers', function (req, res) {
    res.json({"headers": schemas.getExcelUploadHeaders(schemas.location_schema)});
});

router.get('/location/mdef', function (req, res) {
    res.json(schemas.getMongooseSchema(schemas.location_schema));
});

router.get('/goods', function (req, res) {
    res.json(schemas.getSummarySchema(schemas.goods_schema));
});

router.get('/goods/headers', function (req, res) {
    res.json({"headers": schemas.getExcelUploadHeaders(schemas.goods_schema)});
});

router.get('/goods/mdef', function (req, res) {
    res.json(schemas.getMongooseSchema(schemas.goods_schema));
});

router.get('/goods/v-def', function (req, res) {
    res.json(schemas.goods_schema_vdef);
});

router.get('/stock', function (req, res) {
    res.json(schemas.getSummarySchema(schemas.stock_schema));
});

router.get('/stock/v-def', function (req, res) {
    res.json(schemas.stock_schema_vdef);
});

router.get('/stock/headers', function (req, res) {
    res.json({"headers": schemas.getExcelUploadHeaders(schemas.stock_schema)});
});

router.get('/suppliers', function (req, res) {
    res.json(schemas.getSummarySchema(schemas.supplier_schema));
});

router.get('/suppliers/headers', function (req, res) {
    res.json({"headers": schemas.getExcelUploadHeaders(schemas.supplier_schema)});
});

router.get('/suppliers/v-def', function (req, res) {
    res.json(schemas.supplier_schema_vdef);
});

router.get('/catalogue', function (req, res) {
    res.json(schemas.getSummarySchema(schemas.catalogue_schema));
});

router.get('/catalogue/v-def', function (req, res) {
    res.json(schemas.catalogue_schema_vdef);
});

module.exports = router;

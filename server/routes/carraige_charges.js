var express = require('express');
var router = express.Router();

var sequelize = require('sequelize');
var models = require('../sequelize/models');

router.get('/', function (req, res) {

    var recordsPerPage = parseInt(req.query.perPage);
    var pageNo = parseInt(req.query.page);

    var where = {};
    var searchTerm = req.query.search;
    if (searchTerm) {
        pageNo = 1;
        where['$Supplier.name$'] = {[sequelize.Op.like]: '%' + searchTerm + '%'}
    }

    if (req.query.ids) {
        var ids = req.query.ids.split(",");
        var suppids = [];
        ids.forEach(function (id) {
            suppids.push(parseInt(id));
        });
        where['supplier_id'] = {[sequelize.Op.in]: suppids}
    }

    var pageOffset = parseInt(req.query.perPage) * ( pageNo - 1);

    models.CarraigeCharge.scope({method: ['tenant', req.body.data.tenant]})
        .findAndCountAll({
            where: where,
            include: [{
                all: true
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
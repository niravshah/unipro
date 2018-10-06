var express = require('express');
var router = express.Router();
var models = require('../sequelize/models');

router.get('/:id/supplier/:sid/barcodes', function (req, res) {
    models.Barcode.scope({method: ['tenant', req.body.data.tenant]})
        .findAndCountAll({where: {item_id: req.params.id, supplier_id: req.params.sid}}).then(resp => {
        res.json(resp);
    }).catch(err => {
        console.log("ERROR: /:id/supplier/:sid/barcodes : ", err, req.params);
        res.status(500).json(err);
    })
});


router.post('/:id/barcode', function (req, res) {
    var newRecord = models.Barcode.build(req.body.data);
    newRecord.tenant_id = req.body.data.tenant;
    newRecord.save().then(nR => {
        res.json(nR);
    }).catch(err => {
        console.log("ERROR: /item/:id/barcode: ", err);
        res.status(500).json(err);
    });
});


module.exports = router;
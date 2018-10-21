var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var _ = require('underscore');

// var schemas = require('../utils/schemas');

var convertExcel = require('excel-as-json').processFile;


/*
router.post('/locations', upload.single('file'), function (req, res) {
    convertExcel(req.file.path, null, null, function (err, data) {
        var schema = schemas.getExcelUploadHeaders(schemas.location_schema);
        var {schemaValid, errors} = validateSchema(schema, data[0]);
        if (schemaValid) {
            return res.status(200).send({"data": data});
        } else {
            return res.status(500).json({
                "message": "Your data does not have valid header.",
                "header": schema,
                "errors": errors
            })
        }
    });

});
*/

/*
router.post('/stock', upload.single('file'), function (req, res) {
    convertExcel(req.file.path, null, null, function (err, data) {
        var schema = schemas.getExcelUploadHeaders(schemas.stock_schema);
        var {schemaValid, errors} = validateSchema(schema, data[0]);
        if (schemaValid) {
            return res.status(200).send(data);
        } else {
            return res.status(500).json({
                "message": "Your data does not have valid header.",
                "header": schema,
                "errors": errors
            })
        }
    });

});*/


var validateSchema = function (schema, data) {

    var data_schema = _.keys(data);
    var schemaValid = true;
    var errors = [];
    _.each(data_schema, function (ds) {
        if (!_.include(schema, ds)) {

            errors.push("Field: " + ds + " did not match any valid headers");
            schemaValid = false;
        }
    });
    return {schemaValid, errors};

};

module.exports = router;

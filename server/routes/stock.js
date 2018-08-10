var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    res.json(stock)
});

router.get('/details', function (req, res) {
    res.json(stock)
});

router.post('/upload', function (req, res) {
    res.json(req.body)
});


var stock = [{
    stock_id: 12345,
    item_description: "Item Description 12345",
    gs1_gtin: 1234567,
    location: "LOC1",
    gs1_gln: 1234567,
    quantity: 12,
    status: "Shelf",
    sub_status: "Shelf",
    last_moved: "2018-10-31:9:35 am",
    last_purchased: "2018-10-31:9:35 am",
    supplier: "SUPP1",
    gs1_gsrn: 45678
}, {
    stock_id: 12346,
    item_description: "Item Description 12346",
    gs1_gtin: 1234567,
    location: "LOC1",
    gs1_gln: 1234567,
    quantity: 12,
    status: "Shelf",
    sub_status: "Shelf",
    last_moved: "2018-10-31:9:35 am",
    last_purchased: "2018-10-31:9:35 am",
    supplier: "SUPP1",
    gs1_gsrn: 45678
}];

module.exports = router;

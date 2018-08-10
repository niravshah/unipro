var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');

router.get('/', function (req, res) {
    res.render('index', {})
});

router.get('/posts', function (req, res) {
    res.send(
        [{
            id: 12,
            title: "Hello World!",
            description: "Hi there! How are you?"
        },
            {
                id: 14,
                title: "Post 2",
                description: "Post 2 Description    "
            }]
    )
});

router.get('/posts/:id', jwt({secret: process.env.JWT_SECRET}), function (req, res) {
    res.send(
        {
            id: req.params.id,
            title: "Post Number " + req.params.id,
            description: "Hi there! How are you?"
        }
    )
});


module.exports = router;

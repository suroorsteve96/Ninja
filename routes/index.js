var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://ninja:allah@ds245238.mlab.com:45238/ninja').then(function () {
    console.log('connected!')
}).catch(function (error) {
    console.log(error.message);
});


var Ninja = mongoose.model('Ninja', {
    name: String,
    age: Number,
    email: String,
    number: Number,
    pro: String,
    code: Number,

});
/* GET home page. */
router.get('/ninjas', function (req, res, next) {

    res.render('index');
});
router.get('/', function (req, res, next) {

    res.render('home');
});
router.get('/api/ninjas', function (req, res) {
    Ninja.find(function (error, ninjas) {
        res.json(ninjas)
    })
});
router.post('/api/ninjas', function (req, res) {
    var newNinja = new Ninja(req.param('ninja'));
    newNinja.save().then(function () {
        res.json({
            isSuc: true,
            message: 'ninja saved!'

        });

    }).catch(function (error) {
        res.json({
            isSuc: false,
            message: error.message

        });
    })
});
router.delete('/api/ninjas', function (req, res) {
    Ninja.findByIdAndRemove(req.param('id')).then(function () {
        res.json({
            isSuc: true,
            message: 'ninja deleted!'

        });

    }).catch(function (error) {
        res.json({
            isSuc: false,
            message: error.message

        });
    })
});
router.put('/api/ninjas', function (req, res) {

    var editing = req.param('ninja');
    Ninja.findByIdAndUpdate(editing._id, editing).then(function () {
        res.json({
            isSuc: true,
            message: 'ninja Updated!'

        });

    }).catch(function (error) {
        res.json({
            isSuc: false,
            message: error.message

        });
    })
});


module.exports = router;

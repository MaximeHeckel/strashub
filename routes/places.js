var express = require('express');
var mongoose = require('mongoose');
var Tourism = require('../models/tourism.js');
var Places = require('../models/places.js');
var Velhop = require('../models/velhop.js');
var router = express.Router();

/* GET places listing. */
router.get('/tourism', function(req, res) {
 Tourism.find({}, function(err,data){
   if(err) res.send(err)
   res.send(data)
 })
});

router.get('/food', function(req,res){
  Places.find({}, function(err,data){
    if(err) res.send(err)
    res.send(data)
  })
});


/*router.get('/stopslist', function(req,res){
  cusHandler.strasTramStops(function(err, result){
    if(err) console.log(err);
    result = JSON.parse(result);
    res.send(result)
  })
});*/

router.get('/velhop', function(req,res){
  Velhop.find({}, function(err, data){
    if(err) res.send(err)
    res.send(data)
  })
});

module.exports = router;

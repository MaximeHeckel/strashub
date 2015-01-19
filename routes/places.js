var express = require('express');
var mongoose = require('mongoose');
//Loading local models files
var Tourism = require('../models/tourism.js');
var Places = require('../models/places.js');
var Velhop = require('../models/velhop.js');
var router = express.Router();

/* GET sightseeing places listing. */
router.get('/tourism', function(req, res) {
  res.set({
    // nice to have, but Chrome dont seem to mind either way
    'Access-Control-Allow-Origin': '*',
    // right content type prevent warnings and errors
    'Content-Type': 'text/javascript; charset=UTF-8',
    // optional, this is in seconds, equivalent to 8h
    'Cache-Control': 'public, max-age=28800'
  });
 Tourism.find({}, function(err,data){
   if(err) res.send(err)
   res.json(JSON.stringify(data));
 })
});

/* GET restaurants and bars listing. */
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

/* GET velhop places and availability listing. */
router.get('/velhop', function(req,res){
  Velhop.find({}, function(err, data){
    if(err) res.send(err)
    res.send(data)
  })
});

//Exporting the router variable to the global scope
module.exports = router;

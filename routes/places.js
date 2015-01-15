var express = require('express');
var fsquareHandler = require('../libs/fsquare_handler.js');
var yelpHandler = require('../libs/yelp_handler.js');
var router = express.Router();

/* GET places listing. */
router.get('/tourism', function(req, res) {
 fsquareHandler.strasRequest(function(err,result){
   if(err) console.log(err);
   result = JSON.parse(result)
   res.send(result)
 })
});

router.get('/restaurants', function(req,res){
  yelpHandler.strasYelpRequestRestaurants(function(err, result){
    if(err) console.log(err);
    result = JSON.parse(result)
    res.send(result)
  })
});

router.get('/bars', function(req,res){
  yelpHandler.strasYelpRequestBars(function(err, result){
    if(err) console.log(err);
    result = JSON.parse(result)
    res.send(result)
  })
});

module.exports = router;

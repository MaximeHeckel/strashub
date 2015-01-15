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
  res.send('yelp stuff goes here');
});

module.exports = router;

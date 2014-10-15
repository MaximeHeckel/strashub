var express = require('express');
var fsquareHandler = require('../libs/fsquare_handler.js')
var prettyjson = require('prettyjson')
var router = express.Router();

/* GET places listing. */
router.get('/', function(req, res) {
 fsquareHandler.strasRequest(function(err,result){
   if(err) console.log(err);
   result = JSON.parse(result)
   res.send(result)
 })
});

module.exports = router;

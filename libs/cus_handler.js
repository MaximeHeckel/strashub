var fs = require('fs'),
    mongoose = require('mongoose'),
    //Loading local Velhop model file
    Velhop = require('../models/velhop.js'),
    request = require('request');

//This function is still in development
exports.strasTramStops = function(callback){
  request.get('http://cts.api.strasbourg-data.fr/stops', function(error, response, body){
    if(!error && response.statusCode == 200){
      callback(null,body)
    } else {
      callback(error);
    }
  })
}

//This function calls strasbourg-data.fr api for Velhops location and availability
exports.strasVelhop = function(callback){
  request.get('http://velhop.api.strasbourg-data.fr/stations', function(error, response,body){
    //If request pass
    if(!error && response.statusCode == 200){
      body = JSON.parse(body);
      Velhop.count(function(err,count){
        //If the DB is empty then fill it
        if(count == 0){
          for(var i = 0; i<body.length; i++){
            //Filling the mongoose model
            Velhop.create({
              address: body[i].na,
              id: body[i].id,
              la: body[i].la,
              lg: body[i].lg,
              available: body[i].av
            }, function(err, Velhop){
              if(err) console.log(err)
              });
            }
            //If the DB is not empty then update it
          } else {
            for(var i = 0; i<body.length; i++){
              //Updating the mongoose model
              Velhop.update({
                address: body[i].na,
                id: body[i].id,
                la: body[i].la,
                lg: body[i].lg,
                available: body[i].av
              }, function(err, Velhop){
                if(err) console.log(err)
                });
              }
            }
          })
          callback(null,body)
    } else {
      callback(error);
    }
  })
}

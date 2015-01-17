var fs = require('fs'),
    mongoose = require('mongoose'),
    Velhop = require('../models/velhop.js'),
    request = require('request');

exports.strasTramStops = function(callback){
  request.get('http://cts.api.strasbourg-data.fr/stops', function(error, response, body){
    if(!error && response.statusCode == 200){
      callback(null,body)
    } else {
      callback(error);
    }
  })
}

exports.strasVelhop = function(callback){
  request.get('http://velhop.api.strasbourg-data.fr/stations', function(error, response,body){
    if(!error && response.statusCode == 200){
      body = JSON.parse(body);
      Velhop.count(function(err,count){
        if(count == 0){
          for(var i = 0; i<body.length; i++){
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
          } else {
            for(var i = 0; i<body.length; i++){
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

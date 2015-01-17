var fs = require('fs'),
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
      callback(null,body)
    } else {
      callback(error);
    }
  })
}

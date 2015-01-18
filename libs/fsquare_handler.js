var fs = require('fs'),
mongoose = require('mongoose'),
Tourism = require('../models/tourism.js'),
request = require('request'),
querystring = require('querystring'),
OAuth = require('oauth').OAuth,
OAuth2 = require('oauth').OAuth2;

//FOURSQUARE URL API VARIABLES

//PUT EVERYTHING IN ENV
var fsquareApiUrl = 'https://api.foursquare.com/v2'
var fsquareUrl = 'http://foursquare.com/'
var fsquareSuffix = '/venues/explore'
var fsquareSearchParams = {
  near : "Strasbourg",
  section : "sights",
  intent : "browse",
  radius : "1000",
  v : "20140801" //DON'T CHANGE
}
var fsquareAuth = {
  client_id : process.env.FSQUARECLIENTID ,
  client_secret : process.env.FSQUARECLIENTSECRET
}
var fsquareFinalUrl = fsquareApiUrl + fsquareSuffix +'?' + querystring.stringify(fsquareSearchParams) + '&' + querystring.stringify(fsquareAuth)
var fsquareResponse = "not yet"

strasRequestData = function(ident){
  var Url = fsquareApiUrl + "/venues/" + ident +'?'+querystring.stringify(fsquareAuth) + '&v=20150117';
  request(Url, function(err, res, data){
    if(err){
      console.log(err)
    } else {
      data = JSON.parse(data)
      var fq = data.response.venue;
      var uri = fq.photos.groups[0].items[0];
      Tourism.create({
        id: fq.id,
        name: fq.name,
        la: fq.location.lat,
        lg: fq.location.lng,
        photo: uri.prefix+uri.width+'x'+uri.height+uri.suffix
      })
    }
  })
}

exports.strasRequestPlaces = function(callback){
  request(fsquareFinalUrl, function(err, res, data){
    if(err){
      console.log("Foursquare API error: " + err);
      callback(err)
    } else {
      fsquareResponse = data;
      fsquareResponse = JSON.parse(fsquareResponse);
      Tourism.count(function(err,count){
        if(count == 0){
          var fq = fsquareResponse.response.groups[0];
          for(var i = 0; i<fq.items.length; i++){
            strasRequestData(fq.items[i].venue.id)
          }
        }
        })
        callback(null,fsquareResponse)
      }
    });
  }

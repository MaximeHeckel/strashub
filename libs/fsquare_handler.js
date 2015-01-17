var fs = require('fs'),
    mongoose = require('mongoose'),
    Places = require('../models/places.js'),
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
  section : "outdoors",
  intent : "browse",
  radius : "4000",
  v : "20140801" //DON'T CHANGE
}
var fsquareAuth = {
  client_id : 'LLO0IEM00UATGQ31N1GNZHL5F5EGPVR3WQYCHH2BAMGGIOSN' ,
  client_secret : '0PHQLSSNCTCXLKU2LV0LITR5UG4W5UILT1DBRVXXYPHNGH5X'
}
var fsquareFinalUrl = fsquareApiUrl + fsquareSuffix +'?' + querystring.stringify(fsquareSearchParams) + '&' + querystring.stringify(fsquareAuth)
var fsquareResponse = "not yet"

strasRequestPics = function(id, callback){
  var testUrl = fsquareApiUrl + "/venues/" + id +'?'+querystring.stringify(fsquareAuth) + '&v=20150117';
  request(testUrl, function(err, res, data){
    if(err){
      callback(err)
    } else {
      data = JSON.parse(data);
      callback(null,data);
    }
  })
}

exports.strasRequest = function(callback){
  request(fsquareFinalUrl, function(err, res, data){
    if(err){
      console.log("Foursquare API error: " + err);
      fsquareResponse = err;
      callback(err)
    } else {
      fsquareResponse = data;
      fsquareResponse = JSON.parse(fsquareResponse);
      Places.count(function(err,count){
        if(count == 0){
          var fq = fsquareResponse.response.groups[0];
          for(var i = 0; i<fq.items.length-1; i++){
            Places.create({
              id: fq.items[i].venue.id,
              name: fq.items[i].venue.name,
              la: fq.items[i].venue.location.lat,
              lg: fq.items[i].venue.location.lng,
              rating: fq.items[i].venue.rating
            }, function(err, Places){
                if(err) console.log(err)
                strasRequestPics(fq.items[i].venue.id, function(err,result){
                  var uri = result.response.venue.photos.groups[0].items[0]
                  Places.update({
                    photo: uri.prefix+uri.width+'x'+uri.height+uri.suffix
                  })
              })
            });
          }
        } else {
            var fq = fsquareResponse.response.groups[0];
            for(var i = 0; i<fq.items.length; i++){
              strasRequestPics(fq.items[i].venue.id, function(err,result){
                var uri = result.response.venue.photos.groups[0].items[0]
                Places.update({
                  photo: uri.prefix+uri.width+'x'+uri.height+uri.suffix
                })
              },function(err,Places){
                if(err) console.log(err)
              })
          }
        }
      })
      callback(null,fsquareResponse)
    }
  });
}

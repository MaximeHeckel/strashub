var fs = require('fs'),
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

console.log(fsquareFinalUrl);

exports.strasRequest = function(callback){
  request(fsquareFinalUrl, function(err, res, data){
    if(err){
      console.log("Foursquare API error: " + err);
      fsquareResponse = err;
      callback(err)
    } else {
      console.log("Success !");
      //console.log(data);
      fsquareResponse = data;
      callback(null,fsquareResponse)
    }
  });
}

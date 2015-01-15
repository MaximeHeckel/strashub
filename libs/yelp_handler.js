var fs = require('fs'),
    querystring = require('querystring'),
    OAuth = require('oauth').OAuth,
    OAuth2 = require('oauth').OAuth2;

//YELP URL API VARIABLES

//PUT EVERYTHING IN ENV
var yelpConsumerKey = 'RQwf9tSgqKZd5K4Sg8-Q6w' /*yelpConfig.oauthConsumerKey;*/
var yelpConsumerSecret = '9OW0sUIym3xvjbO6mH042ag2RaM'/*yelpConfig.oauthConsumerSecret*/
var yelpToken = 'ABuk4FPygarvSpWaOs6F_QJ4XdOl0UNJ'/*yelpConfig.oauthToken*/
var yelpTokenSecret = 'MZjfKU_lsbqGtMl3npX8rXKDqhs'/*yelpConfig.oauthTokenSecret*/
var yelpApiUrl = 'http://api.yelp.com';
var yelpSuffix = '/v2/search/';

var yelpSearchParamsRestaurants = {
  term: 'restaurants',
  location: 'Strasbourg'
}

var yelpSearchParamsBars = {
  term: 'bars',
  location: 'Strasbourg'
}

var yelpOauth = new OAuth(yelpApiUrl,yelpApiUrl,yelpConsumerKey,yelpConsumerSecret,'1.0', null, 'HMAC-SHA1');

var yelpFinalUrlRestaurants = yelpApiUrl + yelpSuffix + '?' + querystring.stringify(yelpSearchParamsRestaurants);
var yelpFinalUrlBars = yelpApiUrl + yelpSuffix + '?' + querystring.stringify(yelpSearchParamsBars);
var yelpResponse = "not yet";

exports.strasYelpRequestRestaurants = function(callback){
  yelpOauth.get(yelpFinalUrlRestaurants, yelpToken, yelpTokenSecret,function(err, data, result){
    var apiResponse, yelpResponse;
    if(err || result.statusCode !== 200){
      console.log("Yelp API error: " + err);
      yelpResponse = err;
      callback(err)
    } else {
      console.log("Success !");
      yelpResponse = data;
      callback(null, yelpResponse)
    }
  });
};

exports.strasYelpRequestBars = function(callback){
  yelpOauth.get(yelpFinalUrlBars, yelpToken, yelpTokenSecret,function(err, data, result){
    var apiResponse, yelpResponse;
    if(err || result.statusCode !== 200){
      console.log("Yelp API error: " + err);
      yelpResponse = err;
      callback(err)
    } else {
      console.log("Success !");
      yelpResponse = data;
      console.log(data)
      callback(null, yelpResponse)
    }
  });
};

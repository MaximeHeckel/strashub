var fs = require('fs'),
    querystring = require('querystring'),
    mongoose = require('mongoose'),
    Places = require('../models/places.js'),
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

exports.strasYelpRequest = function(callback){
  Places.count(function(err,count){
    if(count == 0){
      strasYelpRequestBars();
      strasYelpRequestRestaurants();
    } else {
      Places.remove({}, function(err){
        if(err) console.log(err)
        console.log("Model dropped for update")
      })
      strasYelpRequestBars();
      strasYelpRequestRestaurants();
    }
  });
}

strasYelpRequestRestaurants = function(){
  yelpOauth.get(yelpFinalUrlRestaurants, yelpToken, yelpTokenSecret,function(err, data, result){
    if(err || result.statusCode !== 200){
      console.log("Yelp API error: " + err);
    } else {
      data = JSON.parse(data)
      for(var i = 0; i < data.businesses.length; i++){
        var image = data.businesses[i].image_url;
        if(typeof image != "undefined"){
          image = image.slice(0,-6)+'o.jpg'
        }

        Places.create({
          id: data.businesses[i].id,
          name: data.businesses[i].name,
          la: data.businesses[i].location.coordinate.latitude,
          lg: data.businesses[i].location.coordinate.longitude,
          rating: data.businesses[i].rating,
          text: data.businesses[i].url,
          photo: image
        }, function(err,Places){
          if(err) console.log(err)
        })
      }
    }
  });
};

strasYelpRequestBars = function(){
  yelpOauth.get(yelpFinalUrlBars, yelpToken, yelpTokenSecret,function(err, data, result){
    if(err || result.statusCode !== 200){
      console.log("Yelp API error: " + err);
    } else {
      data = JSON.parse(data)
      for(var i = 0; i < data.businesses.length; i++){
        var image = data.businesses[i].image_url;
        if(typeof image != "undefined"){
          image = image.slice(0,-6)+'o.jpg'
        } else {
          image = "";
        }

        Places.create({
          id: data.businesses[i].id,
          name: data.businesses[i].name,
          la: data.businesses[i].location.coordinate.latitude,
          lg: data.businesses[i].location.coordinate.longitude,
          rating: data.businesses[i].rating,
          text: data.businesses[i].url,
          photo: image
        }, function(err,Places){
          if(err) console.log(err)
          })
        }
    }
  });
};

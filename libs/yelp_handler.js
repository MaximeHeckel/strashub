var fs = require('fs'),
    querystring = require('querystring'),
    mongoose = require('mongoose'),
    Places = require('../models/places.js'),
    OAuth = require('oauth').OAuth,
    OAuth2 = require('oauth').OAuth2;

//YELP URL API VARIABLES
//Yelp authentication variables are in ENV
var yelpConsumerKey = process.env.YELPCONSUMERKEY /*yelpConfig.oauthConsumerKey;*/
var yelpConsumerSecret = process.env.YELPCONSUMERSECRET/*yelpConfig.oauthConsumerSecret*/
var yelpToken = process.env.YELPTOKEN/*yelpConfig.oauthToken*/
var yelpTokenSecret = process.env.YELPTOKENSECRET/*yelpConfig.oauthTokenSecret*/
var yelpApiUrl = 'http://api.yelp.com';
var yelpSuffix = '/v2/search/';

//Yelp search parameters for restaurants
var yelpSearchParamsRestaurants = {
  term: 'restaurants',
  location: 'Strasbourg'
}

//Yelp search parameters for bars
var yelpSearchParamsBars = {
  term: 'bars',
  location: 'Strasbourg'
}

//Setting up Oauth authentication method for Yelp API
var yelpOauth = new OAuth(yelpApiUrl,yelpApiUrl,yelpConsumerKey,yelpConsumerSecret,'1.0', null, 'HMAC-SHA1');

//Yelp API urls for restaurants and bars
var yelpFinalUrlRestaurants = yelpApiUrl + yelpSuffix + '?' + querystring.stringify(yelpSearchParamsRestaurants);
var yelpFinalUrlBars = yelpApiUrl + yelpSuffix + '?' + querystring.stringify(yelpSearchParamsBars);

//This function calls both strasRequestBars and strasYelpRequestRestaurants methods.
//If DB is empty, then fill it thanks to both methods.
//If DB is not empty, drop the db and fill it again.
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

//This function calls Yelp API for restaurants and fill the DB with the data
strasYelpRequestRestaurants = function(){
  yelpOauth.get(yelpFinalUrlRestaurants, yelpToken, yelpTokenSecret,function(err, data, result){
    if(err || result.statusCode !== 200){
      console.log("Yelp API error: " + err);
    } else {
      data = JSON.parse(data)
      for(var i = 0; i < data.businesses.length; i++){
        var image = data.businesses[i].image_url;
        //Places without photos made the server crashed
        if(typeof image != "undefined"){
          //Replace the ms.jpg with o.jpg in order to get better quality photos
          image = image.slice(0,-6)+'o.jpg'
        }
        //Filling the mongoose model
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

//This function calls Yelp API for bars and fill the DB with the data
strasYelpRequestBars = function(){
  yelpOauth.get(yelpFinalUrlBars, yelpToken, yelpTokenSecret,function(err, data, result){
    if(err || result.statusCode !== 200){
      console.log("Yelp API error: " + err);
    } else {
      data = JSON.parse(data)
      for(var i = 0; i < data.businesses.length; i++){
        var image = data.businesses[i].image_url;
        //Places without photos made the server crashed
        if(typeof image != "undefined"){
          //Replace the ms.jpg with o.jpg in order to get better quality photos
          image = image.slice(0,-6)+'o.jpg'
        } else {
          image = "";
        }
        //Filling the mongoose model
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

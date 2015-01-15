var fs = require('fs'),
    request = require('request'),
    querystring = require('querystring'),
    OAuth = require('oauth').OAuth,
    OAuth2 = require('oauth').OAuth2;

//YELP URL API VARIABLES

//var yelpConfig = JSON.parse(fs.readFileSync('yelp_api.json','utf8'));
var yelpConsumerKey = 'RQwf9tSgqKZd5K4Sg8-Q6w' /*yelpConfig.oauthConsumerKey;*/
var yelpConsumerSecret = '9OW0sUIym3xvjbO6mH042ag2RaM'/*yelpConfig.oauthConsumerSecret*/
var yelpToken = 'ABuk4FPygarvSpWaOs6F_QJ4XdOl0UNJ'/*yelpConfig.oauthToken*/
var yelpTokenSecret = 'MZjfKU_lsbqGtMl3npX8rXKDqhs'/*yelpConfig.oauthTokenSecret*/
var yelpApiUrl = 'http://api.yelp.com';
var yelpSuffix = '/v2/search/';

var yelpSearchParams = {
  term: 'restaurants',
  location: 'Strasbourg'
}

var yelpOauth = new Oauth(yelpApiUrl,yelpApiUrl,yelpConsumerKey,yelpConsumerSecret,'1.0', null, 'HMAC-SHA1');

var yelpFinalUrl = yelpApiUrl + yelpSuffix + '?' + querystring.stringify(yelpSearchParams)
var yelpResponse = "not yet";

exports.strasYelpRequest = function(callback){
  yelpOauth.get(yelpFinalUrl, yelpToken, yelpTokenSecret,function(err, data, result){
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

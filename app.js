var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var db = require('./config/config.js');
var routes = require('./routes/index');
var places = require('./routes/places');

mongoose.connect(db.url);

var cusHandler = require('./libs/cus_handler.js');
var foursquareHandler = require('./libs/fsquare_handler.js');
var yelpHandler = require('./libs/yelp_handler.js');

cusHandler.strasVelhop(function(err,res){
  if(err) console.log(err);
  //console.log(res)
})

foursquareHandler.strasRequest(function(err,res){
  if(err) console.log(err);
  for(var i =0; i<res.response.groups[0].items.length; i++){
    //if(res.response.groups[0].itmes[i].tips != undefined){
      //console.log(res.response.groups[0].items[4])
      //console.log(res.response.groups[0].items[i].tips);
    //}
  }

})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/places', places);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;

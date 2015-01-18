var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  id: String,
  name: String,
  la: Number,
  lg: Number,
  rating: {type: String, default: "0"},
  photo: {type: String, default: ""}
});

module.exports = mongoose.model('Place', schema);

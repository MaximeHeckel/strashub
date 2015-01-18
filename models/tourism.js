var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  id: String,
  name: String,
  la: Number,
  lg: Number,
  rating: {type: String, default: "0"},
  text: {type: String, default: ""},
  photo: {type: String, default: ""}
});

module.exports = mongoose.model('Tourism', schema);

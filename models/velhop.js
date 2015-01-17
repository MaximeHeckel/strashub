var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  address: {type: String, default: ""},
  id: {type: Number, default: 0},
  la: Number,
  lg: Number,
  available: Number
});

module.exports = mongoose.model('Velhop', schema);

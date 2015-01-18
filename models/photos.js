var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  id: String,
  photo: {type: String, default: ""}
});

module.exports = mongoose.model('Photos', schema);

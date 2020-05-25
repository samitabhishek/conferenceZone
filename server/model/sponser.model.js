var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sponserSchema = new Schema({
  _id : {type: mongoose.Schema.Types.ObjectId, auto : true} ,
  name:  {type: String, required : true},
  description: {type: String, required: true},
  imagePath: {type: String},
  events : [{type: mongoose.Schema.Types.ObjectId,  ref: 'events'}],
  createdDate: { type: Date, default : Date.now },
  }, {
      versionKey : false
  });

  const sponsers = mongoose.model('sponsers', sponserSchema);
  module.exports = sponsers;
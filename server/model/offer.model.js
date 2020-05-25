var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var offerSchema = new Schema({
  _id : {type: mongoose.Schema.Types.ObjectId, auto : true} ,
  name:  {type: String, required : true},
  description: {type: String, required: true},
  amount:  {type: String, required : true},
  events : [{type: mongoose.Schema.Types.ObjectId,  ref: 'events'}],
  createdDate: { type: Date, default : Date.now },
  }, {
      versionKey : false
  });

  const offers = mongoose.model('offers', offerSchema);
  module.exports = offers;
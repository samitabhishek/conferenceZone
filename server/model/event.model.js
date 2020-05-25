var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  _id : {type: mongoose.Schema.Types.ObjectId, auto : true} ,
  name:  {type: String, required : true},
  date:  {type: String, required : true},
  venue:  {type: String, required : true},
  speakers : [{type: String  }],
  topics : [{type: String  }],
  price : [{type: String  }],
  sponsers : [{type: mongoose.Schema.Types.ObjectId,  ref: 'sponsers'}],
  offers : [{type: mongoose.Schema.Types.ObjectId,  ref: 'offers'}],
  imagePath:{type: String},
  time:{type: String},
  users : [{type: mongoose.Schema.Types.ObjectId,  ref: 'users'}],
  createdDate: { type: Date, default : Date.now }
  }, {
      versionKey : false
  });

  const event = mongoose.model('events', eventSchema);
  module.exports = event;
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var ObjectId = mongoose.Schema.Types.ObjectId;
  
  var userSchema = new Schema({
    _id : {type: mongoose.Schema.Types.ObjectId, auto : true} ,
    name:  {type: String, required : true},
    email: {type: String, required: true},
    gender:  {type: String, required : true},
    contact:  {type: String, required : true},
    age:  {type: String, required : true},
    amountpaid:  {type: String},
    occupation:  {type: String, required : true},
    createdDate: { type: Date, default : Date.now },
    event:  {type: String, ref:'event'},
    }, {
        versionKey : false
    });

    const user = mongoose.model('users', userSchema);
    module.exports = user;
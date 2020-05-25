  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var ObjectId = mongoose.Schema.Types.ObjectId;
  
  var adminSchema = new Schema({
    _id : {type: mongoose.Schema.Types.ObjectId, auto : true} ,
    name:  {type: String, required : true},
    email: {type: String, required: true},
    password:  {type: String, required : true},
    
   
    createdDate: { type: Date, default : Date.now },
   
    }, {
        versionKey : false
    });

    const admin = mongoose.model('admin', adminSchema);
    module.exports = admin;
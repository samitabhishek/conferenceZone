var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var jwt = require('jsonwebtoken');
var httpStatus = require('http-status-codes')
const user = require('../model/user.model');
var event = require('../model/event.model');

router.route('/').get((req,res) => {

    user.find({}).then(docs => {
        res.send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});

router.route('/:id').get((req,res) => {
    let id = req.params.id;
    user.findById(id).then(docs => {
        res.status(httpStatus.OK).send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});


// router.post('/', function (req, res) {
//     var body = req.body;
//     var obj = new user(body);
//     //role.findOne({ name: 'Admin' }, function(err, res_role) {
//     role.findOne({ name: 'User' }, function (err, res_role) {
//         if (err) return res.send(err);

//         obj.roles = [];
//         var id = mongoose.Types.ObjectId(res_role._id);
//         obj.roles.push(id);
//         obj.save(function (err) {
//             if (err) {
//                 // duplicate entry
//                 if (err.code === 11000)
//                     return res.json({
//                         success: false,
//                         message: 'This username is already exists.'
//                     });
//                 return res.send(err);
//             }
//             res.status(201).send();
//         });
//     });

// });

router.route('/').post((req,res) => {
    const obj = req.body;
    user.create(obj).then(doc => {
        console.log("doc.id"+doc._id)
        
        event.findById(doc.event).then(doc2 => {
            let userList = [];
            console.log("ID found")
            console.log("doc.users "+doc2.users);
           
            userList=[...doc2.users,doc._id];
            console.log("userList after spread"+userList);
        
    event.findByIdAndUpdate(doc2.id,{users: userList},
        (err, doc) => {
            if(err){
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
            }
            else{
                // res.status(httpStatus.OK).send(doc);
            }
        });
            
        }).catch(err => {
            // res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
            console.log("ID did not found")
        });
        res.status(httpStatus.CREATED).send(doc);

    }).catch(err => {
        
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});

router.route('/:id').delete((req,res) => {
    let id = req.params.id;
    user.findByIdAndDelete(id).then(docs => {
        res.status(httpStatus.OK).send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});

router.route('/:id').put((req,res) => {
    let id = req.params.id;
    const obj = req.body;
    user.findByIdAndUpdate(id,{name: obj.name, email: obj.email, contact: obj.contact},
        (err, doc) => {
            if(err){
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
            }
            else{
                res.status(httpStatus.OK).send(doc);
            }
        });
});

module.exports = router; 
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var admin = require('../model/admin.model');
var httpStatus = require('http-status-codes');
// var role = require('../model/role.model');

// all routes that end with /users

router.route('/').get((req,res) => {

    admin.find({}).then(docs => {
        res.send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});


// router.route('/login').post((req,res) => {
//     admin.findOne({email:req.body.email,password:req.body.password}).then(docs => {
//         if(docs != null){
//             res.status(httpStatus.OK).send(docs);
//         }
//         else{
//             res.status(httpStatus.INTERNAL_SERVER_ERROR);
//         }
       
//     }).catch(err => {
//         console.log(err);
//         res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
//     });
// });
router.route('/login').post((req,res) => {
    admin.findOne({email:req.body.email,password:req.body.password}).then(docs => {
        res.status(httpStatus.OK).send(docs);
    }).catch(err => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});


       



router.route('/').post((req,res) => {
    const obj = req.body;
    admin.create(obj).then(docs => {
        res.status(httpStatus.CREATED).send(obj);
    }).catch(err => {
        console.log(err);
        console.log(obj);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});


module.exports = router;
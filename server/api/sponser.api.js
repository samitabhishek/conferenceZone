var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var jwt = require('jsonwebtoken');
var httpStatus = require('http-status-codes')
const sponser = require('../model/sponser.model');
const event = require('../model/event.model');

router.route('/').get((req,res) => {

    sponser.find({}).then(docs => {
        res.send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});


router.route('/').post((req,res) => {
    const obj = req.body;
    sponser.create(obj).then(doc => {
        console.log(doc);
        for(let item of doc.events){
            
            console.log("doc.id"+doc._id)
            console.log("item"+item)
            event.findById(item).then(doc2 => {
                let sponserList = [];
                console.log("ID found")
                console.log("doc.speakers "+doc2.sponsers);
               
                sponserList=[...doc2.sponsers,doc._id];
                console.log("sponserList after spread"+sponserList);
            
        event.findByIdAndUpdate(item,{sponsers: sponserList},
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
            
        }
        res.status(httpStatus.CREATED).send(doc);
    }).catch(err => {
        console.log(err);
        console.log(obj);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});

router.route('/:id').get((req,res) => {
    let id = req.params.id;
    sponser.findById(id).then(docs => {
        res.status(httpStatus.OK).send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});


router.route('/:id').delete((req,res) => {
    let id = req.params.id;
    sponser.findByIdAndDelete(id).then(docs => {
        res.status(httpStatus.OK).send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});

router.route('/:id').put((req,res) => {
    let id = req.params.id;
    const obj = req.body;
    sponser.findByIdAndUpdate(id,{name: obj.name, email: obj.email, contact: obj.contact},
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
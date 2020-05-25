var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var jwt = require('jsonwebtoken');
var httpStatus = require('http-status-codes')
const offer = require('../model/offer.model');
const event = require('../model/event.model');

router.route('/').get((req,res) => {

    offer.find({}).then(docs => {
        res.send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});


router.route('/').post((req,res) => {
    const obj = req.body;
    offer.create(obj).then(doc => {
        console.log(doc);
        for(let item of doc.events){
            
            console.log("offer id"+doc._id)
            console.log("event id"+item)
            event.findById(item).then(doc2 => {
                let offerList = [];
                console.log("ID found")
                console.log("doc.offers "+doc2.offers);
               
                offerList=[...doc2.offers,doc._id];
                console.log("OfferList after spread"+offerList);
            
        event.findByIdAndUpdate(item,{offers: offerList},
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

        // res.status(httpStatus.CREATED).send(obj);
    }).catch(err => {
       
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});


router.route('/:id').get((req,res) => {
    let id = req.params.id;
    offer.findById(id).then(docs => {
        res.status(httpStatus.OK).send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});


router.route('/:id').delete((req,res) => {
    let id = req.params.id;
    offer.findByIdAndDelete(id).then(docs => {
        res.status(httpStatus.OK).send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});

router.route('/:id').put((req,res) => {
    let id = req.params.id;
    const obj = req.body;
    offer.findByIdAndUpdate(id,{name: obj.name, email: obj.email, contact: obj.contact},
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
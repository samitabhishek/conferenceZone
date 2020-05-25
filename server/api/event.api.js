var express = require('express');
var router = express.Router();
var httpStatus = require('http-status-codes')
const event = require('../model/event.model');
const sponser = require('../model/sponser.model');
const offer = require('../model/offer.model');
const mongoose = require('mongoose');

router.route('/').get((req, res) => {
    event.find({}).then(docs => {
        res.send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});


router.route('/').post((req, res) => {
    const body = req.body;

    console.log(body.offers, body.sponsers);

    body.offers = body.offers.map((id) => {
        return mongoose.Types.ObjectId(id);
    });
    body.sponsers = body.sponsers.map((id) => {
        return mongoose.Types.ObjectId(id);
    });

    // const obj = new event(body);

    event.create(body).then(doc => {
        console.log(doc);

        for (let item of doc.sponsers) {

            console.log("event id" + doc._id)
            console.log("sponser id" + item)
            sponser.findById(item).then(doc_sponser => {
                
                // console.log("ID found");
                // console.log("doc_sponser.events " + doc_sponser.events);

                // doc_sponser.events.push(mongoose.Types.ObjectId(doc._id));
                
                // doc_sponser.save().then(doc_sponser_new => {
                //     console.log(doc_sponser_new.name, doc_sponser_new.events);
                // }).catch(err => {
                //     console.log("sponsor update error");
                //     res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
                // })
                let eventList=[];
                eventList = [...doc_sponser.events, doc._id];
                console.log("eventList after spread" + eventList);

                sponser.findByIdAndUpdate(item, { events: eventList },
                    (err, doc) => {
                        if (err) {
                            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
                        }
                        else {
                            // res.status(httpStatus.OK).send(doc);
                        }
                    });

            }).catch(err => {
                // res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
                console.log("ID did not found")
            });

        }
        console.log("doc offer"+doc.offers)
        for (let item2 of doc.offers) {

            console.log("event id" + doc._id)
            console.log("offer id" + item2)
            offer.findById(item2).then(doc_offer => {
                
                // console.log("ID found");
                // console.log("doc_sponser.events " + doc_sponser.events);

                // doc_sponser.events.push(mongoose.Types.ObjectId(doc._id));
                
                // doc_sponser.save().then(doc_sponser_new => {
                //     console.log(doc_sponser_new.name, doc_sponser_new.events);
                // }).catch(err => {
                //     console.log("sponsor update error");
                //     res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
                // })
                let eventList=[];
                eventList = [...doc_offer.events, doc._id];
                console.log("eventList after spread" + eventList);

                offer.findByIdAndUpdate(item2, { events: eventList },
                    (err, doc) => {
                        if (err) {
                            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
                        }
                        else {
                            // res.status(httpStatus.OK).send(doc);
                        }
                    });

            }).catch(err => {
                // res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
                console.log("ID did not found")
            });

        }

        console.log("created")
        res.status(httpStatus.CREATED).send(doc);

        // res.status(httpStatus.CREATED).send(obj);
    }).catch(err => {

        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});



router.route('/:id').get((req, res) => {
    let id = req.params.id;
    event.findById(id).then(docs => {
        res.status(httpStatus.OK).send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});


router.route('/:id').delete((req, res) => {
    let id = req.params.id;
    event.findByIdAndDelete(id).then(docs => {
        res.status(httpStatus.OK).send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});

router.route('/:id').put((req, res) => {
    let id = req.params.id;
    const obj = req.body;
    event.findByIdAndUpdate(id, { name: obj.name, date: obj.date, venue: obj.venue, speakers: obj.speakers, price: obj.price, sponsers: obj.sponsers, offers: obj.offers, users: obj.users },
        (err, doc) => {
            if (err) {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
            }
            else {
                res.status(httpStatus.OK).send(doc);
            }
        });
});

router.route('/changeSponser/:id').put((req, res) => {
    let id = req.params.id;
    const obj = req.body;
    console.log("reached")
    event.findByIdAndUpdate(id, { sponsers: obj.sponsers },
        (err, doc) => {
            if (err) {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
            }
            else {
                res.status(httpStatus.OK).send(doc);

            }
        });
});


module.exports = router; 
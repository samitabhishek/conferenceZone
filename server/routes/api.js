var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });



router.use('/user', require('../api/user.api'));
router.use('/event', require('../api/event.api'));
router.use('/admin', require('../api/admin.api'));
router.use('/offer', require('../api/offer.api'));
router.use('/file', require('../api/file.api'));
router.use('/sponser', require('../api/sponser.api'));

module.exports = router;

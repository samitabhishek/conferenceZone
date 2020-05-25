var express = require('express');
var router = express.Router();
var path = require("path");
var multer = require('multer');

var filePath = path.join(__dirname, '../public/images');
var absPath = "";
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, filePath);
    },
    filename: function(req, file, callback) {
        var arr = file.originalname.split('.');
        var fileExt = arr[arr.length - 1];
        var filename = file.fieldname + '-' + Date.now() + '.' + fileExt;
        absPath = 'images' + "/" + filename;
        callback(null, filename);
    }
});

//'file' is the name of passing parameters
var upload = multer({
    storage: storage
}).single('file');

router.post('/', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            res.json("error");
            return;
        }
        res.json({
            filePath: absPath
        });
    });
});
module.exports = router;
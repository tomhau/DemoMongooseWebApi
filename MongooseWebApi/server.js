
// BASE FOR THE SERVER 
var express = require('express');

var app = express();

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var urlencode = bodyParser.urlencoded({ extended: true });
app.use(express.static('public'));

app.use(bodyParser.json());


// MAKE DB CONNECTION

mongoose.connect('mongodb://localhost:27017/OtherDB');

// MODELS (NOTICE THIS IS IN ANOTHER FOLDER)

var Rabbit = require('./models/rabbit');

// ROUTING

var router = express.Router();

// TO PROCESS THE NEXT REQUEST !!

router.use(function (req, res, next) {
    console.log("some action happening");
    next();
});

app.use('/', router); // could put in a prefix !!


router.route('/rabbits')
    .get(function (req, res) {
        Rabbit.find(function (err, rabbits) {
            if (err)
                res.send(err);
            res.status(200).json(rabbits);
        });
    })
    
    .post(function (req, res) {
        var rabbit = new Rabbit(req.body);
        console.log('the object : ' + JSON.stringify(rabbit));
        rabbit.save(function (err) {
            if (err)
                res.send(err);
            res.status(201).json(rabbit);
        });
    });
    /*
    Rabbit.findById(req.params.rabbit_id, function (err, rabbit) {
        if (err)
            res.send(err);
        res.status(200).json({ rabbit });
    */
  

// SERVER START

app.listen(3000, () => {
    console.log('We are now listening on port 3000 (serverside)');
});



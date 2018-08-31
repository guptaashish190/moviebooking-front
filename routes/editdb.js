const router = require('express').Router();
const Theatre = require('../models/theatre');
const Language = require('../models/language');
const Movie = require('../models/movies');

router.post('/theatres/add', (req, res) => {
    new Theatre(req.body.theatre).save().then((th) => {
        res.json({
            status: 'ok',
            error: null,
        });
    });    
});
router.post('/theatres/removebyid', (req, res) => {
    Theatre.findOneAndRemove({ID: req.body.ID}).then(() => {
        res.json({
            status: 'ok',
            error: null,
        });
    });    
});

router.post('/theatres/edit', (req, res) => {
    Theatre.findOneAndUpdate({ID: req.body.theatre.ID}, req.body.theatre, (theatre) => {
        res.json({
            status: 'ok',
            error: null,
        });
    });    
});

router.post('/movies/add', (req, res) => {
    console.log(req.body.movie);
    new Movie(req.body.movie).save().then((mov) => {
        res.json({
            status: 'ok',
            error: null,
        });
    });    
});

router.post('/movies/removebyid', (req, res) => {
    Movie.findOneAndRemove({ID: req.body.ID}).then(() => {
        res.json({
            status: 'ok',
            error: null,
        });
    });    
});

router.post('/movies/edit', (req, res) => {
    Movie.findOneAndUpdate({ID: req.body.movie.ID}, req.body.movie, (mov) => {
        res.json({
            status: 'ok',
            error: null,
        });
    });    
});


router.get('/getTheatres', (req, res) => {
    Theatre.find({}).then(data => {
        res.send(data);
    });
});

router.get('/getTheatrefromID', (req, res) => {
    const id = req.query.ID;
    Theatre.findOne({ID: id}).then(data => {
        res.send(data);
    });
});

router.get('/getMovies', (req, res) => {
    Movie.find().then(data => {
        res.send(data);
    });
});


router.get('/getMoviefromID', (req, res) => {
    const id = req.query.ID;
    Movie.findOne({ID: id}).then(data => {
        res.send(data);
    });
});

router.get('/getLanguages', (req, res) => {
    Language.find({}).then(data => {
        res.send(data);
    });
});

module.exports = router;
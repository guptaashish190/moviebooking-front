const router = require('express').Router();
const Theatre = require('../models/theatre');
const Language = require('../models/language');
const Movie = require('../models/movies');
const Ticket = require('../models/ticket');

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
        console.log(data);

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

router.get('/getTicketByID', (req, res) => {
    const { ticketid } = req.query;
    Ticket.findById(ticketid).then(ticket => {
        console.log(ticket);
        res.send(ticket);
    });
});

router.get('/getUserTickets', (req, res) => {
    const { GOOGLEID } = req.query;
    console.log(GOOGLEID);
    Ticket.find({GOOGLEID}).then(tickets => {
        console.log(tickets);
        res.send(tickets);
    });
});

router.get('/getAllTickets', (req, res) => {
    Ticket.find({}).then(tickets => {
        res.send(tickets);
    });
});

router.post('/booktickets', (req, res) => {
    const { TICKETINFO } = req.body;
    new Ticket(TICKETINFO).save().then( ticket => {
        res.send(ticket);
    });

    Theatre.findOne({ID: TICKETINFO.THEATREID}, (err, restheatre) => {
        const theatre = restheatre;
        let timeString = '';
        if(TICKETINFO.TIME === 5){
            timeString = '5:00PM';
        }else if(TICKETINFO.TIME === 10){
            timeString = '10:00AM';
        }else if(TICKETINFO.TIME === 9){
            timeString = '9:00PM';
        }

        const seatsselected = TICKETINFO.SEATS.split(',');

        const movieindex = theatre.MOVIES.findIndex(movie => movie.ID === TICKETINFO.MOVIEID);
        
        console.log(timeString,movieindex);
        const timeIndex = theatre.MOVIES[movieindex].TIMES.findIndex(time => time.TIME === timeString);
        
        console.log(timeIndex);
        theatre.MOVIES[movieindex].TIMES[timeIndex].SEATSBOOKED.push(...seatsselected);

        Theatre.findOneAndUpdate({ID: TICKETINFO.THEATREID}, theatre, (resdata) => {
        });
    });

});


module.exports = router;
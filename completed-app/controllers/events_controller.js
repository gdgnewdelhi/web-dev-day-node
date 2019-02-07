// [READ] this is a controller, each function (exported from here) is called an action
// [TODO 2] import the model Event from models/event
const Event = require('../models/event');

// [TODO 1] change this action to include the list of events too
module.exports.home = function(req, res){
    Event.find({}, function(err, events){
        if (err){
            console.log('error in finding events');
        }
        return res.render('home', {
            title: "GDG Events Home",
            events: events
        })
    });
} 



// [TODO 3] create action to create an event from the submitted data
module.exports.createEvent = function(req, res){
    console.log(req.body);
    Event.create({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    }, function(err, event){
        console.log('Event created', event);
        return res.redirect('/');
    });




}



// [TODO 4] create an api for list of events
module.exports.eventsList = function(req, res){
    Event.find({}, function(err, events){
        if (err){
            console.log('error in finding events');
        }
        return res.json(events);
    });
} 




// [ASSIGNMENT] method to delete an event via admin dashboard


// [ASSIGNMENT] method to edit/update an event via admin dashboard




// [READ] actions to display the details of an event with registrations inside it
module.exports.eventDetailsApi = function(req, res){
    Event.findById(req.params.id).populate('registrations').exec(function(err, event){
        return res.json(event);
    });
}


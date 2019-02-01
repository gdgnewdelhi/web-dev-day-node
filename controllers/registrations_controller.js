// [READ] this is also a controller
const Event = require('../models/event');
const Registration = require('../models/registration');

module.exports.createRegistrationApi = function(req, res){
    Event.findById(req.params.event_id, function(err, event){
        Registration.create({
            name: req.body.name,
            email: req.body.email,
            event: event.id
        }, function(err, registration){
            event.registrations.push(registration);
            event.save()
            return res.json(registration);
        });

    });
}

// [ASSIGNMENT] Delete a registration from an event

// [READ] Again requiring package 'express' to use the module called Router, this is like the url paths examples ['/profile', '/contact-us', '/about-us'] are the different pages
const express = require('express');
const router = express.Router();

// [READ] Here, a mapping is created for which url will call which function from which file in controllers folder (these functions are called actions)

// [READ] We've imported the controllers here (take note of the naming convention!)
const eventsController = require('../controllers/events_controller');

const registrationsController = require('../controllers/registrations_controller');



// [TODO 1] create a route for displaying the home page of events (it'll contain the form to create an event and list of events)
router.get('/',eventsController.home );



// [TODO 2] create a route for receiving the data from new event form and send it to an action in the eventsController
router.post('/events/create', eventsController.createEvent);

// [TODO 3] create a route for api of events list and map it to corresponding action from eventsController
router.get('/api/events/', eventsController.eventsList);


// [READ] route to show the details of an event, it has a variable part
router.get('/api/events/:id', eventsController.eventDetailsApi);

// [READ] route to create a registration for an event
router.post('/api/registrations/create/:event_id', registrationsController.createRegistrationApi);


module.exports = router;
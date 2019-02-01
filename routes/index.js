// [READ] Again requiring package 'express' to use the module called Router, this is like the url paths examples ['/profile', '/contact-us', '/about-us'] are the different pages
const express = require('express');
const router = express.Router();

// [READ] Here, a mapping is created for which url will call which function from which file in controllers folder (these functions are called actions)

// [READ] We've imported the controllers here (take note of the naming convention!)
const eventsController = require('../controllers/events_controller');
const registrationsController = require('../controllers/registrations_controller');



// [TODO 1] create a route for displaying the home page of events (it'll contain the form to create an event and list of events)







module.exports = router;
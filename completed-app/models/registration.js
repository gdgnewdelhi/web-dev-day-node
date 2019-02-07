const mongoose = require('mongoose');


const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    // [READ] this is the reverse access for relation between event and registrations
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }
});


const Registration = mongoose.model('Registration', registrationSchema); 

module.exports = Registration;
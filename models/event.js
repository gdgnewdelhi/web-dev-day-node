const mongoose = require('mongoose');

// [READ] this is a schema, it defines the format in which data is stored in the database (this is the format of a collection)
const eventSchema = mongoose.Schema({
    // [READ] fieldname: valueType
    title: String,
    description: String,
    date: Date,
    // [READ] this creates a relationship between one event and many registrations
    registrations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Registration'
        }
    ]
},{
    timestamps: true
});


// [READ] giving the name to the collection of events as 'Event', here called as a model in Mongoose's terms
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
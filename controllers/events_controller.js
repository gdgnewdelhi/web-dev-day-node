// [READ] this is a controller, each function (exported from here) is called an action
// [TODO 2] import the model Event from models/event


// [TODO 1] change this action to include the list of events too
module.exports.home = function(req, res){
    return res.render('home', {
        title: "GDG Events Home"
    });
} 



// [TODO 3] create action to create an event from the submitted data



// [TODO 4] create an api for list of events





// [ASSIGNMENT] method to delete an event via admin dashboard


// [ASSIGNMENT] method to edit/update an event via admin dashboard




// [READ] actions to display the details of an event with registrations inside it
module.exports.eventDetailsApi = function(req, res){
    Event.findById(req.params.id).populate('registrations').exec(function(err, event){
        return res.json(event);
    });
}


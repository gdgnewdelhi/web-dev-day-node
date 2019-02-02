// [READ] These three lines are used to import the package 'express', create an app using it and also defining a port on which the server will run
const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

app.use(cors());

// [TODO 4] setup the connection with db by requiring it from config/mongoose.js



// [TODO 2] install ejs and set the template engine


// [READ] This helps in parsing data which is submitted from a form in html
app.use(express.urlencoded({ extended: false}));


// [ASSIGNMENT] add middleware to use static files



// [TODO 1] add middleware to use the router by requiring it from routes/index.js



// [READ] Here we are asking our app to listen on the port defined at the top, this will run the express server which will communicate via port defined as above (initially 8000)
app.listen(port, function(err){
    if (err){
        console.log('Error in running server');
        return;
    }

    console.log('Server is up and running on http://localhost:' + port);
});



### Link For Discussion/Doubts: <Coming Soon! Just after the event>

## Steps for this CodeLab

### Pre-requisites
- HTML
- CSS
- JavaScript
- A little familiarity with the Terminal/Powershell/Command Prompt

### Install the following (use google!)
- Node.js (version > 10)
- DB
  - Create an account with mLab (https://mlab.com)
    - Verify your email
    - On the dashboard, click on Create New
    - Create a SANDBOX [Free] version DB, it's awesomely free!
    - Choose any region
    - Enter a name
    - Complete the order
    - Click on the db name to get the URI
    - Also, add a user by clicking on the user tab on the same page, this user will be used to access the db
  - OR Install MongoDB CE
- VS Code (this will be our editor environment (IDE))

### Setup the project
1. Download the folder/repository (or clone it if you know git)
2. Open the folder in VS Code using 'Open Folder' from File in the top main menu
3. Start Terminal from Terminal > New Terminal (in main menu)
4. In the Terminal, run `npm install` Now you have almost your libraries setup and the project is ready to be run
5. You can check the list of libraries which have been installed in the file ==package.json==
6. GOTO ==config/mongoose.js== and add your mLab db uri near [TODO 1], replacing <dbuser> and <dbpassword appropriately>


### Running our Express.js server!
1. GOTO ==index.js==, Study the comments starting with [READ]
2. In the Terminal, run `node index.js`
3. You can kill the server with **ctrl + c**
4. In the Terminal, run `npm install nodemon`
5. Now you can run the server with `nodemon index.js`, this will restart the server everytime the code changes in js files


### Rendering our first page
1. In the terminal, run `npm install ejs` to install our template engine (we'll come to what that is soon!)
2. GOTO ==index.js==
3. Replace [TODO 1] with

    ```
    app.use('/', require('./routes/index'));
    ```

4. GOTO ==routes/index.js== and replace [TODO 1] with
    ```
    router.get('/', function(req, res){
        res.end('I Am Iron Man');
    });
    ```

5. GOTO ==index.js== and replace [TODO 2] with
   ```
    app.set('view engine', 'ejs');
   ```
   This tells our express app to use the 'ejs' library as our template or view engine


6. GOTO ==routes/index.js== and modify the code in the step 4. to look like:
    ```
    router.get('/', function(req, res){
        res.render('home');
    });
    ```
    This basically finds the file ==home.ejs== in folder ==views== and converts it to html and sends it back to the browser


###  Using the controllers
1. Since we've already created 2 controller files viz. ==controllers/events_controller.js== and ==controllers/registrations_controller.js==, we export some methods from them and use them in routes

2. In the last coding step (previous section) in ==routes/index.js==, replace this part

    ```
    router.get('/', function(req, res){
        res.render('home');
    });
    ```

    with this

    ```
    router.get('/', eventsController.home);
    ```
    It does the same thing, it's just that our code is a little more distributed right now + notice the **title: "GDG Events Home"** part! It is called context

3. GOTO ==views/home.ejs== and replace [TODO 1] with
    ``` <%= title %> ```



### Understanding mongoose connections and schema
1. GOTO and explore ==config/mongoose.js==. It has used mongoose package to connect to MongoDB
2. GOTO ==index.js== and replace [TODO 4] with
    ```
    const db = require('./config/mongoose');
    ```
3. MongoDB requires the data to be stored in JSON format (it's like a hash/dictionary in programming terms). We need to create schema (predefined formats) to specify what fields do we want to store for each entity (called collections). Here we have 2 entities
   1. Event
   2. Registration

4. **One Event** can have **Many Registrations** OR we can say, **Many Registrations** can belong to **One Event**
5. GOTO & explore ==models/event.js== and ==models/registration.js==
6. Advantage of mongoose.js is that it is an ORM (a layer between express server and MongoDB) and makes our interaction with MongoDB (reading, writing, updating, deleting) quite easy without having to get into the details of learning the syntax for MongoDB.


### Creating an event from the form
1. GOTO and explore the different HTML elements in ==views/home.ejs==
    The form has inputs and text areas for 3 fields for **title, description and date **

2. GOTO ==views/home.ejs== and near [TODO 2], add the following to the form's **action** attribute
    ```
    /events/create
    ```
    (this will be the route or url to which we will be sending the data from the form)

3. GOTO ==controllers/events_controller==, replace [TODO 2] with
    ```
    const Event = require('../models/event');
    ```
    This will import the schema for Event to be used to create and read events

4. GOTO ==controllers/events_controller== and replace [TODO 3] with the following code, to receive data and create an event
    ```
    module.exports.createEvent = function(req, res){
        console.log(req.body);

        Event.create({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date
        }, function(err, event){
            if (err){
                console.log('Error in creating an event');
            }

            console.log('Event Created : ', event);
            return res.redirect('/');
        });
    }
    ```
    We have created and exported a function which will create an event using **create()** method given by mongoose. It is taking the first argument as the fields of the event and the second argument as the callback function which receives an error (if event could not be created) and the event (if it is created and saved in the db)

5. GOTO ==routes/index.js== and replace [TODO 2] with
    ```
    router.post('/events/create', eventsController.createEvent);
    ```
    Here, '.post' is the HTTP method used to send data to the server when we need to create something/make some changes into the database
6. Run and check if the event is getting created (it should print in the terminal where server is running)


### Using ejs now for listing events
1. GOTO ==controllers/events_controller.js== and replace the code inside action **home** with
    ```
    Event.find({}, function(err, events){
        if (err){
            console.log('error in finding events');
        }
        return res.render('home', {
            title: "GDG Events Home",
            events: events
        })
    });
    ```
    Here we are fetching all the events from the database (again using a function provided by mongoose) and passing them to the context of the views

2. GOTO ==views/home.ejs== and replace [TODO 2] with
    ```
    <div id="events-list-container">
        <ul>
            <% for (event of events){ %>
            
                <li>
                    <div>
                        <h3><%= event.title %></h3>
                        <% if (event.date){ %>
                        <p><%= event.date.toLocaleString() %></p>
                        <%}%>
                        <%= event.registrations.length %> Registrations
                        <p><%= event.description %></p>
                    </div>
                </li>
                
            <% } %>
        </ul>
    </div>
    ```
    Here, as you can see, we are looping around the list of events passed in the context (from the last step) and displaying the details (it looks just like simple JavaScript, we just need to wrap variables accessed by <%= %> whenever a value needs to be printed)




### Creating an API for showing a list of events
1. An API is basically a medium of communication using JSON. When the code is divided into 2 parts, viz. Front End (examples: Android, Angular, iOS) and Back End (examples: Node.js/Python/Ruby server), the communication is done using APIs
2. Front End holds the code for design (how the page looks)
3. Back End holds the logic of sending data according to the user (example Indian users might see different news and USA users would see news relevant to them OR you and your neighbour might look a the same design of Facebook, but would see different feeds and friends list)
4. Let's create an API for sending data about the list of events and their registrations to the Front End
5. GOTO ==controllers/events_controller.js== and replace [TODO 4] with
    ```
       module.exports.eventsList = function(req, res){
            Event.find({}, function(err, events){
                if (err){
                    console.log('error in finding events');
                }
                return res.render('home', {
                    events: events,
                    title: "GDG Events Home"
                })
            });
       }
    ```
6. Finally, create a route for this action above. GOTO ==routes/index.js== and replace [TODO 3] with
    ```
    router.get('/api/events/', eventsController.eventsList);
    ```
7. Run and check if the API works

    
### You can now find [ASSIGNMENT] tags in every file, try them on your own
 - Some links (look out for documentation in each)
    - Mongoose: https://mongoosejs.com/
    - Express.js: https://expressjs.com/
    - Node.js: https://nodejs.org/en/
    - MongoDB: https://www.mongodb.com/

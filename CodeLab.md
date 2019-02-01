### Steps for this CodeLab

## Pre-requisites
- HTML
- CSS
- JavaScript
- A little familiarity with the Terminal/Powershee/Command Prompt

## Install the following (use google!)
- Node.js (version > 10)
- MongoDB
- VS Code (this will be our editor environment (IDE))

## Setup the project
1. Download the folder/repository (or clone it if you know git)
2. Open the folder in VS Code using 'Open Folder' from File in the top main menu
3. Start Terminal from Terminal > New Terminal (in main menu)
4. In the Terminal, run `npm install` Now you have almost your libraries setup and the project is ready to be run
5. You can check the list of libraries which have been installed in the file ==package.json==


## Running our Express.js server!
1. GOTO ==index.js==, Study the comments starting with [READ]
2. In the Terminal, run `node index.js`

## Rendering our first page
1. In the terminal, run `npm install ejs` to install our template engine (we'll come to what that is soon!)
2. GOTO ==index.js==
3. Replace [TODO 1] with

`app.use('/', require('./routes/index'));`

4. GOTO ==routes/index.js== and replace [TODO 1] with
`router.get('/', function(req, res){
    res.end('I Am Iron Man');
});`

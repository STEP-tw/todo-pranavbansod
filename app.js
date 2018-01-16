const WebApp = require('./webapp');
const lib = require('./appLib.js');
const fileServerLib = require('./fileServerLib.js');
let app = WebApp.create();



let toString = (obj)=>JSON.stringify(obj,null,2);

app.addPreProcessor(lib.logRequest);
app.addPreProcessor(lib.loadUser);
app.addPreProcessor(lib.redirectLoggedInUserToHome);
app.addPreProcessor(lib.redirectLoggedOutUserToLogin);


// ======================================================================

app.post('/login.html',lib.postLoginHandler);

app.get('/logout',lib.logoutUser);

app.post('/addToDo',lib.addToDoAndRedirectToHome);

app.post('/deleteToDo',lib.deleteToDo);

app.get('/toDo',lib.getToDoHandler);

app.get('/homePage',lib.getHomePageHandler);

// ======================================================================


app.addPostProcessor(fileServerLib.fileServer);

module.exports = app;

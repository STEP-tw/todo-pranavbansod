const WebApp = require('./webapp');
const lib = require('./appLib.js');
const fileServerLib = require('./fileServerLib.js');
let app = WebApp.create();



app.addPreProcessor(lib.logRequest);
app.addPreProcessor(lib.loadUser);
app.addPreProcessor(lib.redirectLoggedInUserToHome);
app.addPreProcessor(lib.redirectLoggedOutUserToLogin);


// ======================================================================

app.post('/login.html',lib.postLoginHandler);

app.post('/addToDo',lib.addToDoAndRedirectToHome);

// app.post('/deleteToDo',lib.deleteToDo);

app.post('/addItem',lib.addItemAndRedirectToToDo)

app.get('/homePage',lib.getHomePageHandler);

app.get('/deleteToDo',lib.deleteToDoAndRedirectToHome);

app.get('/toDo',lib.getToDoHandler);

app.post('/deleteItem',lib.deleteItemAndGetUpdatedList);

app.get('/logout',lib.logoutUser);


// ======================================================================


app.addPostProcessor(fileServerLib.fileServer);

module.exports = app;

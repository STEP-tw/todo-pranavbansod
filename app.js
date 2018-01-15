const fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const WebApp = require('./webapp');
const registered_users = [{userName:'prateikp'}, {userName:'pranavb'}];
const dataPath = './data/data.json';
const dataToBeSentPath = './public/js/dataToBeSent.js';
let data = {};

let User = require('./lib/user.js');
let pranavb = new User('pranavb');
let pratikp = new User('pratikp');
data['pranavb'] = pranavb;
data['pratikp'] = pratikp;
let app = WebApp.create();
let ToDo = require('./lib/toDo.js');




const getContentType = function(filename) {
  let extension = filename.slice(filename.lastIndexOf('.'));
  let contentType = {
    '.html':'text/html',
    '.jpg':'image/jpg',
    '.css':'text/css',
    '.js':'text/js',
    '.gif':'image/gif',
    '.pdf':'document/pdf',
    '.ico':'image/ico'
  }
  return contentType[extension];
};

let toString = (obj)=>JSON.stringify(obj,null,2);

const logRequest = (req,res)=>{
  let text = ['------------------------------',
  `${timeStamp()}`,
  `${req.method} ${req.url}`,
  `HEADERS=> ${toString(req.headers)}`,
  `COOKIES=> ${toString(req.cookies)}`,
  `BODY=> ${toString(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});
  // console.log(`${req.method} ${req.url}`);
};

let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};

let redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/','/login.html']) && req.user) {
    res.redirect('/homePage.html');
  }
};

let redirectLoggedOutUserToLogin = (req,res)=>{
  let urlAllowedForOnlyLoggedIn = ['/', '/homePage.html', '/logout.html', '/toDo.html', '/item.html']
  if(req.urlIsOneOf(urlAllowedForOnlyLoggedIn) && !req.user) {
    res.redirect('/login.html');
  }
};

app.addPreProcessor(logRequest);
app.addPreProcessor(loadUser);
app.addPreProcessor(redirectLoggedInUserToHome);
app.addPreProcessor(redirectLoggedOutUserToLogin);


// ======================================================================

app.post('/login.html',(req,res)=>{
  let user = registered_users.find(u=>u.userName==req.body.userName);
  res.setHeader('Set-Cookie',`logInFailed=false`);
  if(!user) {
    res.setHeader('Set-Cookie',`logInFailed=true`);
    res.setHeader('location','/login.html');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  redirectToHomePage(req,res);
});

app.get('/logout',(req,res)=>{
  res.setHeader('Set-Cookie',['logInFailed=false',`Expires=${new Date(1).toUTCString()}`,`sessionid=0`]);
  delete req.user.sessionid;
  res.redirect('/login.html');
  res.end()
});

app.post('/homePage.html',(req,res)=>{
  let toDoTitle = req.body['toDoTitle'];
  let description = req.body['description'];
  let userName = req.user.userName;
  let user = data[`${userName}`];
  user.addToDo(toDoTitle,description);
  let dataInString = JSON.stringify(data);
  let dataToBeSent = 'let data = ' + dataInString;
  fs.writeFileSync(dataToBeSentPath,dataToBeSent,'utf8');
  fs.writeFileSync(dataPath,dataInString,'utf8');
  redirectToHomePage(req,res);
});

app.get('/toDo.html',(req,res)=>{
  let toDo = fs.readFileSync('./public/toDo.html','utf-8');
  toDo = toDo.replace('<toDoTitle></toDoTitle>',req.cookies.currentToDo);
  res.write(toDo);
  res.end();
})

app.get('/homePage.html',(req,res)=>{
  let homePage = fs.readFileSync('./public/homePage.html','utf8');
  homePage = homePage.replace('<userName></userName>',req.user.userName);
  res.write(homePage);
  res.end();
});

// ======================================================================

const processForFileFound = function(req,res,filename) {
  let contentType = getContentType(filename);
  res.setHeader('Content-Type',contentType);
  res.statusCode = 200;
  res.write(fs.readFileSync(filename))
};

const processForPageNotFound = function(req,res) {
  res.statusCode = 404;
  res.write("Page Not Found")
};

const redirectToHomePage = function(req,res) {
  res.statusCode = 302;
  res.setHeader('location','/homePage.html');
  res.end()
};

const redirectToToDo = function(req,res) {
  res.statusCode = 302;
  res.setHeader('location','/toDo.html');
  res.end()
};

const fileServer = function(req,res) {
  let filename = "./public" + req.url;
  if(filename=="./public/") {
    redirectToHomePage(req,res);
  }
  if(fs.existsSync(filename)) {
    processForFileFound(req,res,filename);
  } else {
    processForPageNotFound(req,res);
  }
  res.end();
};

app.addPostProcessor(fileServer);

module.exports = app;

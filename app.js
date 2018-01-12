let fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const WebApp = require('./webapp');
let registered_users = [{userName:'prateikp'}, {userName:'pranavb'}];

let app = WebApp.create();

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
    res.statusCode = 302;
    res.setHeader('location','/homePage.html');
    res.end();
  }
};

let redirectLoggedOutUserToLogin = (req,res)=>{
  let urlAllowedForOnlyLoggedInUsers = ['/', '/homePage.html', '/logout', '/toDo.html', '/item.html'];
  if(req.urlIsOneOf(urlAllowedForOnlyLoggedInUsers) && !req.user) {
    res.statusCode = 302;
    res.setHeader('location','/login.html');
    res.end();
  }
};

app.addPreProcessor(redirectLoggedInUserToHome);
app.addPreProcessor(redirectLoggedOutUserToLogin);
app.addPreProcessor(logRequest);
app.addPreProcessor(loadUser);


// ======================================================================

app.post('/login.html',(req,res)=>{
  let user = registered_users.find(u=>u.userName==req.body.userName);
  res.setHeader('Set-Cookie',`logInFailed=false`);
  if(!user) {
    res.setHeader('Set-Cookie',`logInFailed=true`);
    res.redirect('/login.html');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.setHeader('location','/homePage.html');
  res.end()
});


// ======================================================================

const processForFileFound = function(req,res,filename) {
  let contentType = getContentType(filename);
  res.setHeader('Content-Type',contentType);
  res.statusCode = 200;
  res.write(fs.readFileSync(filename))
}

const processForPageNotFound = function(req,res) {
  res.statusCode = 404;
  res.write("Page Not Found")
}

const redirectToHomePage = function(req,res) {
  res.statusCode = 302;
  res.setHeader('location','/homePage.html');
  res.end()
}

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

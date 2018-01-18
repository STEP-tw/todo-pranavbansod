const timeStamp = require('./time.js').timeStamp;
const fs = require('fs');
const registered_users = [{userName:'prateikp'}, {userName:'pranavb'}];
const ToDo = require('./lib/toDo.js');
const User = require('./lib/user.js');
const lib = require('./appLib.js');

let data = {};
let pranavb = new User('pranavb');
data['pranavb'] = pranavb;

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

const loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};

//=============================================================

const redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/','/login.html']) && req.user) {
    res.redirect('/homePage');
  }
};

const redirectLoggedOutUserToLogin = (req,res)=>{
  let urlAllowedForOnlyLoggedIn = ['/', '/homePage', '/logout.html', '/toDo', '/item.html','/deleteToDo'];
  if(req.urlIsOneOf(urlAllowedForOnlyLoggedIn) && !req.user) {
    res.redirect('/login.html');
  }
};

const redirectToHomePage = function(req,res) {
  res.statusCode = 302;
  res.setHeader('location','/homePage');
  res.end()
};

const redirectToToDo = function(req,res) {
  res.statusCode = 302;
  res.setHeader('location','/toDo');
  res.end()
};

const postLoginHandler = (req,res)=>{
  let user = registered_users.find(u=>u.userName==req.body.userName);
  res.setHeader('Set-Cookie',`logInFailed=false`);
  if(!user) {
    res.setHeader('Set-Cookie',`logInFailed=true`);
    res.setHeader('location','/login.html');
    return;
  }
  let sessionid = process.env.sessionid ||new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  redirectToHomePage(req,res);
};

const logoutUser = (req,res)=>{
  res.setHeader('Set-Cookie',['logInFailed=false',`Expires=${new Date(1).toUTCString()}`,`sessionid=0`]);
  delete req.user.sessionid;
  res.redirect('/login.html');
  res.end()
};

const addToDoAndRedirectToHome = (req,res)=>{
  let toDoTitle = req.body['toDoTitle'];
  let description = req.body['description'];
  let userName = req.user.userName;
  let user = data[`${userName}`];
  user.addToDo(toDoTitle,description);
  redirectToHomePage(req,res);
};

const addItemAndRedirectToToDo = (req,res)=>{
  let itemDesc = req.body['newItemDesc'];
  let currTodo = req.cookies.currentToDo;
  let userName = req.user.userName;
  let user = data[`${userName}`];
  user.addItemTo(currTodo,itemDesc);
  redirectToToDo(req,res);
};

const deleteToDo = (req,res)=>{
  let userName = req.user.userName;
  let user = data[`${userName}`];
};

const getToDoHandler = (req,res)=>{
  let toDo = fs.readFileSync('./public/toDo.html','utf8');
  let userName = req.user.userName;
  let currentToDoTitle = req.cookies.currentToDo;
  let userData = data[`${userName}`];
  let currTodo = userData.getToDo(currentToDoTitle);
  toDo = toDo.replace('<userName></userName>',userName);
  toDo = toDo.replace('<toDoTitle></toDoTitle>',currentToDoTitle);
  toDo = toDo.replace('<desc></desc>',currTodo.getDesc());
  toDo = toDo.replace('<allItems></allItems>',currTodo.getAllItemsInHtmlList());
  res.setHeader('Content-Type','text/html');
  res.write(toDo);
  res.end();
};

const getHomePageHandler = (req,res)=>{
  let homePage = fs.readFileSync('./public/homePage.html','utf8');
  let userName = req.user.userName;
  homePage = homePage.replace('<userName></userName>',userName);
  let userData = data[`${userName}`];
  homePage = homePage.replace('<ToDoTitles>',userData.getToDoTitlesInHtmlList('/toDo'));
  res.write(homePage);
  res.end();
}

const deleteToDoAndRedirectToHome = (req,res)=>{
  let userName = req.user.userName;
  let userData = data[`${userName}`];
  userData.deleteToDo(`${req.cookies.currentToDo}`)
  redirectToHomePage(req,res);
}
//=================================================================


module.exports = {
  logRequest,
  postLoginHandler,
  loadUser,
  redirectLoggedInUserToHome,
  redirectLoggedOutUserToLogin,
  logoutUser,
  addToDoAndRedirectToHome,
  deleteToDo,
  getHomePageHandler,
  getToDoHandler,
  deleteToDoAndRedirectToHome,
  addItemAndRedirectToToDo
}

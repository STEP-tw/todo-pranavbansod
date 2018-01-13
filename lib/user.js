const ToDo = require('./toDo.js');

const User = function(name) {
  this.name = name;
  this.allToDo =  {};
}

User.prototype.getName = function() {
  return this.name;
}

User.prototype.getAllToDo = function() {
  return this.allToDo;
}

User.prototype.addToDo = function(title,desc) {
  let currTodo = new ToDo(title,desc);
  let allToDo = this.getAllToDo();
  allToDo[`${title}`] = currTodo;
}

User.prototype.getToDo = function(title) {
  let allToDo = this.getAllToDo();
  return allToDo[`${title}`];
}

User.prototype.deleteToDo = function(title) {
  let allToDo = this.getAllToDo();
  delete allToDo[`${title}`];
}

// User.prototype. = function() {
//
// }
//
// User.prototype. = function() {
//
// }
//
// User.prototype. = function() {
//
// }
//
// User.prototype. = function() {
//
// }
//
// User.prototype. = function() {
//
// }


module.exports = User;

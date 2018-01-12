let ToDoItem = function(desc) {
  this.desc = desc;
  this.checked = false;
};

ToDoItem.prototype.editDesc = function(newDesc) {
  this.desc = newDesc;
}

ToDoItem.prototype.check = function() {
  this.check = true;
}

ToDoItem.prototype.uncheck = function() {
  this.check = false;
}

module.exports = ToDoItem;

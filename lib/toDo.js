let Item = require('./toDoItem.js')
let ToDo =  function(title,desc) {
  this.title = title;
  this.desc = desc || "";
  this.items = {};
};

ToDo.prototype.editTitle = function(newTitle) {
  this.title = newTitle;
};

ToDo.prototype.getTitle = function() {
  return this.title;
};

ToDo.prototype.editDescription = function(newDesc) {
  this.desc = newDesc;
};

ToDo.prototype.getDescription = function() {
  return this.desc;
};

ToDo.prototype.addItem = function(itemDesc) {
  this.items[`${itemDesc}`] = new Item(itemDesc);
};

ToDo.prototype.getItems = function() {
  return this.items;
}

ToDo.prototype.getItemByDesc = function(itemDesc) {
  return this.items[`${itemDesc}`];
};

ToDo.prototype.deleteItem = function(itemDesc) {
  delete this.items[`${itemDesc}`];
};

ToDo.prototype.getItemsDescInList = function() {
  let keys = Object.keys(this.items);
  return keys;
}


module.exports = ToDo;

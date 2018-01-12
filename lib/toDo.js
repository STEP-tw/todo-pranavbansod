let Item = require('./toDoItem.js')
let ToDo =  function(title,desc) {
  this.title = title;
  this.desc = desc || "";
  this.items = {};
};

ToDo.prototype.editTitle = function(newTitle) {
  this.title = newTitle;
};

ToDo.prototype.editDescription = function(newDesc) {
  this.title = newDesc;
};

ToDo.prototype.addItem = function(itemDesc) {
  this.items[`${itemDesc}`] = new Item(itemDesc);
};

ToDo.prototype.getItemByDesc = function(itemDesc) {
  return this.items[`${itemDesc}`];
};

ToDo.prototype.deleteItem = function(itemDesc) {
  delete this.items[`${itemDesc}`];
};

ToDo.prototype.getItemsInList = function() {
  let keys = Object.keys(this.items);
  let toDoItems = this.items;
  let itemList = keys.map(function(key) {
    return toDoItems[key]
  })
  return itemList;
}


module.exports = ToDo;

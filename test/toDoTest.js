let assert = require('chai').assert;
let ToDo = require('../lib/toDo.js');
let ToDoItem = require('../lib/toDoItem.js');

describe('ToDo Module',()=>{
  describe('getTitle',()=>{
      it('should return title of ToDo',()=>{
        let todo = new ToDo('MyToDo');
        assert.equal(todo.getTitle(),'MyToDo');
      })
  })

  describe('editTitle',()=>{
    it('should edit title of ToDo',()=>{
      let todo = new ToDo('MyToDo');
      todo.editTitle('New ToDo');
      assert.equal(todo.getTitle(),'New ToDo');
    })
  })

  describe('getDescription',()=>{
      it('should return description of ToDo',()=>{
        let todo = new ToDo('MyToDo','desc');
        assert.equal(todo.getDescription(),'desc');
      })
  })

  describe('editDescription',()=>{
    it('should edit description of ToDo',()=>{
      let todo = new ToDo('My Description');
      todo.editDescription('New Description');
      assert.equal(todo.getDescription(),'New Description');
    })
  })

  describe('getItemByDesc',()=>{
    it('should return the toDoItem acc to desc given',()=>{
      let todo = new ToDo('My ToDo');
      let item1 = new ToDoItem('Item 1');
      let item2 = new ToDoItem('Item 2');
      todo.addItem('Item 1');
      todo.addItem('Item 2');
      assert.deepEqual(todo.getItemByDesc('Item 1'),item1);
      assert.deepEqual(todo.getItemByDesc('Item 2'),item2);
      assert.deepEqual(todo.getItems(),{'Item 1':item1,'Item 2':item2})
    })
  })

  describe('addItem',()=>{
    it('should add item object to items with item Desc as key',()=>{
      let todo = new ToDo('My ToDo');
      let item1 = new ToDoItem('Item 1')
      todo.addItem('Item 1');
      assert.deepEqual(todo.getItemByDesc('Item 1'),item1);
    })
  })

  describe('deleteItem',()=>{
    it('should delete item by given desc',()=>{
      let todo = new ToDo('My ToDo');
      let item1 = new ToDoItem('Item 1')
      todo.addItem('Item 1');
      todo.deleteItem('Item 1');
      assert.deepEqual(todo.getItems(),{});
    })
  })

  describe('getItemsDescInList',()=>{
    it('should return list of all toDoItem description',()=>{
      let todo = new ToDo('My ToDo');
      let item1 = new ToDoItem('Item 1');
      let item2 = new ToDoItem('Item 2');
      todo.addItem('Item 1');
      todo.addItem('Item 2');
      assert.deepEqual(todo.getItemsDescInList(),['Item 1','Item 2'])
    })
  })
})

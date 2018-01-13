let assert = require('chai').assert;
let User = require('../lib/user.js');
let ToDo = require('../lib/toDo.js');
let ToDoItem = require('../lib/toDoItem.js');

describe('User Module',()=>{
  describe('getName',()=>{
    it('should return userName',()=>{
      let user = new User('Pranav');
      assert.equal(user.getName(),'Pranav');
    })
  })

  describe('getAllToDo',()=>{
    it('should return allToDo',()=>{
      let user = new User('Pranav');
      assert.deepEqual(user.getAllToDo(),{});
    })
  })

  describe('addToDo',()=>{
    it('should add ToDo allToDo',()=>{
      let user = new User('Pranav');
      let toDo1 = new ToDo('ToDo1','First ToDo');
      let toDo2 = new ToDo('ToDo2','Second ToDo');
      user.addToDo('ToDo1','First ToDo');
      user.addToDo('ToDo2','Second ToDo');
      let allToDo = {'ToDo1':toDo1,"ToDo2":toDo2}
      assert.deepEqual(user.getAllToDo(),allToDo);
    })
  })

  describe('getToDo',()=>{
    it('should return a ToDo from allToDo by given title',()=>{
      let user = new User('Pranav');
      let toDo1 = new ToDo('ToDo1','First ToDo');
      let toDo2 = new ToDo('ToDo2','Second ToDo');
      user.addToDo('ToDo1','First ToDo');
      user.addToDo('ToDo2','Second ToDo');
      assert.deepEqual(user.getToDo('ToDo1'),toDo1);
      assert.deepEqual(user.getToDo('ToDo2'),toDo2);
    })
  })

  describe('deleteToDo',()=>{
    it('should delete toDo from allToDo',()=>{
      let user = new User('Pranav');
      let toDo1 = new ToDo('ToDo1','First ToDo');
      let toDo2 = new ToDo('ToDo2','Second ToDo');
      user.addToDo('ToDo1','First ToDo');
      user.addToDo('ToDo2','Second ToDo');
      user.deleteToDo('ToDo1');
      let allToDo = {"ToDo2":toDo2}
      assert.deepEqual(user.getAllToDo(),allToDo);
    })
  })

  describe('editTitleOf',()=>{
    it('should edit Title of given ToDo',()=>{
      let user = new User('Pranav');
      let myToDo = new ToDo('My ToDo','First ToDo');
      user.addToDo('ToDo1','First ToDo');
      user.editTitleOf('ToDo1','My ToDo');
      let allToDo = {"My ToDo":myToDo}
      assert.deepEqual(user.getAllToDo(),allToDo);
    })
  })

  describe('editDescOf',()=>{
    it('should edit description of given ToDo',()=>{
      let user = new User('Pranav');
      let toDo1 = new ToDo('ToDo1','My ToDo');
      user.addToDo('ToDo1','First ToDo');
      user.editDescOf('ToDo1','My ToDo');
      let allToDo = {"ToDo1":toDo1}
      assert.deepEqual(user.getAllToDo(),allToDo);
    })
  })

  describe('addItemTo',()=>{
    it('should add item to given ToDo',()=>{
      let user = new User('Pranav');
      user.addToDo('MyToDo');
      user.addItemTo('MyToDo','Item1');
      let myToDo = new ToDo('MyToDo');
      myToDo.addItem('Item1');
      let allToDo = {'MyToDo':myToDo};
      assert.deepEqual(user.getAllToDo(),allToDo);
    })
  })

  describe('checkItemOf',()=>{
    it('should check item to given ToDo',()=>{
      let user = new User('Pranav');
      user.addToDo('MyToDo');
      user.addItemTo('MyToDo','Item1');
      user.checkItemOf('MyToDo','Item1');
      let myToDo = new ToDo('MyToDo');
      myToDo.addItem('Item1');
      myToDo.checkItem('Item1');
      let allToDo = {'MyToDo':myToDo};
      assert.deepEqual(user.getAllToDo(),allToDo);
    })
  })

  describe('uncheckItemOf',()=>{
    it('should uncheck item to given ToDo',()=>{
      let user = new User('Pranav');
      user.addToDo('MyToDo');
      user.addItemTo('MyToDo','Item1');
      user.uncheckItemOf('MyToDo','Item1');
      let myToDo = new ToDo('MyToDo');
      myToDo.addItem('Item1');
      myToDo.uncheckItem('Item1');
      let allToDo = {'MyToDo':myToDo};
      assert.deepEqual(user.getAllToDo(),allToDo);
    })
  })

  describe('deleteItemOf',()=>{
    it('should delete item from given ToDo',()=>{
      let user = new User('Pranav');
      user.addToDo('MyToDo');
      user.addItemTo('MyToDo','Item1');
      user.deleteItemOf('MyToDo','Item1');
      let myToDo = new ToDo('MyToDo');
      let allToDo = {'MyToDo':myToDo}
      assert.deepEqual(user.getAllToDo(),allToDo);
    })
  })
})

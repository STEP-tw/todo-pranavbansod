let assert = require('chai').assert;
let User = require('../lib/user.js');
let ToDo = require('../lib/toDo.js');

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
      user.addToDo('ToDo2','Second ToDo')
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
      user.addToDo('ToDo2','Second ToDo')
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
      user.addToDo('ToDo2','Second ToDo')
      user.deleteToDo('ToDo1');
      let allToDo = {"ToDo2":toDo2}
      assert.deepEqual(user.getAllToDo(),allToDo);
    })
  })

})

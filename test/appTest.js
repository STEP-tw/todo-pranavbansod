let chai = require('chai');
let assert = chai.assert;
let request = require('../testDep/requestSimulator.js');
process.env.COMMENT_STORE = "./testStore.json";
let app = require('../app.js');
let th = require('../testDep/testHelper.js');


describe('login Page',()=>{
  describe('GET /login.html',()=>{
    it('serves login.html',done=>{
      request(app,{method:'GET',url:'/login.html'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Login Form')
        done();
      })
    })
  })
})


describe('app without Login',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',(done)=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })

  describe('GET /',()=>{
    it('redirects to login.html',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.should_be_redirected_to(res,'/login.html');
        assert.equal(res.body,"");
        done();
      })
    })
  })

  describe('GET /homePage',()=>{
    it('redirects to login.html',done=>{
      request(app,{method:'GET',url:'/homePage'},res=>{
        th.should_be_redirected_to(res,'/login.html');
        assert.equal(res.body,"");
        done();
      })
    })
  })

  describe('GET /toDo',()=>{
    it('redirects to login.html',done=>{
      request(app,{method:'GET',url:'/toDo'},res=>{
        th.should_be_redirected_to(res,'/login.html');
        assert.equal(res.body,"");
        done();
      })
    })
  })

  describe('GET /item.html',()=>{
    it('redirects to login.html',done=>{
      request(app,{method:'GET',url:'/item.html'},res=>{
        th.should_be_redirected_to(res,'/login.html');
        assert.equal(res.body,"");
        done();
      })
    })
  })
})

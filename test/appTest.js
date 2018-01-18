let chai = require('chai');
let assert = chai.assert;
let request = require('../testDep/requestSimulator.js');
process.env.COMMENT_STORE = "./testStore.json";
process.env.sessionid = '1234';
let app = require('../app.js');
let th = require('../testDep/testHelper.js');


describe('login Page',()=>{
  describe('GET /login.html without cookies',()=>{
    it('serves login.html',done=>{
      request(app,{method:'GET',url:'/login.html'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Login Form');
        done();
      })
    })
  })

  describe('POST /login.html with valid userName',()=>{
    it('should redirect to homePage',done=>{
      let req = {method:'POST',url:'/login.html',body:'userName=pranavb'}
      request(app,req,res=>{
        th.should_be_redirected_to(res,'/homePage');
        th.should_have_cookie(res,'sessionid','1234');
        done();
      })
    })
  })

  describe('POST /login.html with invalid userName',()=>{
    it('should redirect to homePage',done=>{
      let req = {method:'POST',url:'/login.html',body:'userName=invalid'}
      request(app,req,res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Login Form');
        th.should_not_have_cookie(res,'sessionid','1234');
        done();
      })
    })
  })

  describe('GET /login.html with cookie as valid user',()=>{
    let req = {method:'POST',url:'/login.html',body:'userName=pranavb'}
    let sessionCookie = "";
    it('it redirects to homePage',done=>{
      request(app,req,res=>{
        th.should_be_redirected_to(res,'/homePage')
        sessionCookie = res.headers[`Set-Cookie`];
        req['headers'] = {'cookie':`${sessionCookie}`};
        req['method'] = 'GET';
        done();
      })
    })
    it('it redirects to homePage',done=>{
      request(app,req,res=>{
        th.should_be_redirected_to(res,'/homePage')
        done();
      })
    })
  })

  describe('GET /login.html with cookie as invalid user',()=>{
    let req = {method:'POST',url:'/login.html',body:'userName=pranavb'}
    let sessionCookie = "";
    it('req with correct userName the res will have sessionid',done=>{
      request(app,req,res=>{
        th.should_be_redirected_to(res,'/homePage')
        sessionCookie = res.headers[`Set-Cookie`];
        req['headers'] = {'cookie':`1`};
        req['method'] = 'GET';
        done();
      })
    })
    it('it redirects to homePage',done=>{
      request(app,req,res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Login Form')
        done();
      })
    })
  })
})

describe('/logout request',()=>{
  describe('GET /logout',()=>{
    it('should redirect to Login',done=>{
      let req = {method:'POST',url:'/logout.html'};
      request(app,req,res=>{
        th.should_be_redirected_to(res,'/login.html')
        done();
      })
    })
  })
})

describe('/  : No filePath',()=>{
  describe('GET / with Cookie',()=>{
    it('should redirect to login page',(done)=>{
      let req = {method:'GET',url:'/'};
      request(app,req,res=>{
        th.should_be_redirected_to(res,'/login.html')
        done();
      })
    })
  })

  describe('GET / with Cookie',()=>{
    let req = {method:'POST',url:'/login.html',body:'userName=pranavb'}
    let sessionCookie = "";
    it('it should ',done=>{
      request(app,req,res=>{
        th.should_be_redirected_to(res,'/homePage')
        sessionCookie = res.headers[`Set-Cookie`];
        req['headers'] = {'cookie':`${sessionCookie}`};
        req['method'] = 'GET';
        done();
      })
    })

  })
})


describe('GET /bad',()=>{
  it('responds with 404',(done)=>{
    request(app,{method:'GET',url:'/bad'},(res)=>{
      assert.equal(res.statusCode,404);
      done();
    })
  })
})

describe('app without Login',()=>{
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

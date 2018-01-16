const fs = require('fs');

const getContentType = function(filename) {
  let extension = filename.slice(filename.lastIndexOf('.'));
  let contentType = {
    '.html':'text/html',
    '.jpg':'image/jpg',
    '.css':'text/css',
    '.js':'text/js',
    '.gif':'image/gif',
    '.pdf':'document/pdf',
    '.ico':'image/ico'
  }
  return contentType[extension];
};


const processForFileFound = function(req,res,filename) {
  let contentType = getContentType(filename);
  res.setHeader('Content-Type',contentType);
  res.statusCode = 200;
  res.write(fs.readFileSync(filename))
};

const processForPageNotFound = function(req,res) {
  res.statusCode = 404;
  res.write("Page Not Found")
};

const fileServer = function(req,res) {
  let filename = "./public" + req.url;
  if(filename=="./public/") {
    redirectToHomePage(req,res);
  }
  if(fs.existsSync(filename)) {
    processForFileFound(req,res,filename);
  } else {
    processForPageNotFound(req,res);
  }
  res.end();
};


module.exports = {
  fileServer
}

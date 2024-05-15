//create a web server
var http = require('http');
var fs = require('fs');
var url = require('url');
//var querystring = require('querystring');
var comments = [];
var server = http.createServer(function(req, res){
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  if(pathname == '/'){
    fs.readFile('./index.html', function(err, data){
      if(err){
        res.end('read file error');
      } else {
        res.end(data);
      }
    });
  } else if(pathname == '/post'){
    var comment = urlObj.query;
    comments.push(comment);
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
  } else if(pathname == '/comment'){
    res.end(JSON.stringify(comments));
  } else {
    fs.readFile('.' + pathname, function(err, data){
      if(err){
        res.end('404');
      } else {
        res.end(data);
      }
    });
  }
});
server.listen(3000, function(){
  console.log('listening on 3000');
});
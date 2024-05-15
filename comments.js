//create simple web server
//run node comments.js
//open browser and go to http://localhost:3000/

const http = require('http');
const fs = require('fs');
const path = require('path');

const comments = [];

http.createServer((req, res) => {
    if(req.url === '/'){
        fs.readFile(path.resolve(__dirname, 'index.html'), (err, data) => {
            if(err){
                console.log(err);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('500 - Internal Server Error');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    } else if(req.url === '/comments' && req.method === 'GET'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(comments));
    } else if(req.url === '/comments' && req.method === 'POST'){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            comments.push(JSON.parse(body));
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(comments));
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 - Page Not Found');
    }
}).listen(3000, () => {
    console.log('Server is running on http://localhost:3000/');
});



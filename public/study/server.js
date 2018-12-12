const http = require('http');

const server = http.createServer((req,res)=>{
    console.log('server run@');
    res.write('<h1>Helloo@@@@</h1>');
    res.end('<h1>Hello Server</h1>');
});

server.listen(8080);

server.on('listening', ()=>{
    console.log('8080포트에서 서버 대기 중');
});
server.get('/getPeopleAge',(req,res)=>{
   req.param('parkeunhye'
   db.
});

server.on('error',(error)=>{
    console.error(error);
});





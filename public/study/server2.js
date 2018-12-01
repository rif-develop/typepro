const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req,res)=>{
    fs.readFile('./server2.html',(err, data)=>{
       if(err){
           throw err;
       }
       res.end(data);
    });
}).listen(8081,()=>{
    console.log('8081 onready');
});
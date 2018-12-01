const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;



if (cluster.isMaster){
    console.log(`마스터 프로세스 아이디: ${process.pid}`);


    //씨피유 개수만큼 워커를 생산한다.
    for(let i =0;i<numCPUs;i++){
        cluster.fork();
    }
    //워커가 종료 되었을 때
    cluster.on('exit', (worker, code, signal)=>{
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        cluster.fork(); //워커 생
    })
} else{
    //워커들이 포트에서 대기
     http.createServer((req,res)=>{
        res.write('<h1>GO</h1>');
        res.end('<h2>gg</h2>');


        setTimeout(()=>{
        process.exit(1);
        },1000);

     }).listen(8085);


    console.log(`${process.pid}번 워커 실행`);
}
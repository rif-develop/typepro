//setinterval이 끊기지 않는다!
process.on('uncaughtException',(err)=>{
    console.error('얘기치 못한 에러',err);
    process.exit();
});


setInterval(()=>{
    console.log('start');
    try {
        throw new Error('서버를 고장내자!?');
    } catch (err){
        console.log(err);
    }
},1000);

setInterval(()=>{
    console.log('이게 실행이 된담=는 것은?!');
},2000);


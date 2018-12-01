const os = require('os');
const path = require('path');

console.log('os arch() : ', os.arch());
console.log('os.platform()', os.platform()=== 'darwin'? 'mac os':os.platform());//
console.log('os.type() :', os.type());//운영체제의 종류
console.log('os.uptime()', os.uptime());//운영체제 부팅이후 흐른 시간
console.log('os.hostname():', os.hostname());//컴퓨터의 이름
console.log('os.release()', os.release()); //운영체제의 버전

console.log('경로');
console.log('os.homedir() : ',os.homedir());//홈 디렉토리 경로
console.log('os.tmpdir() : ', os.tmpdir());//임시 파일 저장 경로
console.log('씨피유 정보--');
console.log('os.cpus() : ',os.cpus()); // 컴퓨터의 코어 정보를 보여준다.
console.log('os.cpus().length:', os.cpus().length);//코어 갯수 but 노드는 싱글쓰레드라 코어 몇 개든 한 개만 작동..cluster사용하면 해결!

console.log('memory usage');
console.log('os.freemem() : ',os.freemem());
console.log('os.totalmem() :',os.totalmem());




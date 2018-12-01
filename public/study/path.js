const path = require('path');
//__filename 현재파일의 경로, __dirname 현재 폴더의 경로
console.log('path.sep :', path.sep); //seperator 윈도우는 \ posix /
console.log('path.delimiter :', path.delimiter); // 환경변수 구분자 window ; posix :
console.log('path.dirname() :', path.dirname(__filename));//파일이 위치란 디렉토리 경로
console.log('path.extname()', path.extname(__filename));//파일의 확장자를 보여줍니다.
console.log('path.basename(string)',path.basename(__filename));//파일명 + 확장자 까지 보여준다.
console.log('path.basename(string,ext)',path.basename(__filename, path.extname(__filename)));//파일명만 보여준다.
console.log('path.parse()', path.parse(__filename));

let parse = path.parse(__filename);

console.log(path.format(parse)); //parse한 경로를 다시 하나로 합칩니다.

console.log('path.normalize', path.normalize('C://users/kim////df///sdf//')); // 구분자를 정상화시켜준다.
console.log('path.isAbsolute()', path.isAbsolute(__filename)); // 절대 경로라면 true 아니면 false
console.log('path.relative()', path.relative(__filename,'c://user'));//두개의 경로를 넣으면 첫 번째 경로에서 두 번쨰 경로로 가는 방법을 알려줌.
console.log('path.join()', path.join(__dirname,'/a','/b','/c','/rockandroll/'));//여러개의 경로를 하나의 경로로 합쳐준다. 상대경로와 현위치도 알아서 처리해준다.
console.log('path.resolve()', path.resolve(__dirname,'/a','/b','c'));//join 방식과 같지만 앞에 /가 연속되면 앞에 /를 무시한다.




const  crypto = require('crypto');
//단방향 암호화 방식은 주로 해시기법을 사용. 해시 기법이란 어떠한 문자열을 고정된 길이의 다른 문자열로 바꿔버리는 방법
//createHash() 사용할 알고리즘, update() 알고리즘과 해쉬를 적용할 문자열, digest()  인코딩할 알고리즘
console.log('base64 : ', crypto.createHash('sha512').update('password').digest('base64'));
console.log('hex : ', crypto.createHash('sha512').update('password').digest('hex'));
console.log('latin1 : ', crypto.createHash('sha512').update('password').digest('latin1'));
//비밀번호는 pbkdf2에 salt 를 쳐서 많이 단방향 암호화를 한다.
crypto.randomBytes(64,(err, buf)=>{
   const salt = buf.toString('base64');
   console.log('salt :', salt);
   try{
       crypto.pbkdf2('비밀번호',salt,100000,64,'sha512', (err, key)=>{
           console.log('password :', key.toString('base64'));
       });
   } catch (e) {
       console.error(e);
   } finally {
       console.log('비밀번호 암호화가 완료되었습니다.');
   }
});


//양방향 통신
const cipher = crypto.createCipher('aes-256-cbc','열쇠');
let result = cipher.update('암호화dddd할 문장','utf8','base64');
result += cipher.final('base64');
console.log('암호화 : ', result);

const decipher = crypto.createDecipher('aes-256-cbc','열쇠');
let result2 = decipher.update(result, 'base64', "utf8");
result2 += decipher.final('utf8');
console.log('복호화 : ', result2);





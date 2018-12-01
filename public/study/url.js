const url = require('url');
const querystring = require('querystring');
//WHATWG 방식 (웹표준을 정하는 단체)
const URL = url.URL;
const myURL = new URL('http://www.gilbut.co.kr/book/booklist.aspx?sercate1=001001000#anchor');
console.log('new URL()', myURL);

//기존에 사용되어오던 방식 (ㅊㅊ)
console.log(url.parse('http://www.gilbut.co.kr/book/booklist.aspx?sercate1=001001000#anchor'));

const departureUrl= url.parse('http://www.gilbut.co.kr/book/booklist.aspx?sercate1=001001000#anchor');
console.log('합쳐진 url',url.format(departureUrl)); //format은 분해된 요소를 다시 합친다고 보면 된다 무슨 매서드인지


const parseUrl = url.parse('http://www.gitbut.co.kr/?page=3&limit=10&category=node.js&category=javascript#hash');
const query = querystring.parse(parseUrl.query);

console.log(parseUrl);
console.log(query);// wow! 객체화
console.log(querystring.stringify(query));//객체를 문자열로 다시 조립

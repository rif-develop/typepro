import Snap from "snapsvg-cjs";


/*기능 : 익터넷 익스플로어 버전을 구하는 함수*/
export function CheckWebBrowser() {
    var rv = -1; // Return value assumes failure.

    if (navigator.appName === 'Microsoft Internet Explorer') {

        var ua = navigator.userAgent,
            re = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");

        if (re.exec(ua) !== null) {
            rv = parseFloat(RegExp.$1);
        }
    } else if (navigator.appName === "Netscape") {
        /// in IE 11 the navigator.appVersion says 'trident'
        /// in Edge the navigator.appVersion does not say trident
        if (navigator.appVersion.indexOf('Trident') === -1) rv = 12;
        else rv = 11;
    }

    return rv;
}

//컴포넌트 로딩 후 CDN추가한다.
export function loadScript(src, id, callback) {
    if (id && document.getElementById(id)) {
        return; // don't accidentally re-add
    }
    const script = document.createElement('script');
    if (callback) {
        script.onload = callback;
    }
    if (id) {
        script.setAttribute('id', id);
    }
    script.setAttribute('src', src);
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('charset', 'utf8');
    document.body.appendChild(script);
}

//가운데 정렬 시키는 함수
export function innerCenter(cssSelector) {
    const targetHeight = cssSelector.offsetHeight;
    const targetWidth = cssSelector.offsetWidth;
    const windowHeight = window.document.body.clientHeight;
    const windowWidth = window.document.body.clientWidth;
    cssSelector.style.top = Math.max(((windowHeight - targetHeight) / 2) + window.scrollY) + "px";
    cssSelector.style.left = Math.max(((windowWidth - targetWidth) / 2) + window.scrollX) + "px";
}

//svg 체크 애니메이션
export function checkAnimation(target) {
    const path = {
        one: 'M1.1,5.6',
        two: 'M1.1 5.6l4.1 4.2',
        three: 'M1.1 5.6l4.1 4.2 8.6-8.7'
    };
    /*svg선택*/
    const snap = Snap(target);
    /*path요소 선택*/
    let check = snap.select('path');
    /*체크 애니메이션 함수 */
    let checkAction = function () {
        check.animate({
            d: path.one,
            stroke: '#9013fe'
        }, 50, mina.easeBounce, function () {
            check.animate({
                d: path.two
            }, 100, mina.easeElastic, function () {
                check.animate({
                    d: path.three,
                    stroke: '#19ebdd'
                }, 250, mina.easeElastic);
            })
        });
    };

    checkAction();
}

//문자를 제거하는 함수
export function removeChar(event) {
    event = event || window.event;
    const keyID = (event.which) ? event.which : event.keyCode;
    if (keyID === 8 || keyID === 46 || keyID === 37 || keyID === 39) {

    } else {
        event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }
}
//숫자만 허용
export function acceptOnlyNumber(e) {
    const event = event || window.event;
    const key = (event.which) ? event.which : event.keyCode;
    const keyBoard = (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key === 8 || key === 46 || key === 37 || key === 39;
    return keyBoard;


}

//url에서 파라미터를 얻는 함수
export function getParams() {
    // 파라미터가 담길 배열
    let param = new Array();

    // 현재 페이지의 url
    let url = decodeURIComponent(location.href);
    // url이 encodeURIComponent 로 인코딩 되었을때는 다시 디코딩 해준다.
    url = decodeURIComponent(url);

    let params;
    // url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
    params = url.substring( url.indexOf('?')+1, url.length );
    // 파라미터 구분자("&") 로 분리
    params = params.split("&");

    // params 배열을 다시 "=" 구분자로 분리하여 param 배열에 key = value 로 담는다.
    let size = params.length;
    let key, value;
    for(let i=0 ; i < size ; i++) {
        key = params[i].split("=")[0];
        value = params[i].split("=")[1];

        param[key] = value;
    }

    return param;
}

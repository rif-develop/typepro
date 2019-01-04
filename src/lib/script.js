/*기능 : 익터넷 익스플로어 버전을 구하는 함수*/
export function CheckWebBrowser(){
    var rv = -1; // Return value assumes failure.

    if (navigator.appName === 'Microsoft Internet Explorer'){

        var ua = navigator.userAgent,
            re  = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");

        if (re.exec(ua) !== null){
            rv = parseFloat( RegExp.$1 );
        }
    }
    else if(navigator.appName === "Netscape"){
        /// in IE 11 the navigator.appVersion says 'trident'
        /// in Edge the navigator.appVersion does not say trident
        if(navigator.appVersion.indexOf('Trident') === -1) rv = 12;
        else rv = 11;
    }

    return rv;
}
//컴포넌트 로딩 후 CDN추가한다.
export function loadScript(src, id, callback) {
    if(id && document.getElementById(id)){
        return; // don't accidentally re-add
    }
    const script = document.createElement( 'script' );
    if(callback){
        script.onload = callback;
    }
    if(id){
        script.setAttribute( 'id', id );
    }
    script.setAttribute( 'src', src );
    script.setAttribute('type','text/javascript');
    script.setAttribute('charset','utf8');
    document.body.appendChild( script );
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
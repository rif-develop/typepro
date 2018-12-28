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

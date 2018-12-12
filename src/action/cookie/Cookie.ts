let cookieToday = new Date();
let expiryDate = new Date(cookieToday.getTime() + (365 * 86400000)); // a year


export function setCookie (name,value,expires,path,theDomain,secure) {

    value = escape(value);

    let theCookie = name + "=" + value +
        ((expires)    ? "; expires=" + expires.toGMTString() : "") +
        ((path)       ? "; path="    + path   : "") +
        ((theDomain)  ? "; domain="  + theDomain : "") +
        ((secure)     ? "; secure"            : "");

    document.cookie = theCookie;
}

export function getCookie(Name) {
    let search = Name + "=";
    if (document.cookie.length > 0) { // if there are any cookies
        let offset = document.cookie.indexOf(search);
        if (offset != -1) { // if cookie exists
            offset += search.length;
            // set index of beginning of value
            let end = document.cookie.indexOf(";", offset);
            // set index of end of cookie value
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(offset, end))
        }
    }
}

export function delCookie(name,path,domain) {
    if (getCookie(name)) document.cookie = name + "=" +
        ((path)   ? ";path="   + path   : "") +
        ((domain) ? ";domain=" + domain : "") +
        ";expires=Thu, 01-Jan-70 00:00:01 GMT";
}
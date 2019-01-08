// 넘어 온 값이 빈값인지 체크하는 함수입니다.
// !value 하면 생기는 논리적 오류를 제거하기 위해 명시적으로 value === 사용
// [], {} 도 빈값으로 처리, 공백과 space한칸도 빈값으로 처리하였음.
export function isEmpty(value) {
    const check = value === "" || value === " " || value === null || value === undefined || (value !== null && typeof value === "object" && !Object.keys(value).length);
    return check;
} // isEmpty function


/*input태그의 plcaholder value값 처리 이벤트*/
function placeholderHandler(cssSelector) {
    /*disabled된 input 태그라면 return 시킨다.*/
    var isDisabled = $(cssSelector).is(':disabled');

    if (isDisabled) {
        return false;
    }
    /*PLACEHOLDER의 값을 담을 변수*/
    var placeholderValue;

    /*타겟에 FOCUS시*/
    $(cssSelector).on("focus", function () {
        placeholderValue = $(this).attr("placeholder");
        $(this).attr("placeholder", "");
    }).on("blur", function () {
        $(this).attr("placeholder", placeholderValue);
    });
}// function placeholderHandler


/*연락처 정규식 검사*/
function telValidationCheck(cssSelector) {
    $(cssSelector).on('keydown', function (e) {
        // 숫자만 입력받기
        var trans_num = $(cssSelector).val().replace(/-/gi, '');
        var k = e.keyCode;
        console.log(trans_num);
        if (trans_num.length >= 11 && ((k >= 48 && k <= 126) || (k >= 12592 && k <= 12687 || k === 32 || k === 229 || (k >= 45032 && k <= 55203)))) {
            e.preventDefault();
        }
    }).on('blur', function () { // 포커스를 잃었을때 실행합니다.
        if ($(cssSelector).val() === '') return;

        // 기존 번호에서 - 를 삭제합니다.
        var trans_num = $(cssSelector).val().replace(/-/gi, '');

        // 입력값이 있을때만 실행합니다.
        if (trans_num != null && trans_num != '') {
            // 총 핸드폰 자리수는 11글자이거나, 10자여야 합니다.
            if (trans_num.length === 11 || trans_num.length === 10) {
                // 유효성 체크
                var regExp_ctn = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
                if (regExp_ctn.test(trans_num)) {
                    // 유효성 체크에 성공하면 하이픈을 넣고 값을 바꿔줍니다.
                    $(cssSelector).next(".validation_check").css('color', '#ea8255').text("적합");
                    trans_num = trans_num.replace(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/, "$1-$2-$3");
                    $(cssSelector).val(trans_num);
                } else {
                    $(cssSelector).val("");
                    $(cssSelector).next(".validation_check").css('color', 'red').text("부적합");
                    $(cssSelector).focus();
                }
            } else {
                $(cssSelector).val("");
                $(cssSelector).next(".validation_check").css('color', 'red').text("부적합");
                $(cssSelector).focus();
            }
        }
    });//전화번호 정규식 검사

} //function telValidationCheck

/*Html태그 제거 함수*/
export function removeHtmlTag(text) {
    text = text.replace(/<br\/>/ig, "\n");
    text = text.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
    return text;
}

export class Validations {

    static checkPhoneKr(value){
        const regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
        return regExp.test(value);
    }

    static checkCrn(value) {
        const regExp = /^([0-9]{3})-?([0-9]{2})-?([0-9]{5})$/i;
        return regExp.test(value);
    }

    static checkEmail(value){
        const regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
        return regExp.test(value);
    }

    static checkPassword(value){
        const regExp = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\s!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]).*$/;
        return regExp.test(value);
    }

    static checkNumber(value){
        const regExp = /^[0-9]*$/gi;
        return regExp.test(value);
    }

    //스페이스는 허용한다.
    static checkString(value){
        const regExp = /^[가-힣|a-z|A-Z|\*\s]+$/;
        return regExp.test(value);
    }

    //닉네임은 한글 1~8자, 영문 1~16자
    static checkNickname(value){
        const regExp = /^[가-힣|a-z|A-Z|0-9|\*]+$/;
        return regExp.test(value);
    }

    //파일명 체크 (특수문자는 -, _, @만 허용)
    static checkFilename(value){
        const regExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\-_@]+$/;
        return regExp.test(value);
    }

    //숫자 소수점 확인
    static checkFloat(value){
        const regExp = /^([0-9]*)[\.]?([0-9])?$/;
        return regExp.test(value);
    }
    //정수 1~3자리 확인, 소수점 2자리까지 확인
    static checkFloatDoublePoint(value){
        const regExp = /^(\d{1,3}([.]\d{0,2})?)?$/;
        return regExp.test(value);
    }

}





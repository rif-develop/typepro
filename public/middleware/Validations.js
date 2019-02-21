const validation = class Validations {

    static checkPhoneKr(value) {
        const regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
        return regExp.test(value);
    }

    static checkCrn(value) {
        const regExp = /^([0-9]{3})-?([0-9]{2})-?([0-9]{5})$/i;
        return regExp.test(value);
    }

    static checkEmail(value) {
        const regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
        return regExp.test(value);
    }

    static checkPassword(value) {
        const regExp = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\s!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]).*$/;
        return regExp.test(value);
    }

    static checkNumber(value) {
        const regExp = /^[0-9]*$/gi;
        return regExp.test(value);
    }

    //스페이스는 허용한다.
    static checkString(value) {
        const regExp = /^[가-힣|a-z|A-Z|\*\s]+$/;
        return regExp.test(value);
    }

    //닉네임은 한글 1~8자, 영문 1~16자
    static checkNickname(value) {
        const regExp = /^[가-힣|a-z|A-Z|0-9|\*]+$/;
        return regExp.test(value);
    }

    //파일명 체크 (특수문자는 -, _, @만 허용)
    static checkFilename(value) {
        const regExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\-_@]+$/;
        return regExp.test(value);
    }

    //숫자 소수점 확인
    static checkFloat(value) {
        const regExp = /^([0-9]*)[\.]?([0-9])?$/;
        return regExp.test(value);
    }

    //정수 1~3자리 확인, 소수점 2자리까지 확인
    static checkFloatDoublePoint(value) {
        const regExp = /^(\d{1,3}([.]\d{0,2})?)?$/;
        return regExp.test(value);
    }

    //빈값인지 확인
    static isEmpty(value) {
        const check = value === "" || value === " " || value === 'null' || value === 'undefined' || value === null || value === undefined || (value !== null && typeof value === "object" && !Object.keys(value).length);
        return check;
    }

};

module.exports = validation;
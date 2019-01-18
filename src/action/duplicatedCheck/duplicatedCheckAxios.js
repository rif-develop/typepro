//이메일 중복 여부를 검사한다.
//@param email : 검사할 이메일
import axios from "axios";

export const checkDuplicatedEmail = (email) => {
    return axios({
        method: 'post',
        url: '/signup/emailcheck',
        data: {
            email: email
        }
    });//axios
};

//닉네임 중복 여부를 검사한다.
//isDuplicated: false => 중복 아닌 상태
//isDuplicated: true => 중복인 상태
export const checkDuplicatedNickname = (value) => {
    return axios({
        method: 'POST',
        url: '/signup/nicknamecheck',
        data: {
            nickname: value
        }
    });
};

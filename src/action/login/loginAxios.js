import axios from "axios";

//클라이언트 로그인 요청
export function loginAxios(email, password) {
    return axios({
        method: 'post',
        url: "/login",
        data: {
            email: email,
            password: password
        }
    });
}


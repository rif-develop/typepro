import axios from "axios";

export function loginAxios(email, password){
    return axios({
        method: 'post',
        url: "/login",
        data: {
            email: email,
            password:password
        }
    });
}

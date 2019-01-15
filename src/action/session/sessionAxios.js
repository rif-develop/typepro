import axios from 'axios';


export function getSessionAxios() {
   return axios({
        method: 'post',
        url: '/getsession',
    });
}
// import axios from "axios";
// import {constants} from "@/constants";
//
// const onRequestSuccess = config => {
//     const token = localStorage.getItem("refresh_token");
//     if (token) {
//         if (!config.headers) {
//             config.headers = {};
//         }
//         config.headers.Authorization = `Bearer ${token}`;
//         config.url = `${constants.baseURL}/${config.url}`
//         return config;
//     }
// };
// const setAxiosInter = onUnauthenticated => {
//     const onResponseError = error => {
//         const status = error.status || error.response.status;
//         if (status === 401 || status === 403) {
//             onUnauthenticated();
//         }
//         return Promise.reject(error);
//     }
//     if (axios.interceptors) {
//         axios.interceptors.request.use(onRequestSuccess)
//         axios.interceptors.request.use(res => res, onResponseError)
//     }
//
// }
// export {onRequestSuccess, setAxiosInter}


import axios from "axios";
import { constants } from "@/constants";

const onRequestSuccess = config => {
    const token = localStorage.getItem("refresh_token");
    if (!config.headers) {
        config.headers = {};
    }
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.url = `${constants.baseURL}/${config.url}`.replace(/([^:]\/)\/+/g, "$1");
    return config;
};

const setAxiosInter = onUnauthenticated => {
    const onResponseError = error => {
        const status = error.status || error.response?.status;
        if (status === 401 || status === 403) {
            onUnauthenticated();
        }
        return Promise.reject(error);
    };

    if (axios.interceptors) {
        axios.interceptors.request.use(onRequestSuccess);
        axios.interceptors.response.use(response => response, onResponseError);
    }
};

export { onRequestSuccess, setAxiosInter };
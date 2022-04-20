import axios from "axios";
import TokenService from "./TokenService";
import config from "../config.json";

const instance = axios.create({
    baseURL: config.SERVER_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
instance.interceptors.request.use(
    (config) => {
        if (TokenService.getToken()) {
            config.headers["Authorization"] = "Bearer " + TokenService.getToken();
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// instance.interceptors.response.use(
//     (res) => {
//         return res;
//     },
//     async (err) => {
//         const originalConfig = err.config;
//         if (originalConfig.url !== "/auth/signin" && err.response) {
//             // Access Token was expired
//             if (err.response.status === 401 && !originalConfig._retry) {
//                 originalConfig._retry = true;
//                 try {
//                     const rs = await instance.post("/auth/refreshtoken", {
//                         refreshToken: TokenService.getLocalRefreshToken(),
//                     });
//                     const { accessToken } = rs.data;
//                     TokenService.updateLocalAccessToken(accessToken);
//                     return instance(originalConfig);
//                 } catch (_error) {
//                     return Promise.reject(_error);
//                 }
//             }
//         }
//         return Promise.reject(err);
//     }
// );
export default instance;
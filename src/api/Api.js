import axios from "axios";

const BaseApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

BaseApi.defaults.headers.post["Content-Type"] = "application/json";

const Api = () => {
    const token = localStorage.getItem("token");

    if (token) {
        BaseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return BaseApi;
};
export default Api;

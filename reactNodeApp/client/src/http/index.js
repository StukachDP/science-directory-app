import axios from "axios";

const $host = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
})

$authHost.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$authHost.interceptors.response.use((config) => {
    return config;
}, (async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config.isRetry) {
        originalRequest.isRetry = true;
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            
            return $authHost.request(originalRequest);
        } catch (error) {
            console.log("Пользователь не авторизован")
        }

    }
    throw error;
}));



export {
    $host,
    $authHost
}
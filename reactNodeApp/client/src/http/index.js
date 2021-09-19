import axios from "axios";


// В данном файле описывается создание хостов и их разделение на пользователя и администратора.
// Также описаны функции-интерцепторы, которые срабатывают при запросах в роли администратора.

// Определение публичного хоста.
// Значение baseURL берется из файла со статичной переменной пути.
const $host = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
})


// Определение админ хоста.
// Значение baseURL берется из файла со статичной переменной пути.
const $authHost = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
})


// Функция-интерцептор, которая записывает в headers токены доступа у администратора,
// чтобы их потом можно было извлечь при необходимости проверки роли.
$authHost.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});


// Функция-интерцептор, которая проверяет, не устарел ли токен у администратора 
// и вызывает функцию обновления токена в случае, если токен устарел.
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
import { $authHost, $host } from "./index";

// В данном файле определено взаимодействие запросов из фронт-енд приложения к серверу.
// При определенных запросах с клиента, которые здесь определены как функции,
// вызывается функция с серверной части приложения.
// Здесь описано взаимодействие только по функциям, связанных с информацией о пользователе и роли администратора.
// Некоторые функции могут вызываться только администратором, что описано с использованием хостинга.


export const registration = async(email, password, status) => {
    const {data} = await $authHost.post('/registration', { email, password, status })
    localStorage.setItem('token', data.accessToken);
    const user = {
        adminEmail: data.adminEmail,
        status: data.status
    };
    const userData = {
        user,
        isAuth: true
    };
    return userData;
}

export const login = async(email, password) => {
    const {data} = await $host.post('/login', { email, password });
    localStorage.setItem('token', data.accessToken);
    const user = {
        adminEmail: data.adminEmail,
        status: data.status
    };
    const userData = {
        user,
        isAuth: true
    };
    return userData;
}

export const logout = async() => {
    const data = await $authHost.post('/logout');
    localStorage.removeItem('token');
}

export const check = async() => {
    const {data} = await $authHost.get('/refresh');
    localStorage.setItem('token', data.accessToken);
    const user = {
        adminEmail: data.adminEmail,
        status: data.status
    };
    const userData = {
        user,
        isAuth: true
    };
    return userData;
}
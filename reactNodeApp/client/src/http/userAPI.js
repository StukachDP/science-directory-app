import { $authHost, $host } from "./index";


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
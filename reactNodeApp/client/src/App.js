import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/appRouter";
import NavBar from "./components/navBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";


// Основной файл react-приложения.
// Является оберткой для всех компонентов приложения.
const App = observer(() => {
    const { user } = useContext(Context)
    const [loading, setLoading] = useState(true)

    // Эффект, в процессе которого проверяется, является ли админом текущий пользователь.
    // Пока эта проверка проходит страницы не отображаются, а видна крутилка вместо информации.
    // Эффект работает всякий раз, когда приложение (не важно какую конкретно страницу) посещает пользователь.
    useEffect(() => {
        if(localStorage.getItem('token')){
            check().then(data => {
                user.setIsAuth(data.isAuth);
                user.setUser(data.user);

            }).finally(() => setLoading(false))
        }else{
            setLoading(false)
        }
    }, [])

    if (loading) {
        return <Spinner animation = { "grow" }/>
    }


    // Вывод компонентов, согласно созданной навигации.
    // Для всего, что выводится согласно навигации добавляется компонент с навигационной панелью.
    return ( 
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
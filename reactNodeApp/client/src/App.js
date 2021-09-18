import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/appRouter";
import NavBar from "./components/navBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";

const App = observer(() => {
    const { user } = useContext(Context)
    const [loading, setLoading] = useState(true)

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

    return ( 
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
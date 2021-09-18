import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { authRoutes, publicRoutes } from "../routes";
import { DIRECTORY_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
    const { user } = useContext(Context);

    return ( <Switch > {
            user.isAuth && authRoutes.map(({ path, Component }) =>
                <
                Route key = { path }
                path = { path }
                component = { Component }
                exact / >
            )
        } {
            publicRoutes.map(({ path, Component }) =>
                <
                Route key = { path }
                path = { path }
                component = { Component }
                exact / >
            )
        } 
        <Redirect to = { DIRECTORY_ROUTE }/> 
        </Switch>
    );
});

export default AppRouter;
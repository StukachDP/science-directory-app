import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import MagazineStore from "./store/MagazineStore";
export const Context = createContext(null);

// В данном файле представлено создание контекста 
// (описание ожидаемых данных, получаемых с сервера).

ReactDOM.render( 
    <Context.Provider 
        value={{
                user: new UserStore(),
                magazine: new MagazineStore(),
        }}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
);
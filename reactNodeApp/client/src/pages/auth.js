import React, { useContext, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { LOGIN_ROUTE, DIRECTORY_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { AuthPageContainer, AuthPageLogRegCard, AuthPageCardCaption, AuthPageFormContainer, AuthPageFormItem, AuthPageFormButton } from "../styles/authPage-style";


// Страница авторизации на администратора, а также регистрации нового администратора.
// В зависимости от того админ это или обычный пользователь происходит вызов соответствующей функции, 
// а также появляется соответствующая форма.
const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const history = useHistory();

    // Флаг, залогинен ли пользователь.
    const isLogin = location.pathname === LOGIN_ROUTE;

    // Описание получаемых в форме данных.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("Админ");

    // Функция, запускаемая при нажатии на кнопку, 
    // в которой идет запрос на функцию авторизации или регистрации администратора.
    const click = async () => {
        try {
            let data;
            if (!isLogin) {
                data = await registration(email, password,status);
            } else {
                data = await login(email, password);
            }
            user.setIsAuth(data.isAuth);
            user.setUser(data.user);
            history.push(DIRECTORY_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    // Вывод формы авторизации/регистрации и ее стилей.
    // Стили находяться в папке styles.
    return (
        <AuthPageContainer>
            <AuthPageLogRegCard>
                <AuthPageCardCaption>{!isLogin ? 'Регистрация админа' : "Админизация"}</AuthPageCardCaption>
                <AuthPageFormContainer>
                    <AuthPageFormItem
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <AuthPageFormItem
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    {!isLogin? 
                        <AuthPageFormItem
                            defaultValue={status}
                            readOnly
                        />
                        :
                        <div></div>
                    }
                    <AuthPageFormButton
                    
                        variant="outline-dark"
                        onClick={click}
                    >
                        {!isLogin ? 'Добавить админа' : 'Войти'}
                    </AuthPageFormButton>
                </AuthPageFormContainer>
            </AuthPageLogRegCard>
        </AuthPageContainer>
    );
});
export default Auth;
import React, { useContext, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { LOGIN_ROUTE, DIRECTORY_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { AuthPageContainer, AuthPageLogRegCard, AuthPageCardCaption, AuthPageFormContainer, AuthPageFormItem, AuthPageFormButton } from "../styles/authPage-style";

const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const history = useHistory();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("Админ");

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
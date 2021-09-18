import React, {useContext, useState, useEffect} from 'react';
import {Context} from "../index";
import {ADMIN_ROUTE, LOGIN_ROUTE, DIRECTORY_ROUTE,REGISTRATION_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {logout} from "../http/userAPI";
import {useLocation,useHistory} from 'react-router-dom';
import DirectionsBar from './directionsBar';
import { NavBarMain, NavBarContainer, NavBarBrand, NavBarBrandOnOthersPage, UserDropdownContainer, UserDropdownToggle, UserDropdownImage, UserDropdownMenu, UserDropdownItem} from '../styles/navBar-style';




const NavBar = observer(() => {
    const {user} = useContext(Context);
    const history = useHistory();
    const location = useLocation();
    const isDirectory = location.pathname === DIRECTORY_ROUTE;
    const [windows, setWindows] = useState(window.innerWidth);

    const logOut = () => {
        logout();
        user.setUser({});
        user.setIsAuth(false);
    }

    useEffect(() => {
        function handleResize() {
            setWindows(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
    });

    
    return (
        <NavBarMain variant="dark">
            <NavBarContainer>
                {isDirectory?
                   <>
                   <DirectionsBar />
                   <NavBarBrand
                        href={DIRECTORY_ROUTE}
                    >
                        Справочник журналов
                    </NavBarBrand></>
                    :
                    <NavBarBrandOnOthersPage
                        href={DIRECTORY_ROUTE} 
                    >
                        Справочник журналов
                    </NavBarBrandOnOthersPage>
                
                }
                
                
                {user.isAuth ?
                    <UserDropdownContainer>
                        
                        <UserDropdownToggle variant="black">
                            <UserDropdownImage xmlns="http://www.w3.org/2000/svg" class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </UserDropdownImage>
                        </UserDropdownToggle>
                        <UserDropdownMenu>
                            {windows < 589?
                                <UserDropdownItem 
                                        
                                    onClick={() => history.push(DIRECTORY_ROUTE)}
                                    
                                >
                                    На главную
                                </UserDropdownItem>
                                :
                                <></>
                            }
                            <UserDropdownItem 
                                
                                onClick={() => history.push(ADMIN_ROUTE)}
                                
                            >
                                Админ панель
                            </UserDropdownItem>
                            <UserDropdownItem     
                                
                                onClick={() => history.push(REGISTRATION_ROUTE)} 
                                
                            >
                                Добавить админа
                            </UserDropdownItem>
                            <UserDropdownItem 
                                
                                onClick={() => logOut()}
                                
                            >
                                Выйти
                            </UserDropdownItem>
                        </UserDropdownMenu>
                    </UserDropdownContainer>
                    :
                    <UserDropdownContainer>
                        <UserDropdownToggle variant="black"> 
                            <UserDropdownImage xmlns="http://www.w3.org/2000/svg" class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </UserDropdownImage>
                        </UserDropdownToggle>
                        <UserDropdownMenu>
                            {windows < 589?
                                <UserDropdownItem 
                                        
                                    onClick={() => history.push(DIRECTORY_ROUTE)}
                                    
                                >
                                    На главную
                                </UserDropdownItem>
                                :
                                <></>
                            }
                            <UserDropdownItem 
                                onClick={() => history.push(LOGIN_ROUTE)}
                            >
                                Админизация
                            </UserDropdownItem>
                        </UserDropdownMenu>
                    </UserDropdownContainer>
                }
            </NavBarContainer>
        </NavBarMain>

    );
});

export default NavBar;
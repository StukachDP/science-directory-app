import { makeAutoObservable } from "mobx";


// В данном файле описываются данные по администратору как состояние.
// Используется библиотека mobx.
// Ссылка на документацию: https://mobx.js.org/README.html
// Создаем класс, который описывает состояние информации по пользователю.

export default class UserStore {
    constructor() {
        // Флаг, указывающий авторизован ли пользователь.
        this._isAuth = false;
        // Объект, который принимает информацию об авторизованном пользователе.
        this._user = {};

        // Поле необходимое для описание состояния. 
        makeAutoObservable(this);
    }


    // Приведенные ниже функции вызываются тогда, когда необходимо обновить поле в объекте состояния.
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}
const userService = require("../service/userService.js");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error.js");



// В данном файле происходит обработка вводимых данных и результатов функций-логики.
// Все функции направлены на создание разделения между пользователем и администратором.
// Для упрощения читаемости и отсутствия загромождения функций, методы разделены на отдельные функции,
// вызов которых каждый метод определяет.

class UserController {


    // Метод регистрации пользователя.
    // В форме запроса пользователь заполняет email, пароль и статус.
    // Данные предварительно проверяются, используя модуль express-validator.
    // Ошибка выводится на консоль.
    // Метод эти данные принимает, вызывает функцию регистрации, которая выполняет логику.
    // Из полученных от функции данных берется refresh токен и записывается в cookie.
    // Остальные данные отправляются на клиент в формате json
    async registration(req, res, next) {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest("Ошибка при валидации вводимых данных!", errors.array()));
            }

            const { email, password, status } = req.body;
            const userData = await userService.registration(email, password, status);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }


    // Метод авторизации пользователя.
    // В форме запроса пользователь заполняет email и пароль.
    // Метод эти данные принимает, вызывает функцию авторизации, которая выполняет логику.
    // Из полученных от функции данных берется refresh токен и записывается в cookie.
    // Остальные данные отправляются на клиент в формате json.
    async login(req, res, next) {

        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }



    // Метод разлогирования пользователя.
    // Метод получает cookie.
    // Вызывается функция разлогирования, где выполняется логика.
    // Удаляется cookie по заголовку "refreshToken".
    // Данные о результате функции отправляются на клиент в формате json.
    async logout(req, res, next) {

        try {

            const { refreshToken } = req.cookies;
            const deletedData = await userService.logout(refreshToken);
            res.clearCookie("refreshToken");
            return res.json(deletedData);
        } catch (error) {
            next(error);
        }
    }



    // Метод обновления токена.
    // Из cookie метод берет токен.
    // Токен передается в функцию обновления, которая выполняет логику.
    // Из полученных от функции данных берется refresh токен и записывается в cookie.
    // Остальные данные отправляются на клиент в формате json.
    async refresh(req, res, next) {

        try {

            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
}


module.exports = new UserController();
const jwt = require("jsonwebtoken");
const pool = require("../models/userModel");


// В данном файле созданы функции, работающие с токенами.
// Используется модуль node.js json web tokens
// Документация по методу: https://www.npmjs.com/package/jsonwebtoken?activeTab=readme
// Для авторизации используются токены - зашифрованная строка, созданная из вводимых данных админа.
// Создается два токена: access и refresh.
// Первый используется для доступа к функциям админа
// Время действия - 1 час. После этого он бесполезен и должен быть обновлен.
// Второй токен используется для обновления первого и действует 1 день.
// Благодаря функции обновления токена админ может использовать админ-функции без переодической авторизации.
// После устаревания refresh токена, авторизацию необходимо будет провести.

class TokenService {

    // Проверка access токена по ключу, который находится в файле констант.
    // Функция проверки принимает строку токена.
    // Если валиден, выводит true, иначе null. 
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }

    // Проверка refresh токена по ключу, который находится в файле констант.
    // Функция проверки принимает строку токена.
    // Если валиден, выводит true, иначе null. 
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }


    // Функция генерации токенов.
    // Принимает данные пользователя(email, status).
    // Возвращает два токена.
    generateTokens(payload) {

        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' });

        return {
            accessToken,
            refreshToken
        }
    }

    // Сохранение refresh токена в базе данных вместе с паролем администратора.
    // Обновляет refresh токен в базе данных, если он устарел, по паролю администратора.
    async saveToken(password, refreshToken) {

        const candidateTokenCell = await new Promise((resolve, reject) => {
            pool.query("SELECT * FROM adminrefreshtoken WHERE adminPassword=?", [password], function(err, result) {
                return resolve(result[0]);
            })
        });
        if (candidateTokenCell !== undefined) {
            pool.query("UPDATE adminrefreshtoken SET refreshToken=? WHERE adminPassword=?", [refreshToken, password]);
        } else {
            pool.query("INSERT INTO adminrefreshtoken (adminPassword, refreshToken) VALUES (?,?)", [password, refreshToken]);
        }
    }


    // Удаление refresh токена из базы данных.
    // Используется при разлогировании администратора.
    async removeToken(refreshToken) {
        const result = await new Promise((resolve, reject) => {
            pool.query("DELETE FROM adminrefreshtoken WHERE refreshToken=?", [refreshToken], function(err, result) {
                return resolve("Success");
            });
        });
        return result;
    }

    // Определение администратора по refresh токену из базы данных.
    // Получает refresh токен.
    // Возвращает пароль администратора.
    async findToken(refreshToken) {
        const candidateForToken = await new Promise((resolve, reject) => {
            pool.query("SELECT * FROM adminrefreshtoken WHERE refreshToken=?", [refreshToken], function(err, result) {
                return resolve(result[0]);
            });
        });
        if (candidateForToken == undefined) {
            return null;
        } else {
            const hashPassword = candidateForToken.adminPassword;
            return hashPassword;
        }
    }

    // Определение администратора по его паролю.
    // Функция получает пароль, возвращает данные для создания пары токенов.
    async findUserByToken(hashPassword) {
        const userDataCandidate = await new Promise((resolve, reject) => {
            pool.query("SELECT * FROM admin WHERE password=?", [hashPassword], function(err, result) {
                return resolve(result[0]);
            });
        });
        if (userDataCandidate == undefined) {
            return null;
        } else {
            const adminEmail = userDataCandidate.adminEmail;
            const status = userDataCandidate.status;
            const payload = {
                adminEmail,
                status
            };
            return payload;
        }
    }
}

module.exports = new TokenService();
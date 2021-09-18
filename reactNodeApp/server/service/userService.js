const bcrypt = require("bcrypt");
const uuid = require("uuid");
const pool = require("../models/userModel.js");
const tokenService = require("./tokenService.js");
const ApiError = require("../exceptions/api-error.js");

class UserService {

    async registration(adminEmail, password, status) {

        const hashPassword = bcrypt.hashSync(password, 4);
        const adminCandidate = await new Promise((resolve, reject) => {
            pool.query("SELECT * FROM admin WHERE adminEmail=?", [adminEmail], function(err, result) {
                return resolve(result[0]);
            });
        });
        if (adminCandidate !== undefined) {
            throw ApiError.badRequest("Пользователь уже существует");
        } else {
            const insertResult = await new Promise((resolve, reject) => {
                pool.query("INSERT INTO admin (adminEmail, password, status) VALUES (?,?,?)", [adminEmail, hashPassword, status]);
                return resolve("Success");
            });
            const payload = {
                adminEmail,
                status
            };
            const tokens = tokenService.generateTokens(payload);
            tokenService.saveToken(hashPassword, tokens.refreshToken);
            return {
                ...tokens,
                ...payload,
                hashPassword
            }
        }
    }


    async login(adminEmail, password) {

        const adminCandidate = await new Promise((resolve, reject) => {
            pool.query("SELECT * FROM admin WHERE adminEmail=?", [adminEmail], function(err, result) {
                return resolve(result[0]);
            });
        });
        if (adminCandidate == undefined) {
            throw ApiError.badRequest("Пользователь с такими данными не найден");
        } else {
            const isPasswordEquals = bcrypt.compareSync(password, adminCandidate.password);
            if (!isPasswordEquals) {
                throw ApiError.badRequest("Пользователь с такими данными не найден");
            }
            const adminEmail = adminCandidate.adminEmail;
            const status = adminCandidate.status;
            const hashPassword = adminCandidate.password;
            const payload = {
                adminEmail,
                status
            };
            const tokens = tokenService.generateTokens(payload);
            tokenService.saveToken(hashPassword, tokens.refreshToken);
            return {
                ...tokens,
                ...payload
            }
        }
    }


    async logout(refreshToken) {
        const deleteData = await tokenService.removeToken(refreshToken);
        return deleteData;
    }


    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const passwordOfRefresh = await tokenService.findToken(refreshToken);
        if (!userData || !passwordOfRefresh) {
            throw ApiError.unauthorizedError();
        } else {
            const payloadForRefresh = await tokenService.findUserByToken(passwordOfRefresh);
            if (payloadForRefresh == undefined) {
                throw ApiError.unauthorizedError();
            } else {
                const tokens = tokenService.generateTokens(payloadForRefresh);
                tokenService.saveToken(passwordOfRefresh, tokens.refreshToken);
                return {
                    ...tokens,
                    ...payloadForRefresh
                }
            }
        }
    }
}

module.exports = new UserService();
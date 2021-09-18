const bcrypt = require("bcrypt");
const uuid = require("uuid");
const pool = require("../models/userModel.js");
const mailService = require("./mailService.js");
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
            const activationLink = uuid.v4();
            const isActivated = false;
            const insertResult = await new Promise((resolve, reject) => {
                pool.query("INSERT INTO admin (adminEmail, password, status, isActivated, activationLink) VALUES (?,?,?,?,?)", [adminEmail, hashPassword, status, isActivated, activationLink]);
                return resolve("Success");
            });
            //mailService.sendActivationMail(adminEmail, `${process.env.DIRECTORY_URL}/activate/${activationLink}`);
            const payload = {
                adminEmail,
                status,
                activationLink
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

    async activate(activationLink) {

        const activatedUser = await new Promise((resolve, reject) => {
            pool.query("SELECT * FROM admin WHERE activationLink=?", [activationLink], function(err, result) {
                return resolve(result[0]);
            });
        });
        if (activatedUser == undefined) {
            throw ApiError.badRequest("Некорректная ссылка активации.");
        } else {
            const isActivated = true;
            const activation = await new Promise((resolve, reject) => {
                pool.query("UPDATE admin SET isActivated=? WHERE adminEmail=?", [isActivated, activatedUser.adminEmail], function(err, result) {
                    return resolve("Success");
                });
            });
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
            const activationLink = adminCandidate.activationLink;
            const hashPassword = adminCandidate.password;
            const payload = {
                adminEmail,
                status,
                activationLink
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
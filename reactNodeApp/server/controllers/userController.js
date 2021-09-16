const pool = require("../models/userModel.js");
const userService = require("../service/userService.js");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error.js");

class UserController {

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


    async activate(req, res, next) {

        try {

            const activationLink = req.params.link;
            userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            next(error);
        }
    }


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
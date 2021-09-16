const jwt = require("jsonwebtoken");
const pool = require("../models/userModel");

class TokenService {


    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }


    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }



    generateTokens(payload) {

        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' });

        return {
            accessToken,
            refreshToken
        }
    }

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

    async removeToken(refreshToken) {
        const result = await new Promise((resolve, reject) => {
            pool.query("DELETE FROM adminrefreshtoken WHERE refreshToken=?", [refreshToken], function(err, result) {
                return resolve("Success");
            });
        });
        return result;
    }


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
            const activationLink = userDataCandidate.activationLink;
            const payload = {
                adminEmail,
                status,
                activationLink
            };
            return payload;
        }
    }
}

module.exports = new TokenService();
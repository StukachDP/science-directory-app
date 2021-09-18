const ApiError = require("../exceptions/api-error.js");

// Промежуточный обработчик ошибок для выявления тех, ошибок, которые вызваны
// некорректной работой программы.

module.exports = function(err, req, res, next) {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({ status: err.status, message: err.message, errors: err.errors });
    } else {
        return res.status(500).json({ message: "Непредвиденная ошибка" });
    }
};
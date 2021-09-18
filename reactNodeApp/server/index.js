require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router/index.js");
const errorMiddleware = require("./middleware/error-middleware.js");

const PORT = process.env.PORT || 5000;
let app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use("/", router);
app.use(errorMiddleware);

// Основной файл работы сервера.
// Объявляются все зависимости, роутинг и обработчик ошибок.
// Запускает сервер на порт указанный в соответствующей переменной.
// В случае ошибки, выводит соответствующее сообщение в консоль. 
const start = () => {

    try {
        app.listen(PORT, () => console.log(`Server started at ${PORT} port`));
    } catch (error) {
        console.log(error);
    }
}


start();
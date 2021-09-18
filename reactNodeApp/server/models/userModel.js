const mysql = require("mysql2");


// Файл, в котором производится подключение к базе данных.
// Производится создание пула (соединения с конкретной базой данных) по указанному хосту.
// Это соединение экспортируется в сервисы для использования в функциях-логики сервера.

const pool = mysql.createPool({

    connectionLimit: 5,
      
    host: "localhost",
    user: "root",
    database: "sciencemagazines",
    password: ""
}); 

module.exports = pool;
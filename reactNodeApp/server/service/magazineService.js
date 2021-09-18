const pool = require("../models/userModel.js");
const ApiError = require("../exceptions/api-error.js");


// В данном файле определены функции взаимодействия с базой данных
// для операций с информацией о научных журналах.    
// Все запросы в базу данных - асинхронны.    
// Для корректного выполнения функций используется Promise
// Ссылка на ресурс: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise

class MagazineService {

    // Получение информации обо всех научных журналах в соответствующей таблице в базе данных.
    // Функция выводит массив объектов.
    async getMagazines() {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM sciencemagazines`, function(err, result) {
                return resolve(result);
            });
        });

    }

    // Получение информации о журнале по указанному id.
    // Функция принимает id, выводит объект журнала.
    async getMagazineInfo(magazineId) {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM sciencemagazines WHERE id=?", [magazineId], function(err, result) {
                return resolve(result[0]);
            });
        });
    }

    // Получение информации о журналах по указанному названию.
    // Поиск производится по совпадению введенной информации с полеми nameOriginal и nameEng в базе данных.
    // Функция принимает название, выводит массив объектов.
    async getMagazinesByTitle(searchingData) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM sciencemagazines WHERE nameEng LIKE "%"?"%" OR nameOriginal LIKE "%"?"%"`, [searchingData, searchingData], function(err, result) {
                if (result !== undefined) {
                    return resolve(result);
                } else {
                    return resolve("Журналов не найдено...");
                }

            });
        });
    }


    // Получение информации о журналах по указанному научному направлению.
    // Функция принимает научное направление, выводит массив объектов.
    async getMagazinesByScientificDirections(choosenDirection) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM sciencemagazines WHERE scientificDirections LIKE "%"?"%"`, [choosenDirection], function(err, result) {
                if (result !== undefined) {
                    return resolve(result);
                } else {
                    return reject("Журналов не найдено...");
                }

            });
        });
    }


    // Создание в базе данных нового журнала по введенным данным.
    // Функция принимает значения, соответствующие каждому полю в базе данных.
    // Функция возвращает строку с успешным выполнением запроса.
    async createMagazine(nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience) {
        return new Promise((resolve, reject) => {
            pool.query("INSERT INTO sciencemagazines (nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience]);
            return resolve("Информация внесена в базу данных...");
        });
    }


    // Редактирование текущей информации о журнале в базе данных по совпадению id.
    // Функция принимает измененные значения, соответствующие каждому полю в базе данных и id.
    // Функция возвращает строку с успешным выполнением запроса.
    async editMagazineInfo(id, nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience) {
        return new Promise((resolve, reject) => {
            pool.query("UPDATE sciencemagazines SET nameOriginal=?, nameRus=?, nameEng=?, ISSNprint=?, ISSNonline=?, publisher=?, publisherEng=?, scientificDirections=?, webPage=?, accessTextArticles=?, dataStartArchieve=?, dataEndArchieve=?, embargoTerm=?, prefixDOI=?, includedRSCI=?, linkELibrary=?, accessArticleELibrary=?, dataStartArchieveELibrary=?, dataEndArchieveELibrary=?, bibliometricIndicatorsRSCI=?, yearsIndexingScopus=?, yearsIndexingWebOfScience=? WHERE id=?", [nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience, id]);
            return resolve("Информация внесена в базу данных...");
        });
    }


    // Удаление всей информации из базы данных о журнале с подходящим id.
    // Функция принимает id.
    // Функция возвращает строку с успешным выполнением запроса.
    async deleteMagazineInfo(magazineId) {
        return new Promise((resolve, reject) => {
            pool.query("DELETE FROM sciencemagazines WHERE id=?", [magazineId]);
            return resolve("Информация в базе данных обновлена...");
        });
    }
}

module.exports = new MagazineService();
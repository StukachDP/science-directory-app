const pool = require("../models/userModel.js");
const ApiError = require("../exceptions/api-error.js");

class MagazineService {


    async getMagazines() {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM sciencemagazines`, function(err, result) {
                return resolve(result);
            });
        });

    }


    async getMagazineInfo(magazineId) {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM sciencemagazines WHERE id=?", [magazineId], function(err, result) {
                return resolve(result[0]);
            });
        });
    }


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

    async createMagazine(nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience) {
        return new Promise((resolve, reject) => {
            pool.query("INSERT INTO sciencemagazines (nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience]);
            return resolve("Информация внесена в базу данных...");
        });
    }

    async editMagazineInfo(id, nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience) {
        return new Promise((resolve, reject) => {
            pool.query("UPDATE sciencemagazines SET nameOriginal=?, nameRus=?, nameEng=?, ISSNprint=?, ISSNonline=?, publisher=?, publisherEng=?, scientificDirections=?, webPage=?, accessTextArticles=?, dataStartArchieve=?, dataEndArchieve=?, embargoTerm=?, prefixDOI=?, includedRSCI=?, linkELibrary=?, accessArticleELibrary=?, dataStartArchieveELibrary=?, dataEndArchieveELibrary=?, bibliometricIndicatorsRSCI=?, yearsIndexingScopus=?, yearsIndexingWebOfScience=? WHERE id=?", [nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience, id]);
            return resolve("Информация внесена в базу данных...");
        });
    }

    async deleteMagazineInfo(magazineId) {
        return new Promise((resolve, reject) => {
            pool.query("DELETE FROM sciencemagazines WHERE id=?", [magazineId]);
            return resolve("Информация в базе данных обновлена...");
        });
    }
}

module.exports = new MagazineService();
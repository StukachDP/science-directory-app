const magazineService = require("../service/magazineService.js");
const ApiError = require("../exceptions/api-error.js");

// В данном файле происходит обработка вводимых данных и результатов функций-логики.
// Функции вызываемые в методах взаимодействуют только с базой данных научных журналов.
// Для упрощения читаемости и отсутствия загромождения функций, методы разделены на отдельные функции,
// вызов которых каждый метод определяет.

class MagazineController {

    // Метод вызывает функцию, получения всех журналов из базы данных.
    // Данные отправляеются на клиент в формате json.
    async getMagazines(req, res, next) {

        try {
            const allMagazines = await magazineService.getMagazines();
            res.json(allMagazines);
        } catch (error) {
            next(error);
        }
    }


    // Метод получения информации о журнале с определенным id.
    // Из строки запроса получаем id журнала.
    // Вызываем функцию логики.
    // Полученные данные отправляеются на клиент в формате json. 
    async getMagazineInfo(req, res, next) {
        try {
            const {id} = req.params;
            const magazineInfo = await magazineService.getMagazineInfo(id);
            res.json(magazineInfo);
        } catch (error) {
            next(error);
        }
    }


    // Метод поиска журналов по названию.
    // Из тела запроса получаем информацию поиска.
    // Вызываем функцию логики.
    // Полученные данные отправляеются на клиент в формате json. 
    async getMagazinesByTitle(req, res, next) {
        try {
            const { searchingData } = req.query;
            const searchingResult = await magazineService.getMagazinesByTitle(searchingData);
            res.json(searchingResult);
        } catch (error) {
            next(error);
        }
    }


    // Метод получения всех журналов по выбранному направлению.
    // Из тела запроса получаем научное направление.
    // Вызываем функцию логики.
    // Полученные данные отправляеются на клиент в формате json. 
    async getMagazinesByScientificDirections(req, res, next) {
        try {
            const {choosenDirection} = req.query;
            const searchingResult = await magazineService.getMagazinesByScientificDirections(choosenDirection);
            res.json(searchingResult);
        } catch (error) {
            next(error);
        }
    }


    // Метод создания журнала.
    // Получаем данные журнала из тела запроса.
    // Вызываем функцию логики.
    // Данные о результате выполнения функции отправляеются на клиент в формате json.
    async createMagazine(req, res, next) {
        try {
            const { nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience } = req.body;
            const responseData = await magazineService.createMagazine(nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience);
            res.json(responseData);
        } catch (error) {
            next(error);
        }
    }



    // Метод редактирования информации о журнале.
    // Получаем отредактированные данные и id журнала из тела запроса.
    // Вызываем функцию логики.
    // Данные о результате выполнения функции отправляеются на клиент в формате json.
    async editMagazineInfo(req, res, next) {
        try {
            const { id, nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience } = req.body;
            const responseData = await magazineService.editMagazineInfo(id, nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience);
            res.json(responseData);
        } catch (error) {
            next(error);
        }
    }


    // Метод удаления журнала из базы данных по указанному id.
    // Из строки запроса получаем id с помощью req.params.
    // Вызываем функцию, выполняющую логику удаления.
    // Данные о результате выполнения функции отправляеются на клиент в формате json.
    async deleteMagazineInfo(req, res, next) {
        try {
            const { id } = req.params;
            const responseData = await magazineService.deleteMagazineInfo(id);
            res.json(responseData);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MagazineController();
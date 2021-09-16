const pool = require("../models/userModel.js");
const magazineService = require("../service/magazineService.js");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error.js");

class MagazineController {


    async getMagazines(req, res, next) {

        try {
            const allMagazines = await magazineService.getMagazines();
            res.json(allMagazines);
        } catch (error) {
            next(error);
        }
    }

    async getMagazineInfo(req, res, next) {
        try {
            const {id} = req.params;
            const magazineInfo = await magazineService.getMagazineInfo(id);
            res.json(magazineInfo);
        } catch (error) {
            next(error);
        }
    }

    async getMagazinesByTitle(req, res, next) {
        try {
            const { searchingData } = req.query;
            const searchingResult = await magazineService.getMagazinesByTitle(searchingData);
            res.json(searchingResult);
        } catch (error) {
            next(error);
        }
    }

    async getMagazinesByScientificDirections(req, res, next) {
        try {
            const {choosenDirection} = req.query;
            const searchingResult = await magazineService.getMagazinesByScientificDirections(choosenDirection);
            res.json(searchingResult);
        } catch (error) {
            next(error);
        }
    }

    async createMagazine(req, res, next) {
        try {
            const { nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience, description } = req.body;
            const responseData = await magazineService.createMagazine(nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience, description);
            res.json(responseData);
        } catch (error) {
            next(error);
        }
    }

    async getMagazineInfoToEdit(req, res, next) {
        try {
            const { id } = req.params;
            const magazineInfoToEdit = await magazineService.getMagazineInfoToEdit(id);
            res.json(magazineInfoToEdit);
        } catch (error) {
            next(error);
        }
    }

    async editMagazineInfo(req, res, next) {
        try {
            const { id, nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience, description } = req.body;
            const responseData = await magazineService.editMagazineInfo(id, nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience, description);
            res.json(responseData);
        } catch (error) {
            next(error);
        }
    }

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
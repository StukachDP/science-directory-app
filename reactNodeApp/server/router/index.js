// Основной файл роутинга.
// На определенные запросы выполняет соответствующую функцию в контроллере

const Router = require("express").Router;
const { body } = require("express-validator");
const router = new Router();
const userController = require("../controllers/userController.js");
const magazineController = require("../controllers/magazineController.js");



// При запросе регистрации используется модуль обработки получаемых данных на корректность.
// Для email по структуре строки, в пароле - по длине строки.

router.post("/registration",
    body("email").isEmail(),
    body("password").isLength({ min: 3, max: 20 }),
    userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/getMagazines", magazineController.getMagazines);
router.get("/getMagazineInfo/:id", magazineController.getMagazineInfo);
router.get("/searchByTitle", magazineController.getMagazinesByTitle);
router.get("/searchByScientificDirections", magazineController.getMagazinesByScientificDirections);
router.post("/createMagazine", magazineController.createMagazine);
router.post("/editMagazineInfo", magazineController.editMagazineInfo);
router.post("/deleteMagazineInfo/:id", magazineController.deleteMagazineInfo);




module.exports = router;
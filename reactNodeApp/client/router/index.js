const Router = require("express").Router;
const { body } = require("express-validator");
const userController = require("../controllers/userController.js");
const magazineController = require("../controllers/magazineController.js");
const authMiddleware = require("../middleware/auth-middleware.js");


const router = new Router();

router.post("/registration",
    body("email").isEmail(),
    body("password").isLength({ min: 3, max: 20 }),
    userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/activate/:link", userController.activate);
// authMiddleware,
router.get("/getMagazines", magazineController.getMagazines);
router.get("/getMagazineInfo/:id", magazineController.getMagazineInfo);
router.get("/searchByTitle", magazineController.getMagazinesByTitle);
router.get("/searchByScientificDirections", magazineController.getMagazinesByScientificDirections);
router.post("/createMagazine", magazineController.createMagazine);
router.get("/editMagazineInfo/:id", magazineController.getMagazineInfoToEdit);
router.post("/editMagazineInfo", magazineController.editMagazineInfo);
router.post("/deleteMagazineInfo/:id", magazineController.deleteMagazineInfo);




module.exports = router;
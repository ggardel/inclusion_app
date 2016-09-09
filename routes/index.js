var express = require('express');
var router = express.Router();



var authController = require("../controllers/authController")
var userController = require("../controllers/userController")
var profileController = require("../controllers/profileController")
var wasteController = require('../controllers/waste-controller');

//Auth, login and register routes
router.post("/login", authController.login)
router.post("/register", authController.register)
router.get("/user", authController.verifyToken, userController.user)

//User routes
router.get("/user", authController.verifyToken, userController.getUsers);
router.post("/user/follow", userController.followUser);
router.get("/user/get", userController.getUsers);


//Profile routes
router.get("/profile", authController.verifyToken, userController.user);
router.get("/profile/:id", profileController.show);
router.post("/profile/:id", profileController.create);
router.post("/profile/:id", profileController.createDisability);
router.patch("/profile/:id", profileController.update);
router.patch("/profile/disability/:id", profileController.updateDisability);
router.delete("/profile/:id", profileController.delete);
router.patch("/profile/:id/photo", profileController.update)

router.post("/profile/:id/facility", profileController.newFacility);
router.get("/profile/:id/facilities", profileController.showFacilities);
router.get("/profile/:user_id/facilities/:id", profileController.showFacility);
router.post("/profile/:user_id/facility/:id", profileController.editfacility);
router.delete("/profile/:user_id/facilities/:id", profileController.deletefacility);

//Waste
router.post('/waste/post', wasteController.postWaste);
router.post('/waste/get', wasteController.getWastes);


module.exports = router;

var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../midlewares/uploadFile');

/* GET users listing. */

router.post('/addUserEmployeur',userController.addUserEmployeur);
router.post('/addUserAdmin',userController.addUserAdmin); 
router.get('/getAllUsers',userController.getAllUsers); 
router.get('/getUserById/:id',userController.getUserById); 
router.get('/searchUserByUsername',userController.searchUserByUsername); 
router.get('/searchUserByUsername',userController.searchUserByUsername);
router.get('/getAllUsersSortByAge',userController.getAllUsersSortByAge); 
router.get('/getAllEmployeur',userController.getAllEmployeur); 
router.get('/getAllAdmin',userController.getAllAdmin); 
router.get('/getAllUsersAgeBetMaxAgeMinAge',userController.getAllUsersAgeBetMaxAgeMinAge); 
//ajouter donc =post
router.post('/addUserEmployeurWithImg/:id',upload.single("image_user"),userController.addUserEmployeurWithImg); 
router.delete('/deleteUserById/:id',userController.deleteUserById); 
 


//router.get('/getAllEmployeur',userController.getAllEmployeur); //
module.exports = router;
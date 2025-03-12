var express = require('express');
var router = express.Router();
const inscritController = require('../controllers/inscritController');
/* GET home page. */
// router.get('/getAllInscrits', inscritController.getAllInscrits);
router.get('/getInscritById/:id', inscritController.getInscritById);
router.post('/addInscrit', inscritController.addInscrit);
router.put('/updateInscrit/:id',inscritController.updateInscrit);
router.put('/affect', inscritController.affect);
router.put('/desaffect', inscritController.desaffect );
router.delete('/deleteInscritById/:id', inscritController.deleteInscritById);

module.exports = router;



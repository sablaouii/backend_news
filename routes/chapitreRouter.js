var express = require('express');
var router = express.Router();
const chapitreController = require('../controllers/chapitreController');
/* GET home page. */
 router.get('/getAllChapitre', chapitreController.getAllChapitre);
 router.get('/getChapitreById/:id', chapitreController.getChapitreById);
router.post('/addChapitre', chapitreController.addChapitre);
router.put('/updateChapitre/:id',chapitreController.updateChapitre);
router.put('/affect', chapitreController.affect);
router.put('/desaffect', chapitreController.desaffect );
router.delete('/deleteChapitreById/:id', chapitreController.deleteChapitreById);

module.exports = router;



var express = require('express');
var router = express.Router();
const alerteController = require('../controllers/alerteController');
/* GET home page. */
router.get('/getAllAlertes', alerteController.getAllAlertes);
router.get('/getAlerteById/:id', alerteController.getAlerteById);
router.post('/addAlerte', alerteController.addAlerte);
router.put('/updateAlerte/:id',alerteController.updateAlerte);
router.put('/affect', alerteController.affect);
router.put('/desaffect', alerteController.desaffect );
router.delete('/deleteAlerteId/:id', alerteController.deleteAlerteById);

module.exports = router;



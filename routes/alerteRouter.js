var express = require('express');
var router = express.Router();
const alerteController = require('../controllers/alerteController');
const {requireAuthUser} = require('../midlewares/authMiddleware');
const {authorizeRole} = require('../midlewares/authorizeRole');
/* GET home page. */
router.get('/getAllAlertes',requireAuthUser, authorizeRole("admin"), alerteController.getAllAlertes);
router.get('/getAlerteById/:id',requireAuthUser, authorizeRole("admin"), alerteController.getAlerteById);
router.post('/addAlerte', requireAuthUser, authorizeRole("admin"),alerteController.addAlerte);
router.put('/updateAlerte/:id',requireAuthUser, authorizeRole("admin"),alerteController.updateAlerte);
router.put('/affect', alerteController.affect);
router.put('/desaffect', alerteController.desaffect );
router.delete('/deleteAlerteId/:id',requireAuthUser, authorizeRole("admin"), alerteController.deleteAlerteById);

module.exports = router;



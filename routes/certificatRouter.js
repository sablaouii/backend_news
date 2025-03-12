var express = require('express');
var router = express.Router();
const certificatController = require('../controllers/certificatController');

/* GET home page. */
router.get('/getAllCertificats', certificatController.getAllCertificats );
router.get('/getCertificatById/:id', certificatController.getCertificatById );
router.post('/addCertificat', certificatController.addCertificat );
router.put('/updateCertificat/:id', certificatController.updateCertificat);
router.put('/affect', certificatController.affect);
router.put('/desaffect', certificatController.desaffect);
router.delete('/deleteCertificatById/:id', certificatController.deleteCertificatById);
module.exports = router;
var express = require('express');
var router = express.Router();
const notifController = require('../controllers/notifController');


/* GET home page. */
router.get('/getAllNotifs', notifController.getAllNotifs);
router.get('/getNotifById/:id', notifController.getNotifById);
router.post('/addNotif', notifController.addNotif);
router.put('/updateNotif/:id',notifController.updateNotif);
router.put('/affect', notifController.affect);
router.put('/desaffect', notifController.desaffect );
router.delete('/deleteNotifById/:id', notifController.deleteNotifById);

module.exports = router;



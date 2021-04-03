

const router = require('express-promise-router')();
const roomController = require('../controllers/room.controller');


router.get('/room/:name', roomController.listRoomByName);
router.get('/room', roomController.listAllRoom);
router.post('/booking',roomController.bookRoom);
router.put('/booking/:id',roomController.checkInById);
router.post('/renting',roomController.rentRoom);
module.exports = router;
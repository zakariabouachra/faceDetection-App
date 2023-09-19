const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController.js');

router.post('/checkPresence', dataController.checkPresence);

module.exports = router;

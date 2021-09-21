const express = require('express');
const router = express.Router();
const controller = requiere('../controllers/index');

/* GET home page. */
router.get('/', controller.home);

module.exports = router;

const express = require('express');
const { getHomepage, getABC } = require('../controllers/homeController');
const router = express.Router();

router.get('/', getHomepage)
router.get('/abc', getABC)

module.exports = router; //export default
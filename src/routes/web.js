const express = require('express');
const { getHomepage, getABC, postCreateUser } = require('../controllers/homeController');
const router = express.Router();

router.get('/', getHomepage);
router.get('/abc', getABC);

router.post('/create-user', postCreateUser);

module.exports = router; //export default
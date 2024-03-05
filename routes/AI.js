const express = require('express');
const AIController = require('../controllers/AI');

const router = express.Router();

// Route to get all posts

router.post('/api',AIController.api);



module.exports = router;
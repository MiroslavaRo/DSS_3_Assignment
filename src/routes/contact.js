const express = require('express');
const controller = require('../controllers/contact')
const router = express.Router();

router.get('/main', controller.list);
//router.get('/:id', controller.details);
router.post('/', controller.create);
router.put('/:id', controller.update);


module.exports = router;
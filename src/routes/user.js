const express = require('express');
const controller = require('../controllers/user')
const router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.details);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);


module.exports = router;
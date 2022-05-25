const express = require('express');
const controller = require('../controllers/contact');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, controller.list);
router.get('/:id', auth, controller.details);
router.post('/', auth, controller.create);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.delete);

module.exports = router;
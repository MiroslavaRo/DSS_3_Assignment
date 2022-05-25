const express = require('express');
const controller = require('../controllers/user');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, controller.list);
router.get('/:id', auth, controller.details);
router.post('/', controller.create);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.delete);

router.post('/login', controller.login);

module.exports = router;
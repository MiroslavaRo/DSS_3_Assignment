const express = require('express');
const controller = require('../controllers/contact');
const auth = require('../middlewares/auth');
const error = require('../middlewares/error');
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/', auth, controller.list, error);
router.get('/:id', auth, controller.details, error);
router.get('/:id/avatar', auth, controller.getAvatar);
router.post('/', auth, controller.create, error);
router.post('/:id/avatar', auth, upload.single('file'), controller.createAvatar, error);
router.put('/:id', auth, controller.update, error);
router.delete('/:id', auth, controller.delete, error);

module.exports = router;
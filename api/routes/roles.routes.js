const express = require('express');
const router = express.Router();
const rolController = require('../controllers/RolController');
const { verifyToken } = require('../middlewares/auth.middleware');
const { checkRole } = require('../middlewares/rbac.middleware');

router.get('/', verifyToken, rolController.getAll);
router.get('/:id', verifyToken, rolController.getById);

// Roles management usually only for admin
router.post('/', verifyToken, checkRole(['admin']), rolController.create);
router.put('/:id', verifyToken, checkRole(['admin']), rolController.update);
router.delete('/:id', verifyToken, checkRole(['admin']), rolController.delete);

module.exports = router;

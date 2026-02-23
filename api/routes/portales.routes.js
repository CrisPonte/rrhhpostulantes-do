const express = require('express');
const router = express.Router();
const GenericController = require('../controllers/GenericController');
const { verifyToken } = require('../middlewares/auth.middleware');
const { checkRole } = require('../middlewares/rbac.middleware');

const controller = new GenericController('Portal');

// Public to all authenticated roles
router.get('/', verifyToken, controller.getAll);
router.get('/:id', verifyToken, controller.getById);

// Restricted to admin and jefe de rrhh
router.post('/', verifyToken, checkRole(['admin', 'jefe de rrhh']), controller.create);
router.put('/:id', verifyToken, checkRole(['admin', 'jefe de rrhh']), controller.update);
router.delete('/:id', verifyToken, checkRole(['admin', 'jefe de rrhh']), controller.delete);

module.exports = router;

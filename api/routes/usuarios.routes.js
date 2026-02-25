const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/UsuarioController');
const { verifyToken } = require('../middlewares/auth.middleware');
const { checkRole } = require('../middlewares/rbac.middleware');

// Restricted to admin and jefe de rrhh
router.get('/', verifyToken, checkRole(['admin', 'jefe de rrhh']), usuarioController.getAll);
router.get('/:id', verifyToken, checkRole(['admin', 'jefe de rrhh']), usuarioController.getById);
router.post('/', verifyToken, checkRole(['admin', 'jefe de rrhh']), usuarioController.create);
router.put('/:id', verifyToken, checkRole(['admin', 'jefe de rrhh']), usuarioController.update);
router.delete('/:id', verifyToken, checkRole(['admin']), usuarioController.delete); // only admin can delete users completely (soft delete)
router.post('/:id/reset-password', verifyToken, checkRole(['admin']), usuarioController.resetPassword);
router.patch('/:id/toggle-status', verifyToken, checkRole(['admin']), usuarioController.toggleStatus);
router.post('/change-password', verifyToken, usuarioController.changePassword);

module.exports = router;

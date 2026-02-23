const express = require('express');
const router = express.Router();
const postulanteController = require('../controllers/PostulanteController');
const { verifyToken } = require('../middlewares/auth.middleware');
const { checkRole } = require('../middlewares/rbac.middleware');

// Public to all authenticated roles
router.get('/', verifyToken, checkRole(['admin', 'jefe de rrhh', 'staff']), postulanteController.getAll);
router.get('/:id', verifyToken, checkRole(['admin', 'jefe de rrhh', 'staff']), postulanteController.getById);

// Restricted to admin and jefe de rrhh
router.post('/', verifyToken, checkRole(['admin', 'jefe de rrhh']), postulanteController.create);
router.put('/:id', verifyToken, checkRole(['admin', 'jefe de rrhh']), postulanteController.update);

// Restricted to admin only for hard delete (or soft delete)
router.delete('/:id', verifyToken, checkRole(['admin', 'jefe de rrhh']), postulanteController.delete);

module.exports = router;

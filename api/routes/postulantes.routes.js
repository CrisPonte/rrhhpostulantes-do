const express = require('express');
const router = express.Router();
const postulanteController = require('../controllers/PostulanteController');
const { verifyToken } = require('../middlewares/auth.middleware');
const { checkRole } = require('../middlewares/rbac.middleware');
const multer = require('multer');


// Cambio propuesto por ChatGPT problemas de persmisos
const tempUploadPath = process.env.STORAGE_PATH || '/storage/postulantes';

const upload = multer({
    dest: path.join(tempUploadPath, 'tmp')
});

//const upload = multer({ dest: 'uploads/' }); // Temp folder, storageService will move it
// Fin cambios GhatGPT



// Public to all authenticated roles
router.get('/', verifyToken, checkRole(['admin', 'jefe de rrhh', 'staff']), postulanteController.getAll);
router.get('/:id', verifyToken, checkRole(['admin', 'jefe de rrhh', 'staff']), postulanteController.getById);

// Restricted to admin and jefe de rrhh
router.post('/', verifyToken, checkRole(['admin', 'jefe de rrhh']), postulanteController.create);
router.put('/:id', verifyToken, checkRole(['admin', 'jefe de rrhh']), postulanteController.update);

// File management
router.post('/:id/files', verifyToken, checkRole(['admin', 'jefe de rrhh']), upload.single('archivo'), postulanteController.uploadFile);
router.get('/:id/files', verifyToken, checkRole(['admin', 'jefe de rrhh', 'staff']), postulanteController.listFiles);
router.get('/:id/files/:filename', verifyToken, checkRole(['admin', 'jefe de rrhh', 'staff']), postulanteController.downloadFile);



// Restricted to admin only for hard delete (or soft delete)
router.delete('/:id', verifyToken, checkRole(['admin', 'jefe de rrhh']), postulanteController.delete);

module.exports = router;

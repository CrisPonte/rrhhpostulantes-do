const { getRepository } = require('../repositories');
const storageService = require('../services/StorageService');

class PostulanteController {
    getAll = async (req, res) => {
        try {
            const repo = getRepository('Postulante');
            // Pass query parameters to search method
            const items = await repo.search(req.query);
            res.json(items);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    getById = async (req, res) => {
        try {
            const repo = getRepository('Postulante');
            const item = await repo.findById(req.params.id);
            if (!item) return res.status(404).json({ error: 'Postulante no encontrado' });
            res.json(item);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    create = async (req, res) => {
        try {
            const repo = getRepository('Postulante');
            const data = { ...req.body, createdBy: req.user?.userId };
            const newItem = await repo.create(data);
            res.status(201).json(newItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    update = async (req, res) => {
        try {
            const repo = getRepository('Postulante');
            const oldItem = await repo.findById(req.params.id);
            if (!oldItem) return res.status(404).json({ error: 'Postulante no encontrado' });

            const data = { ...req.body, updatedBy: req.user?.userId };

            // Check if identity changed for directory rename
            const identityChanged =
                (data.apellido && data.apellido !== oldItem.apellido) ||
                (data.nombre && data.nombre !== oldItem.nombre) ||
                (data.dni && data.dni !== oldItem.dni);

            if (identityChanged) {
                storageService.renameApplicantDirectory(
                    { apellido: oldItem.apellido, nombre: oldItem.nombre, dni: oldItem.dni },
                    {
                        apellido: data.apellido || oldItem.apellido,
                        nombre: data.nombre || oldItem.nombre,
                        dni: data.dni || oldItem.dni
                    }
                );
            }

            const updatedItem = await repo.update(req.params.id, data);
            res.json(updatedItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    uploadFile = async (req, res) => {
        try {
            if (!req.file) return res.status(400).json({ error: 'No se subió ningún archivo' });

            const repo = getRepository('Postulante');
            const item = await repo.findById(req.params.id);
            if (!item) return res.status(404).json({ error: 'Postulante no encontrado' });

            await storageService.saveFile(item, req.file);
            res.json({ message: 'Archivo subido correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    delete = async (req, res) => {
        try {
            const repo = getRepository('Postulante');
            const item = await repo.findById(req.params.id);
            if (!item) return res.status(404).json({ error: 'Postulante no encontrado' });

            // Per spec: only admin can hard delete
            if (req.user.rol.toLowerCase() === 'admin') {
                const deletedItem = await repo.hardDelete(req.params.id, req.user?.userId);
                if (deletedItem) {
                    storageService.deleteApplicantDirectory(item);
                }
            } else {
                await repo.softDelete(req.params.id, req.user?.userId);
            }
            res.json({ message: 'Postulante eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

module.exports = new PostulanteController();

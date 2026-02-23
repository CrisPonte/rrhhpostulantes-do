const { getRepository } = require('../repositories');

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
            const data = { ...req.body, updatedBy: req.user?.userId };
            const updatedItem = await repo.update(req.params.id, data);
            if (!updatedItem) return res.status(404).json({ error: 'Postulante no encontrado' });
            res.json(updatedItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    delete = async (req, res) => {
        try {
            const repo = getRepository('Postulante');
            // Per spec: only admin can hard delete
            if (req.user.rol.toLowerCase() === 'admin') {
                const deletedItem = await repo.hardDelete(req.params.id, req.user?.userId);
                if (!deletedItem) return res.status(404).json({ error: 'Postulante no encontrado' });
            } else {
                const deletedItem = await repo.softDelete(req.params.id, req.user?.userId);
                if (!deletedItem) return res.status(404).json({ error: 'Postulante no encontrado' });
            }
            res.json({ message: 'Postulante eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

module.exports = new PostulanteController();

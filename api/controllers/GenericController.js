const { getRepository } = require('../repositories');

class GenericController {
    constructor(repoName) {
        this.repoName = repoName;
    }

    getAll = async (req, res) => {
        try {
            const repo = getRepository(this.repoName);
            const items = await repo.findAll();
            res.json(items);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    getById = async (req, res) => {
        try {
            const repo = getRepository(this.repoName);
            const item = await repo.findById(req.params.id);
            if (!item) return res.status(404).json({ error: 'No encontrado' });
            res.json(item);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    create = async (req, res) => {
        try {
            const repo = getRepository(this.repoName);
            const data = { ...req.body, createdBy: req.user?.userId };
            const newItem = await repo.create(data);
            res.status(201).json(newItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    update = async (req, res) => {
        try {
            const repo = getRepository(this.repoName);
            const data = { ...req.body, updatedBy: req.user?.userId };
            const updatedItem = await repo.update(req.params.id, data);
            if (!updatedItem) return res.status(404).json({ error: 'No encontrado' });
            res.json(updatedItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    delete = async (req, res) => {
        try {
            const repo = getRepository(this.repoName);
            const deletedItem = await repo.softDelete(req.params.id, req.user?.userId);
            if (!deletedItem) return res.status(404).json({ error: 'No encontrado' });
            res.json({ message: 'Eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

module.exports = GenericController;

const bcrypt = require('bcryptjs');
const { getRepository } = require('../repositories');

class UsuarioController {
    getAll = async (req, res) => {
        try {
            const repo = getRepository('Usuario');
            const items = await repo.findAll();
            // Remove passwords from output
            const sanitized = items.map(u => {
                const { password, ...rest } = u.toObject();
                return rest;
            });
            res.json(sanitized);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    getById = async (req, res) => {
        try {
            const repo = getRepository('Usuario');
            const item = await repo.findById(req.params.id);
            if (!item) return res.status(404).json({ error: 'No encontrado' });

            const { password, ...rest } = item.toObject();
            res.json(rest);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    create = async (req, res) => {
        try {
            const { email, password, nombre, apellido, rol } = req.body;
            if (!password) return res.status(400).json({ error: 'Password requerida' });

            const repo = getRepository('Usuario');

            const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT) || 10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newItem = await repo.create({
                email,
                password: hashedPassword,
                nombre,
                apellido,
                rol,
                createdBy: req.user?.userId
            });

            const { password: _, ...rest } = newItem.toObject();
            res.status(201).json(rest);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    update = async (req, res) => {
        try {
            const { password, ...data } = req.body;
            const repo = getRepository('Usuario');

            if (password) {
                const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT) || 10);
                data.password = await bcrypt.hash(password, salt);
            }

            data.updatedBy = req.user?.userId;
            const updatedItem = await repo.update(req.params.id, data);

            if (!updatedItem) return res.status(404).json({ error: 'No encontrado' });

            const { password: _, ...rest } = updatedItem.toObject();
            res.json(rest);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    delete = async (req, res) => {
        try {
            const repo = getRepository('Usuario');
            const deletedItem = await repo.softDelete(req.params.id, req.user?.userId);
            if (!deletedItem) return res.status(404).json({ error: 'No encontrado' });
            res.json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

module.exports = new UsuarioController();

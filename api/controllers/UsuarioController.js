const bcrypt = require('bcryptjs');
const { getRepository } = require('../repositories');

class UsuarioController {
    getAll = async (req, res) => {
        try {
            const repo = getRepository('Usuario');
            const items = await repo.findAll();
            // Remove passwords from output
            const sanitized = items.map(u => {
                const doc = u.toObject();
                const { password, ...rest } = doc;
                if (rest.rol && typeof rest.rol === 'object') {
                    rest.rol = rest.rol.nombre;
                }
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

            const doc = item.toObject();
            const { password, ...rest } = doc;
            if (rest.rol && typeof rest.rol === 'object') {
                rest.rol = rest.rol.nombre;
            }
            res.json(rest);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    create = async (req, res) => {
        try {
            const { email, password, nombre, apellido, rol } = req.body;
            if (!password) return res.status(400).json({ error: 'Password requerida' });

            // Resolve role name to ID
            const rolRepo = getRepository('Rol');
            const rolDoc = await rolRepo.model.findOne({ nombre: rol }).exec();
            if (!rolDoc) return res.status(400).json({ error: 'Rol no válido' });

            const repo = getRepository('Usuario');

            const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT) || 10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newItem = await repo.create({
                email,
                password: hashedPassword,
                nombre,
                apellido,
                rol: rolDoc._id,
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

            if (data.rol) {
                const rolRepo = getRepository('Rol');
                const rolDoc = await rolRepo.model.findOne({ nombre: data.rol }).exec();
                if (!rolDoc) return res.status(400).json({ error: 'Rol no válido' });
                data.rol = rolDoc._id;
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

    resetPassword = async (req, res) => {
        try {
            const { newPassword } = req.body;
            if (!newPassword) return res.status(400).json({ error: 'Nueva contraseña requerida' });

            const repo = getRepository('Usuario');
            const user = await repo.findById(req.params.id);
            if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

            const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT) || 10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            await repo.update(req.params.id, {
                password: hashedPassword,
                updatedBy: req.user?.userId
            });

            res.json({ message: 'Contraseña restablecida correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    changePassword = async (req, res) => {
        try {
            const { currentPassword, newPassword } = req.body;
            const userId = req.user.userId;

            const repo = getRepository('Usuario');
            const user = await repo.findById(userId);
            if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

            // Verify current password
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) return res.status(400).json({ error: 'La contraseña actual es incorrecta' });

            const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT) || 10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            await repo.update(userId, {
                password: hashedPassword,
                updatedBy: userId
            });

            res.json({ message: 'Contraseña cambiada correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

module.exports = new UsuarioController();

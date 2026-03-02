const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getRepository } = require('../repositories');

class AuthService {
    async login(identity, password) {
        const usuarioRepo = getRepository('Usuario');

        // 1. Find the user by alias
        const usuario = await usuarioRepo.findByAlias(identity.trim());
        if (!usuario) {
            throw new Error('Credenciales inválidas');
        }

        if (usuario.activo === false) {
            throw new Error('Usuario bloqueado. Contacte al administrador.');
        }

        // 2. Add extra complexity (BCRYPT_SECRET) if used in hashing, but usually bcrypt is enough
        // For this implementation, we just use standard bcrypt compare
        // If the SPEC meant "hash the password with BCRYPT_SECRET beforehand", you'd do it here. 
        // We'll stick to standard bcrypt matching.
        const isMatch = await bcrypt.compare(password, usuario.password);

        if (!isMatch) {
            throw new Error('Credenciales inválidas');
        }

        // 3. Generate JWT
        const payload = {
            userId: usuario._id,
            rol: usuario.rol ? usuario.rol.nombre : null,
            nombre: usuario.nombre,
            apellido: usuario.apellido
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.SESSION_EXPIRES || '30m' }
        );

        return {
            token,
            user: {
                id: usuario._id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                rol: payload.rol
            }
        };
    }
}

module.exports = new AuthService();

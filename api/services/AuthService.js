const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getRepository } = require('../repositories');

class AuthService {
    async login(email, password) {
        const usuarioRepo = getRepository('Usuario');

        // 1. Find the user
        const usuario = await usuarioRepo.findByEmail(email.trim().toLowerCase());
        if (!usuario) {
            throw new Error('Credenciales inválidas');
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
            rol: usuario.rol ? usuario.rol.nombre : null // assuming populated role has "nombre"
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

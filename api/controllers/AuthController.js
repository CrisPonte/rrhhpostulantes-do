const authService = require('../services/AuthService');

class AuthController {
    async login(req, res) {
        try {
            const { identity, password } = req.body;
            if (!identity || !password) {
                return res.status(400).json({ error: 'Faltan credenciales (usuario o contraseña)' });
            }

            const result = await authService.login(identity, password);
            return res.status(200).json(result);
        } catch (error) {
            if (error.message === 'Credenciales inválidas') {
                return res.status(401).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Error del servidor: ' + error.message });
        }
    }
}

module.exports = new AuthController();

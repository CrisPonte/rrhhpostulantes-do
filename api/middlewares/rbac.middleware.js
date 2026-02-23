const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.rol) {
            return res.status(403).json({ error: 'Prohibido. No hay rol de usuario activo.' });
        }

        // Role nombre must match one of the allowed roles
        if (!allowedRoles.includes(req.user.rol.trim().toLowerCase())) {
            return res.status(403).json({ error: 'Prohibido. No tiene los permisos necesarios para realizar esta acción.' });
        }

        next();
    };
};

module.exports = { checkRole };

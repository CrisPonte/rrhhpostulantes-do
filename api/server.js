require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.DB_TYPE === 'mongodb') {
  const connectDB = require('./config/db');
  connectDB();
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./routes/auth.routes');
const usuarioRoutes = require('./routes/usuarios.routes');
const rolRoutes = require('./routes/roles.routes');
const portalRoutes = require('./routes/portales.routes');
const puestoRoutes = require('./routes/puestos.routes');
const tituloRoutes = require('./routes/titulos.routes');
const postulanteRoutes = require('./routes/postulantes.routes');

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/portales', portalRoutes);
app.use('/api/puestos', puestoRoutes);
app.use('/api/titulos', tituloRoutes);
app.use('/api/postulantes', postulanteRoutes);

// Basic health route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

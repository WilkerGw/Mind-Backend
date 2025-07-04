const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

// Rotas
const clientRoutes = require('./routes/clients');
const productRoutes = require('./routes/products');
const salesRoutes = require('./routes/sales');
const promotionRoutes = require('./routes/promotions');
const boletoRoutes = require('./routes/boletos');
const agendamentoRoutes = require('./routes/agendamento');

const app = express();

// Conectar ao banco de dados
connectDB();

// Middlewares essenciais
app.use(cors());
app.use(express.json());

// Definição das rotas da API
app.use('/api/clients', clientRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/boletos', boletoRoutes);
app.use('/api/agendamento', agendamentoRoutes);

// Servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static('uploads'));

// Middleware para rotas não encontradas (404)
app.use((req, res, next) => {
  const error = new Error(`Rota não encontrada - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
// app.js

const express = require('express'); // Importa a biblioteca Express
const cors = require('cors'); // Importa a biblioteca CORS para lidar com requisições de origens diferentes
require('dotenv').config(); // Carrega variáveis de ambiente a partir do arquivo .env
const connectDB = require('./config/db'); // Importa a função para conectar ao banco de dados
const clientRoutes = require('./routes/clients'); // Importa as rotas relacionadas a clientes
const productRoutes = require('./routes/products'); // Importa as rotas relacionadas a produtos
const salesRoutes = require('./routes/sales'); // Importa as rotas relacionadas a vendas
const promotionRoutes = require('./routes/promotions'); // Importa as rotas relacionadas a promoções
const boletoRoutes = require('./routes/boletos'); // Importa as rotas relacionadas a boletos
const agendamentoRoutes = require('./routes/agendamento'); // Importa as rotas relacionadas a agendamentos

const app = express(); // Cria uma instância do Express

// Conectar ao banco de dados
connectDB();

// Middleware para lidar com CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Definição das rotas
app.use('/api/clients', clientRoutes); // Rotas relacionadas a clientes
app.use('/api/products', productRoutes); // Rotas relacionadas a produtos
app.use('/api/sales', salesRoutes); // Rotas relacionadas a vendas
app.use('/api/promotions', promotionRoutes); // Rotas relacionadas a promoções
app.use('/api/boletos', boletoRoutes); // Rotas relacionadas a boletos
app.use('/api/agendamento', agendamentoRoutes); // Rotas relacionadas a agendamentos

// Servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static('uploads'));

// Iniciar o servidor
const PORT = process.env.PORT || 5000; // Define a porta do servidor, usando a variável de ambiente PORT ou 5000 por padrão
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)); // Inicia o servidor e exibe uma mensagem no console
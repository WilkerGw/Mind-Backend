const express = require('express'); // Importa a biblioteca Express
const router = express.Router(); // Cria um roteador Express

// Importa as funções controladoras do arquivo sales.js
const {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
  getTotalSales,
  getSalesHistory,
  getDailySales,
  getMonthlySales
} = require('../controllers/sales');

// Define as rotas para o recurso Venda

// Rota para listar todas as vendas
router.get('/', getAllSales);

// Rota para obter o total de vendas
router.get('/total', getTotalSales);

// Rota para obter o histórico diário de vendas
router.get('/history', getSalesHistory);

// Rota para obter as vendas diárias
router.get('/daily', getDailySales);

// Rota para obter as vendas mensais
router.get('/monthly', getMonthlySales);

// Rota para buscar uma venda por ID
router.get('/:id', getSaleById);

// Rota para criar uma nova venda
router.post('/', createSale);

// Rota para atualizar uma venda existente por ID
router.put('/:id', updateSale);

// Rota para excluir uma venda por ID
router.delete('/:id', deleteSale);

// Exporta o roteador para ser usado em outras partes da aplicação
module.exports = router;
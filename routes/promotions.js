const express = require('express'); // Importa a biblioteca Express
const router = express.Router(); // Cria um roteador Express

// Importa as funções controladoras do arquivo promotions.js
const {
  getAllPromotions,
  getPromotionById,
  createPromotion,
  updatePromotion,
  deletePromotion
} = require('../controllers/promotions');

// Define as rotas para o recurso Promoção

// Rota para listar todas as promoções
router.get('/', getAllPromotions);

// Rota para buscar uma promoção por ID
router.get('/:id', getPromotionById);

// Rota para criar uma nova promoção
router.post('/', createPromotion);

// Rota para atualizar uma promoção existente por ID
router.put('/:id', updatePromotion);

// Rota para excluir uma promoção por ID
router.delete('/:id', deletePromotion);

// Exporta o roteador para ser usado em outras partes da aplicação
module.exports = router;
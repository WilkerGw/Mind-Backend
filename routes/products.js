const express = require('express'); // Importa a biblioteca Express
const router = express.Router(); // Cria um roteador Express

// Importa as funções controladoras do arquivo products.js
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products');

// Define as rotas para o recurso Produto

// Rota para listar todos os produtos
router.get('/', getAllProducts);

// Rota para buscar um produto por ID
router.get('/:id', getProductById);

// Rota para criar um novo produto
router.post('/', createProduct);

// Rota para atualizar um produto existente por ID
router.put('/:id', updateProduct);

// Rota para excluir um produto por ID
router.delete('/:id', deleteProduct);

// Exporta o roteador para ser usado em outras partes da aplicação
module.exports = router;
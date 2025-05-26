const express = require('express'); // Importa a biblioteca Express
const router = express.Router(); // Cria um roteador Express

// Importa as funções controladoras do arquivo boletos.js
const {
  getAllBoletos,
  getBoletoById,
  createBoleto,
  updateBoleto,
  deleteBoleto
} = require('../controllers/boletos');

// Define as rotas para o recurso Boleto

// Rota para listar todos os boletos
router.get('/', getAllBoletos);

// Rota para obter um boleto por ID
router.get('/:id', getBoletoById);

// Rota para criar um novo boleto
router.post('/', createBoleto);

// Rota para atualizar um boleto existente por ID
router.put('/:id', updateBoleto);

// Rota para deletar um boleto por ID
router.delete('/:id', deleteBoleto);

// Rota para obter o total de valores dos boletos
router.get('/total', async (req, res) => {
  try {
    const total = await Boleto.aggregate([
      { $group: { _id: null, total: { $sum: "$parcelValue" } } } // Agrupa todos os documentos e soma o campo 'parcelValue'
    ]);
    res.json({ total: total[0]?.total || 0 }); // Retorna o total dos valores dos boletos ou 0 se não houver boletos
  } catch (error) {
    res.status(500).json({ error: error.message }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
});

// Exporta o roteador para ser usado em outras partes da aplicação
module.exports = router;
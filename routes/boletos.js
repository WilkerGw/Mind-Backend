const express = require('express');
const router = express.Router();

const {
  getAllBoletos,
  getBoletoById,
  createBoleto,
  updateBoleto,
  deleteBoleto,
  getTotalBoletosValue,
  getOverdueBoletos, // Adicionado
  getDueSoonBoletos  // Adicionado
} = require('../controllers/boletos');

router.get('/', getAllBoletos);
router.get('/total', getTotalBoletosValue);
router.get('/overdue', getOverdueBoletos); // Nova rota
router.get('/due-soon', getDueSoonBoletos); // Nova rota
router.get('/:id', getBoletoById);
router.post('/', createBoleto);
router.put('/:id', updateBoleto);
router.delete('/:id', deleteBoleto);

module.exports = router;
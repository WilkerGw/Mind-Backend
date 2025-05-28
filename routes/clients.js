const express = require('express');
const router = express.Router();
const {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientsWithBirthdayThisMonth // Novo import
} = require('../controllers/clients');

router.get('/', getAllClients);
router.get('/:id', getClientById);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

// Nova rota:
router.get('/birthday/monthly', getClientsWithBirthdayThisMonth); // Rota para aniversariantes do mês

module.exports = router;
const express = require('express'); // Importa a biblioteca Express
const router = express.Router(); // Cria um roteador Express

// Importa as funções controladoras do arquivo agendamento.js
const {
  getAllAgendamentos,
  getAgendamentoById,
  createAgendamento,
  updateAgendamento,
  deleteAgendamento,
  getTotalAgendamentos,
  getAgendamentosHistory
} = require('../controllers/agendamento');

// Define as rotas para o recurso Agendamento

// Rota para listar todos os agendamentos
router.get('/', getAllAgendamentos);

// Rota para obter o total de agendamentos
router.get('/total', getTotalAgendamentos);

// Rota para obter o histórico de agendamentos
router.get('/history', getAgendamentosHistory);

// Rota para obter um agendamento por ID
router.get('/:id', getAgendamentoById);

// Rota para criar um novo agendamento
router.post('/', createAgendamento);

// Rota para atualizar um agendamento existente por ID
router.put('/:id', updateAgendamento);

// Rota para deletar um agendamento por ID
router.delete('/:id', deleteAgendamento);

// Exporta o roteador para ser usado em outras partes da aplicação
module.exports = router;
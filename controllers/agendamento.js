const asyncHandler = require('express-async-handler');
const Agendamento = require('../models/Agendamento');

// @desc    Obter todos os agendamentos
// @route   GET /api/agendamento
exports.getAllAgendamentos = asyncHandler(async (req, res) => {
  const agendamentos = await Agendamento.find().sort({ date: 1 });
  res.status(200).json(agendamentos);
});

// @desc    Obter um agendamento por ID
// @route   GET /api/agendamento/:id
exports.getAgendamentoById = asyncHandler(async (req, res) => {
  const agendamento = await Agendamento.findById(req.params.id);
  if (!agendamento) {
    res.status(404);
    throw new Error('Agendamento não encontrado');
  }
  res.status(200).json(agendamento);
});

// @desc    Criar um novo agendamento
// @route   POST /api/agendamento
exports.createAgendamento = asyncHandler(async (req, res) => {
  const { name, telephone, date, hour, observation } = req.body;
  if (!name || !telephone || !date || !hour) {
    res.status(400);
    throw new Error('Por favor, preencha os campos obrigatórios: nome, telefone, data e hora.');
  }

  const newAgendamento = await Agendamento.create(req.body);
  res.status(201).json(newAgendamento);
});

// @desc    Atualizar um agendamento
// @route   PUT /api/agendamento/:id
exports.updateAgendamento = asyncHandler(async (req, res) => {
  const agendamento = await Agendamento.findById(req.params.id);
  if (!agendamento) {
    res.status(404);
    throw new Error('Agendamento não encontrado');
  }

  const updatedAgendamento = await Agendamento.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  res.status(200).json(updatedAgendamento);
});

// @desc    Deletar um agendamento
// @route   DELETE /api/agendamento/:id
exports.deleteAgendamento = asyncHandler(async (req, res) => {
  const agendamento = await Agendamento.findById(req.params.id);
  if (!agendamento) {
    res.status(404);
    throw new Error('Agendamento não encontrado');
  }

  await agendamento.deleteOne();
  res.status(200).json({ message: 'Agendamento excluído com sucesso' });
});

// @desc    Obter total de agendamentos
// @route   GET /api/agendamento/total
exports.getTotalAgendamentos = asyncHandler(async (req, res) => {
  const total = await Agendamento.countDocuments();
  res.status(200).json({ total });
});

// @desc    Obter histórico de agendamentos (passados)
// @route   GET /api/agendamento/history
exports.getAgendamentosHistory = asyncHandler(async (req, res) => {
  const history = await Agendamento.find({ date: { $lt: new Date() } }).sort({ date: -1 });
  res.status(200).json(history);
});
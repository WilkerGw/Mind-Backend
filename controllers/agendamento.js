const asyncHandler = require("express-async-handler");
const Agendamento = require("../models/Agendamento");

exports.getAllAgendamentos = asyncHandler(async (req, res) => {
  const agendamentos = await Agendamento.find().sort({ date: 1 });
  res.status(200).json(agendamentos);
});

exports.getAgendamentoById = asyncHandler(async (req, res) => {
  const agendamento = await Agendamento.findById(req.params.id);
  if (!agendamento) {
    res.status(404);
    throw new Error("Agendamento não encontrado");
  }
  res.status(200).json(agendamento);
});

exports.createAgendamento = asyncHandler(async (req, res) => {
  const { name, telephone, date, hour, observation } = req.body;
  if (!name || !telephone || !date || !hour) {
    res.status(400);
    throw new Error(
      "Por favor, preencha os campos obrigatórios: nome, telefone, data e hora."
    );
  }

  const newAgendamento = await Agendamento.create(req.body);
  res.status(201).json(newAgendamento);
});

exports.updateAgendamento = asyncHandler(async (req, res) => {
  const agendamento = await Agendamento.findById(req.params.id);
  if (!agendamento) {
    res.status(404);
    throw new Error("Agendamento não encontrado");
  }

  const updatedAgendamento = await Agendamento.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  res.status(200).json(updatedAgendamento);
});

exports.deleteAgendamento = asyncHandler(async (req, res) => {
  const agendamento = await Agendamento.findById(req.params.id);
  if (!agendamento) {
    res.status(404);
    throw new Error("Agendamento não encontrado");
  }

  await agendamento.deleteOne();
  res.status(200).json({ message: "Agendamento excluído com sucesso" });
});

exports.getTotalAgendamentos = asyncHandler(async (req, res) => {
  const total = await Agendamento.countDocuments();
  res.status(200).json({ total });
});

exports.getAgendamentosHistory = asyncHandler(async (req, res) => {
  const history = await Agendamento.find({ date: { $lt: new Date() } }).sort({
    date: -1,
  });
  res.status(200).json(history);
});

exports.getTodaysAgendamentos = asyncHandler(async (req, res) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0); 

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999); 

  const todaysAgendamentos = await Agendamento.find({
    date: { $gte: todayStart, $lte: todayEnd }
  }).sort({
    hour: 1 
  });

  res.status(200).json(todaysAgendamentos);
});
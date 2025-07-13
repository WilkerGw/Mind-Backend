const asyncHandler = require('express-async-handler');
const Boleto = require('../models/Boleto');

exports.getAllBoletos = asyncHandler(async (req, res) => {
  const boletosFromDB = await Boleto.find().populate('client', 'fullName').sort({ dueDate: 1 });

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const boletosComStatusAtualizado = boletosFromDB.map(boleto => {
    if (!boleto.client) {
      return { ...boleto.toObject(), client: { fullName: 'Cliente Excluído' } };
    }
    const boletoObject = boleto.toObject();
    if (boletoObject.status === 'aberto' && new Date(boletoObject.dueDate) < hoje) {
      boletoObject.status = 'atrasado';
    }
    return boletoObject;
  });

  res.json(boletosComStatusAtualizado);
});

exports.getOverdueBoletos = asyncHandler(async (req, res) => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const boletosVencidos = await Boleto.find({
    status: 'aberto',
    dueDate: { $lt: hoje }
  }).populate('client', 'fullName').sort({ dueDate: 1 });

  res.json(boletosVencidos);
});

exports.getDueSoonBoletos = asyncHandler(async (req, res) => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  
  const emSeteDias = new Date();
  emSeteDias.setDate(hoje.getDate() + 7);

  const boletosAVencer = await Boleto.find({
    status: 'aberto',
    dueDate: { 
      $gte: hoje,
      $lte: emSeteDias
    }
  }).populate('client', 'fullName').sort({ dueDate: 1 });

  res.json(boletosAVencer);
});

exports.getBoletoById = asyncHandler(async (req, res) => {
  const boleto = await Boleto.findById(req.params.id).populate('client', 'fullName');
  if (!boleto) {
    res.status(404);
    throw new Error('Boleto não encontrado');
  }
  res.json(boleto);
});

exports.createBoleto = asyncHandler(async (req, res) => {
  const data = req.body;
  if (Array.isArray(data)) {
    if (data.length === 0) {
      res.status(400); throw new Error('Nenhum boleto fornecido.');
    }
    const boletosCriados = await Boleto.insertMany(data);
    res.status(201).json(boletosCriados);
  } else {
    const { client, parcelValue, dueDate } = data;
    if (!client || !parcelValue || !dueDate) {
      res.status(400); throw new Error('Campos essenciais ausentes.');
    }
    const boleto = await Boleto.create(data);
    res.status(201).json(boleto);
  }
});

exports.updateBoleto = asyncHandler(async (req, res) => {
  const boleto = await Boleto.findById(req.params.id);
  if (!boleto) {
    res.status(404); throw new Error('Boleto não encontrado');
  }
  const updatedBoleto = await Boleto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('client', 'fullName');
  res.json(updatedBoleto);
});


exports.deleteBoleto = asyncHandler(async (req, res) => {
  const boleto = await Boleto.findById(req.params.id);
  if (!boleto) {
    res.status(404); throw new Error('Boleto não encontrado');
  }
  await boleto.deleteOne();
  res.status(200).json({ message: "Boleto excluído com sucesso." });
});

exports.getTotalBoletosValue = asyncHandler(async (req, res) => {
    const totalAggregation = await Boleto.aggregate([
      { $match: { status: { $in: ['aberto', 'atrasado'] } } },
      { $group: { _id: null, total: { $sum: "$parcelValue" } } }
    ]);
    const total = totalAggregation.length > 0 ? totalAggregation[0].total : 0;
    res.status(200).json({ total });
});
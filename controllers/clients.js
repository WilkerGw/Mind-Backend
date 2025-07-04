const asyncHandler = require('express-async-handler');
const Client = require('../models/Client');

// @desc    Listar todos os clientes
// @route   GET /api/clients
exports.getAllClients = asyncHandler(async (req, res) => {
  const clients = await Client.find().sort({ fullName: 1 });
  res.json(clients);
});

// @desc    Buscar cliente por ID
// @route   GET /api/clients/:id
exports.getClientById = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (!client) {
    res.status(404);
    throw new Error('Cliente não encontrado');
  }
  res.json(client);
});

// @desc    Criar novo cliente
// @route   POST /api/clients
exports.createClient = asyncHandler(async (req, res) => {
  const { fullName, cpf, possuiReceita, longe, perto, vencimentoReceita } = req.body;

  if (!fullName || !cpf) {
    res.status(400);
    throw new Error('Nome completo e CPF são obrigatórios.');
  }

  if (possuiReceita === true && (!longe || !perto || !vencimentoReceita)) {
    res.status(400);
    throw new Error('Se "Possui Receita" está marcado, as informações de receita são obrigatórias.');
  }

  const existingClient = await Client.findOne({ cpf });
  if (existingClient) {
    res.status(409); // Conflict
    throw new Error('CPF já cadastrado.');
  }
  
  const clientData = req.body;
  if (possuiReceita === false) {
    clientData.longe = undefined;
    clientData.perto = undefined;
    clientData.vencimentoReceita = undefined;
  }

  const client = await Client.create(clientData);
  res.status(201).json(client);
});

// @desc    Atualizar cliente
// @route   PUT /api/clients/:id
exports.updateClient = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const client = await Client.findById(id);
  if (!client) {
    res.status(404);
    throw new Error('Cliente não encontrado');
  }

  if (updateData.cpf) {
    const existingClient = await Client.findOne({ cpf: updateData.cpf, _id: { $ne: id } });
    if (existingClient) {
      res.status(409);
      throw new Error('CPF já pertence a outro cliente.');
    }
  }

  if (updateData.hasOwnProperty('possuiReceita') && updateData.possuiReceita === false) {
    updateData.longe = null;
    updateData.perto = null;
    updateData.vencimentoReceita = null;
  }

  const updatedClient = await Client.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  res.json(updatedClient);
});

// @desc    Excluir cliente
// @route   DELETE /api/clients/:id
exports.deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (!client) {
    res.status(404);
    throw new Error('Cliente não encontrado');
  }
  await client.deleteOne();
  res.status(200).json({ message: 'Cliente excluído com sucesso.' });
});

// @desc    Obter aniversariantes do mês
// @route   GET /api/clients/birthday/monthly
exports.getClientsWithBirthdayThisMonth = asyncHandler(async (req, res) => {
  const currentMonth = new Date().getMonth() + 1;
  const clients = await Client.find({
    $expr: {
      $eq: [{ $month: "$birthDate" }, currentMonth]
    }
  }).select("fullName birthDate phone");

  res.json(clients);
});
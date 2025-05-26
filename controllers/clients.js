const Client = require('../models/Client');

// Listar todos os clientes ordenados por nome completo
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ fullName: 1 });
    res.json(clients);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    res.status(500).json({ error: 'Erro interno ao buscar clientes.' });
  }
};

// Buscar cliente por ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json(client);
  } catch (error) {
    if (error.kind === 'ObjectId') {
        return res.status(400).json({ error: 'ID do cliente inválido' });
    }
    console.error("Erro ao buscar cliente por ID:", error);
    res.status(500).json({ error: 'Erro interno ao buscar cliente.' });
  }
};

// Criar novo cliente
exports.createClient = async (req, res) => {
  const {
    fullName,
    cpf,
    phone,
    birthDate,
    gender,
    address,
    cep,
    receiptImage,
    notes,
    possuiReceita,
    longe,
    perto,
    vencimentoReceita
  } = req.body;

  if (!fullName || !cpf) {
    return res.status(400).json({ error: 'Nome completo e CPF são obrigatórios.' });
  }

  if (possuiReceita === true) {
    if (!longe || !perto || !vencimentoReceita) {
      return res.status(400).json({ error: 'Se "Possui Receita" está marcado, todas as informações de LONGE, PERTO e o vencimento são obrigatórios.' });
    }
  }

  try {
    const existingClient = await Client.findOne({ cpf });
    if (existingClient) {
      return res.status(409).json({ error: 'CPF já cadastrado.' });
    }

    const clientData = {
      fullName, cpf, phone, birthDate, gender, address, cep, receiptImage, notes, possuiReceita
    };

    if (possuiReceita === true) {
      clientData.longe = longe;
      clientData.perto = perto;
      clientData.vencimentoReceita = vencimentoReceita;
    } else {
      clientData.longe = null;
      clientData.perto = null;
      clientData.vencimentoReceita = null;
    }

    const client = new Client(clientData);
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Erro interno ao criar cliente.' });
  }
};

// Atualizar cliente
exports.updateClient = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (updateData.possuiReceita === true) {
    if (!updateData.longe || !updateData.perto || !updateData.vencimentoReceita) {
      return res.status(400).json({ error: 'Se "Possui Receita" está marcado, todas as informações de LONGE, PERTO e o vencimento são obrigatórios.' });
    }
  } else if (updateData.hasOwnProperty('possuiReceita') && updateData.possuiReceita === false) {
    updateData.longe = null;
    updateData.perto = null;
    updateData.vencimentoReceita = null;
  }

  try {
    if (updateData.cpf) {
        const existingClient = await Client.findOne({ cpf: updateData.cpf, _id: { $ne: id } });
        if (existingClient) {
            return res.status(409).json({ error: 'CPF já pertence a outro cliente.' });
        }
    }

    const client = await Client.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!client) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json(client);
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    if (error.kind === 'ObjectId') {
        return res.status(400).json({ error: 'ID do cliente inválido' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Erro interno ao atualizar cliente.' });
  }
};

// Excluir cliente
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.status(200).json({ message: 'Cliente excluído com sucesso.' });
  } catch (error) {
     if (error.kind === 'ObjectId') {
        return res.status(400).json({ error: 'ID do cliente inválido' });
    }
    console.error("Erro ao deletar cliente:", error);
    res.status(500).json({ error: 'Erro interno ao excluir cliente.' });
  }
};
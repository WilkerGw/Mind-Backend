const Agendamento = require('../models/Agendamento'); // Importa o modelo Agendamento

// Função para obter todos os agendamentos
exports.getAllAgendamentos = async (req, res) => {
  try {
    const agendamentos = await Agendamento.find(); // Busca todos os documentos na coleção Agendamento
    res.status(200).json(agendamentos); // Retorna os agendamentos encontrados com status 200
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar agendamentos', error }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};

// Função para obter um agendamento pelo ID
exports.getAgendamentoById = async (req, res) => {
  try {
    const agendamento = await Agendamento.findById(req.params.id); // Busca um documento na coleção Agendamento pelo ID fornecido nos parâmetros da requisição
    if (!agendamento) {
      return res.status(404).json({ message: 'Agendamento não encontrado' }); // Se o agendamento não for encontrado, retorna uma mensagem de erro com status 404
    }
    res.status(200).json(agendamento); // Retorna o agendamento encontrado com status 200
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar agendamento', error }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};

// Função para criar um novo agendamento
exports.createAgendamento = async (req, res) => {
  try {
    const { name, telephone, date, hour, observation, contactado, compareceu, faltou } = req.body; // Extrai os dados do corpo da requisição
    const newAgendamento = new Agendamento({ name, telephone, date, hour, observation, contactado, compareceu, faltou }); // Cria um novo documento Agendamento com os dados extraídos
    const savedAgendamento = await newAgendamento.save(); // Salva o novo documento no banco de dados
    res.status(201).json(savedAgendamento); // Retorna o agendamento salvo com status 201
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar agendamento', error }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};

// Função para atualizar um agendamento existente
exports.updateAgendamento = async (req, res) => {
  try {
    const { id } = req.params; // Extrai o ID dos parâmetros da requisição
    const { name, telephone, date, hour, observation, contactado, compareceu, faltou } = req.body; // Extrai os dados do corpo da requisição
    const updatedAgendamento = await Agendamento.findByIdAndUpdate(
      id,
      { name, telephone, date, hour, observation, contactado, compareceu, faltou }, // Atualiza o documento com os novos dados
      { new: true } // Retorna o documento atualizado
    );
    if (!updatedAgendamento) {
      return res.status(404).json({ message: 'Agendamento não encontrado' }); // Se o agendamento não for encontrado, retorna uma mensagem de erro com status 404
    }
    res.status(200).json(updatedAgendamento); // Retorna o agendamento atualizado com status 200
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar agendamento', error }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};

// Função para deletar um agendamento
exports.deleteAgendamento = async (req, res) => {
  try {
    const { id } = req.params; // Extrai o ID dos parâmetros da requisição
    const deletedAgendamento = await Agendamento.findByIdAndDelete(id); // Busca e deleta o documento pelo ID
    if (!deletedAgendamento) {
      return res.status(404).json({ message: 'Agendamento não encontrado' }); // Se o agendamento não for encontrado, retorna uma mensagem de erro com status 404
    }
    res.status(200).json({ message: 'Agendamento excluído com sucesso' }); // Retorna uma mensagem de sucesso com status 200
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar agendamento', error }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};

// Função para obter o total de agendamentos
exports.getTotalAgendamentos = async (req, res) => {
  try {
    const total = await Agendamento.countDocuments(); // Conta o número total de documentos na coleção Agendamento
    res.status(200).json({ total }); // Retorna o total de agendamentos com status 200
  } catch (error) {
    res.status(500).json({ message: 'Erro ao contar agendamentos', error }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};

// Função para obter o histórico de agendamentos
exports.getAgendamentosHistory = async (req, res) => {
  try {
    // Supondo que o histórico seja apenas os agendamentos passados
    const history = await Agendamento.find({ date: { $lt: new Date() } }); // Busca todos os documentos com data menor que a data atual
    res.status(200).json(history); // Retorna o histórico de agendamentos com status 200
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar histórico de agendamentos', error }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};
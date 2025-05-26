const Boleto = require('../models/Boleto'); // Importa o modelo Boleto
const Client = require('../models/Client'); // Importa o modelo Client

// Listar todos os boletos com populate
exports.getAllBoletos = async (req, res) => {
  try {
    const boletos = await Boleto.find() // Busca todos os documentos na coleção Boleto
      .populate('client', 'fullName') // Preenche o campo 'client' com apenas o campo 'fullName' do cliente
      .sort({ dueDate: 1 }); // Ordena os boletos pela data de vencimento em ordem crescente
    res.json(boletos); // Retorna a lista de boletos
  } catch (error) {
    res.status(500).json({ error: error.message }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};

// Buscar boleto por ID
exports.getBoletoById = async (req, res) => {
  try {
    const boleto = await Boleto.findById(req.params.id) // Busca um documento na coleção Boleto pelo ID fornecido nos parâmetros da requisição
      .populate('client', 'fullName'); // Preenche o campo 'client' com apenas o campo 'fullName' do cliente
    if (!boleto) return res.status(404).json({ error: 'Boleto não encontrado' }); // Se o boleto não for encontrado, retorna uma mensagem de erro com status 404
    res.json(boleto); // Retorna o boleto encontrado
  } catch (error) {
    res.status(500).json({ error: error.message }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};

// Criar novo boleto
exports.createBoleto = async (req, res) => {
  try {
    const { client, parcelValue, dueDate, status } = req.body; // Extrai os dados do corpo da requisição

    // Validação de campos obrigatórios
    if (!client || !parcelValue || !dueDate) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' }); // Retorna uma mensagem de erro se algum campo obrigatório estiver faltando
    }

    // Verifica se o cliente existe
    const validClient = await Client.findById(client); // Busca o cliente pelo ID fornecido
    if (!validClient) {
      return res.status(400).json({ error: 'Cliente não encontrado.' }); // Retorna uma mensagem de erro se o cliente não for encontrado
    }

    // Validação de valor positivo
    if (parcelValue <= 0) {
      return res.status(400).json({ error: 'Valor da parcela deve ser positivo.' }); // Retorna uma mensagem de erro se o valor da parcela não for positivo
    }

    // Validação de data válida
    if (isNaN(Date.parse(dueDate))) {
      return res.status(400).json({ error: 'Data de vencimento inválida.' }); // Retorna uma mensagem de erro se a data de vencimento for inválida
    }

    // Validação de status (opcional, já validado pelo Mongoose)
    if (status && !['pago', 'aberto', 'atrasado'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido.' }); // Retorna uma mensagem de erro se o status for inválido
    }

    // Cria o boleto
    const boleto = new Boleto(req.body); // Cria um novo documento Boleto com os dados extraídos
    await boleto.save(); // Salva o novo documento no banco de dados
    res.status(201).json(boleto); // Retorna o boleto salvo com status 201
  } catch (error) {
    res.status(400).json({ error: error.message }); // Em caso de erro, retorna uma mensagem de erro com status 400
  }
};

// Atualizar boleto
exports.updateBoleto = async (req, res) => {
  try {
    const boleto = await Boleto.findByIdAndUpdate(
      req.params.id, // ID do boleto a ser atualizado
      req.body, // Novos dados para o boleto
      { new: true } // Retorna o documento atualizado
    )
      .populate('client', 'fullName'); // Preenche o campo 'client' com apenas o campo 'fullName' do cliente
    if (!boleto) return res.status(404).json({ error: 'Boleto não encontrado' }); // Se o boleto não for encontrado, retorna uma mensagem de erro com status 404
    res.json(boleto); // Retorna o boleto atualizado
  } catch (error) {
    res.status(400).json({ error: error.message }); // Em caso de erro, retorna uma mensagem de erro com status 400
  }
};

// Excluir boleto
exports.deleteBoleto = async (req, res) => {
  try {
    const boleto = await Boleto.findByIdAndDelete(req.params.id); // Busca e deleta o documento pelo ID
    if (!boleto) return res.status(404).json({ error: 'Boleto não encontrado' }); // Se o boleto não for encontrado, retorna uma mensagem de erro com status 404
    res.status(204).send(); // Retorna status 204 indicando que o boleto foi excluído sem conteúdo
  } catch (error) {
    res.status(500).json({ error: error.message }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};
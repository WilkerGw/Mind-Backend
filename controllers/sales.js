const Sale = require('../models/Sale'); // Importa o modelo Sale
const Client = require('../models/Client'); // Importa o modelo Client
const Product = require('../models/Product'); // Importa o modelo Product

// Listar todas as vendas com informações do cliente e produtos
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate('client', 'fullName') // Preenche o campo 'client' com apenas o campo 'fullName' do cliente
      .populate('products.product', 'name price'); // Preenche o campo 'products.product' com os campos 'name' e 'price' dos produtos
    res.json(sales); // Retorna a lista de vendas
  } catch (error) {
    res.status(500).json({ error: error.message }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};

// Buscar venda por ID com informações do cliente e produtos
exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate('client', 'fullName') // Preenche o campo 'client' com apenas o campo 'fullName' do cliente
      .populate('products.product', 'name price'); // Preenche o campo 'products.product' com os campos 'name' e 'price' dos produtos
    if (!sale) return res.status(404).json({ error: 'Venda não encontrada' }); // Se a venda não for encontrada, retorna uma mensagem de erro com status 404
    res.json(sale); // Retorna a venda encontrada
  } catch (error) {
    res.status(500).json({ error: error.message }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};

// Criar nova venda
exports.createSale = async (req, res) => {
  try {
    const { client, products, seller, paymentMethod, total } = req.body; // Extrai os dados do corpo da requisição

    // Validação de campos obrigatórios
    if (!client || !products || !seller || !paymentMethod || total == null) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' }); // Retorna uma mensagem de erro com status 400 se algum campo obrigatório estiver faltando
    }

    // Verifica se o cliente existe
    const validClient = await Client.findById(client); // Busca o cliente pelo ID fornecido
    if (!validClient) {
      return res.status(400).json({ error: 'Cliente não encontrado.' }); // Retorna uma mensagem de erro com status 400 se o cliente não for encontrado
    }

    // Verifica se todos os produtos existem
    const invalidProduct = await Promise.any(
      products.map(async (p) => !(await Product.findById(p.product))) // Verifica se cada produto existe no banco de dados
    ).catch(() => null);
    if (invalidProduct) {
      return res.status(400).json({ error: 'Um ou mais produtos inválidos.' }); // Retorna uma mensagem de erro com status 400 se algum produto for inválido
    }

    // Validação de total não negativo
    if (total < 0) {
      return res.status(400).json({ error: 'Total não pode ser negativo.' }); // Retorna uma mensagem de erro com status 400 se o total for negativo
    }

    // Prepara os dados da venda
    const saleData = {
      client,
      products: products.map(p => ({
        product: p.product,
        quantity: p.quantity
      })),
      seller,
      paymentMethod,
      total
    };

    const sale = new Sale(saleData); // Cria um novo documento Sale com os dados preparados
    await sale.save(); // Salva o novo documento no banco de dados
    res.status(201).json(sale); // Retorna a venda salva com status 201
  } catch (error) {
    res.status(400).json({ error: error.message }); // Em caso de erro, retorna uma mensagem de erro com status 400
  }
};

// Atualizar venda
exports.updateSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndUpdate(
      req.params.id, // ID da venda a ser atualizada
      req.body, // Novos dados para a venda
      { new: true } // Retorna o documento atualizado
    )
      .populate('client', 'fullName') // Preenche o campo 'client' com apenas o campo 'fullName' do cliente
      .populate('products.product', 'name price'); // Preenche o campo 'products.product' com os campos 'name' e 'price' dos produtos
    if (!sale) return res.status(404).json({ error: 'Venda não encontrada.' }); // Se a venda não for encontrada, retorna uma mensagem de erro com status 404
    res.json(sale); // Retorna a venda atualizada
  } catch (error) {
    res.status(400).json({ error: error.message }); // Em caso de erro, retorna uma mensagem de erro com status 400
  }
};

// Excluir venda
exports.deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id); // Busca e deleta o documento pelo ID
    if (!sale) return res.status(404).json({ error: 'Venda não encontrada.' }); // Se a venda não for encontrada, retorna uma mensagem de erro com status 404
    res.status(204).send(); // Retorna status 204 indicando que a venda foi excluída sem conteúdo
  } catch (error) {
    res.status(500).json({ error: error.message }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};

// Obter o total de vendas
exports.getTotalSales = async (req, res) => {
  try {
    const total = await Sale.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } } // Agrupa todos os documentos e soma o campo 'total'
    ]);
    res.json({ total: total[0]?.total || 0 }); // Retorna o total de vendas ou 0 se não houver vendas
  } catch (error) {
    res.status(500).json({ error: error.message }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};

// Obter o histórico de vendas diário
exports.getSalesHistory = async (req, res) => {
  try {
    const sales = await Sale.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$saleDate" } }, // Agrupa por data no formato YYYY-MM-DD
          total: { $sum: "$total" } // Soma o campo 'total' para cada data
        }
      },
      { $sort: { _id: 1 } } // Ordena os resultados por data em ordem crescente
    ]);
    const formattedData = sales.map((item) => ({
      day: item._id,
      sales: item.total
    })); // Formata os dados para retornar 'day' e 'sales'
    res.json(formattedData); // Retorna o histórico de vendas formatado
  } catch (error) {
    console.error('Erro ao processar getSalesHistory:', error); // Registra o erro no console
    res.status(500).json({ error: error.message }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};

// Obter as vendas diárias
exports.getDailySales = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato YYYY-MM-DD
    const dailySales = await Sale.aggregate([
      {
        $match: { saleDate: today } // Filtra as vendas pela data atual
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$total" } // Soma o campo 'total' das vendas diárias
        }
      }
    ]);
    res.json({ dailyTotal: dailySales[0]?.total || 0 }); // Retorna o total das vendas diárias ou 0 se não houver vendas
  } catch (error) {
    console.error('Erro ao processar getDailySales:', error); // Registra o erro no console
    res.status(500).json({ error: error.message }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};

// Obter as vendas mensais
exports.getMonthlySales = async (req, res) => {
  try {
    const firstDayOfMonth = new Date(); // Obtém a data atual
    firstDayOfMonth.setDate(1); // Define o dia para o primeiro dia do mês
    const monthlySales = await Sale.aggregate([
      {
        $match: {
          saleDate: {
            $gte: firstDayOfMonth.toISOString().split('T')[0] // Filtra as vendas desde o primeiro dia do mês até a data atual
          }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$total" } // Soma o campo 'total' das vendas mensais
        }
      }
    ]);
    res.json({ monthlyTotal: monthlySales[0]?.total || 0 }); // Retorna o total das vendas mensais ou 0 se não houver vendas
  } catch (error) {
    console.error('Erro ao processar getMonthlySales:', error); // Registra o erro no console
    res.status(500).json({ error: error.message }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};
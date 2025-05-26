const Product = require('../models/Product'); // Importa o modelo Product

// Listar todos os produtos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Busca todos os documentos na coleção Product
    res.json(products); // Retorna a lista de produtos
  } catch (error) {
    console.error('Erro ao obter produtos:', error); // Registra o erro no console
    res.status(500).json({ error: error.message }); // Retorna uma mensagem de erro com status 500
  }
};

// Buscar produto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Busca um documento na coleção Product pelo ID fornecido nos parâmetros da requisição
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' }); // Se o produto não for encontrado, retorna uma mensagem de erro com status 404
    res.json(product); // Retorna o produto encontrado
  } catch (error) {
    console.error('Erro ao obter produto por ID:', error); // Registra o erro no console
    res.status(500).json({ error: error.message }); // Retorna uma mensagem de erro com status 500
  }
};

// Criar novo produto
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body); // Cria um novo documento Product com os dados extraídos do corpo da requisição
    await product.save(); // Salva o novo documento no banco de dados
    res.status(201).json(product); // Retorna o produto salvo com status 201
  } catch (error) {
    console.error('Erro ao criar produto:', error); // Registra o erro no console
    res.status(400).json({ error: error.message }); // Retorna uma mensagem de erro com status 400
  }
};

// Atualizar produto
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id, // ID do produto a ser atualizado
      req.body, // Novos dados para o produto
      { new: true } // Retorna o documento atualizado
    );
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' }); // Se o produto não for encontrado, retorna uma mensagem de erro com status 404
    res.json(product); // Retorna o produto atualizado
  } catch (error) {
    console.error('Erro ao atualizar produto:', error); // Registra o erro no console
    res.status(400).json({ error: error.message }); // Retorna uma mensagem de erro com status 400
  }
};

// Excluir produto
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id); // Busca e deleta o documento pelo ID
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' }); // Se o produto não for encontrado, retorna uma mensagem de erro com status 404
    res.status(204).send(); // Retorna status 204 indicando que o produto foi excluído sem conteúdo
  } catch (error) {
    console.error('Erro ao deletar produto:', error); // Registra o erro no console
    res.status(500).json({ error: error.message }); // Retorna uma mensagem de erro com status 500
  }
};
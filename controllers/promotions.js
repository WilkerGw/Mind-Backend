const Promotion = require('../models/Promotion'); // Importa o modelo Promotion

// Listar todas as promoções com os produtos associados
exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find().populate('products'); // Busca todas as promoções e popula o campo 'products' com os detalhes dos produtos associados
    res.json(promotions); // Retorna a lista de promoções
  } catch (error) {
    res.status(500).json({ error: error.message }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};

// Buscar promoção por ID com os produtos associados
exports.getPromotionById = async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id).populate('products'); // Busca uma promoção pelo ID e popula o campo 'products' com os detalhes dos produtos associados
    if (!promotion) return res.status(404).json({ error: 'Promoção não encontrada' }); // Se a promoção não for encontrada, retorna uma mensagem de erro com status 404
    res.json(promotion); // Retorna a promoção encontrada
  } catch (error) {
    res.status(500).json({ error: error.message }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};

// Criar nova promoção
exports.createPromotion = async (req, res) => {
  const promotion = new Promotion(req.body); // Cria um novo documento Promotion com os dados extraídos do corpo da requisição
  try {
    await promotion.save(); // Salva o novo documento no banco de dados
    res.status(201).json(promotion); // Retorna a promoção salva com status 201
  } catch (error) {
    res.status(400).json({ error: error.message }); // Em caso de erro, retorna uma mensagem de erro com status 400
  }
};

// Atualizar promoção
exports.updatePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndUpdate(
      req.params.id, // ID da promoção a ser atualizada
      req.body, // Novos dados para a promoção
      { new: true } // Retorna o documento atualizado
    ).populate('products'); // Popula o campo 'products' com os detalhes dos produtos associados
    if (!promotion) return res.status(404).json({ error: 'Promoção não encontrada' }); // Se a promoção não for encontrada, retorna uma mensagem de erro com status 404
    res.json(promotion); // Retorna a promoção atualizada
  } catch (error) {
    res.status(400).json({ error: error.message }); // Em caso de erro, retorna uma mensagem de erro com status 400
  }
};

// Excluir promoção
exports.deletePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id); // Busca e deleta o documento pelo ID
    if (!promotion) return res.status(404).json({ error: 'Promoção não encontrada' }); // Se a promoção não for encontrada, retorna uma mensagem de erro com status 404
    res.status(204).send(); // Retorna status 204 indicando que a promoção foi excluída sem conteúdo
  } catch (error) {
    res.status(500).json({ error: error.message }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};
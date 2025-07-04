const asyncHandler = require('express-async-handler');
const Promotion = require('../models/Promotion');

// @desc    Listar todas as promoções
// @route   GET /api/promotions
exports.getAllPromotions = asyncHandler(async (req, res) => {
  const promotions = await Promotion.find().populate('products');
  res.json(promotions);
});

// @desc    Buscar promoção por ID
// @route   GET /api/promotions/:id
exports.getPromotionById = asyncHandler(async (req, res) => {
  const promotion = await Promotion.findById(req.params.id).populate('products');
  if (!promotion) {
    res.status(404);
    throw new Error('Promoção não encontrada');
  }
  res.json(promotion);
});

// @desc    Criar nova promoção
// @route   POST /api/promotions
exports.createPromotion = asyncHandler(async (req, res) => {
  const promotion = await Promotion.create(req.body);
  res.status(201).json(promotion);
});

// @desc    Atualizar promoção
// @route   PUT /api/promotions/:id
exports.updatePromotion = asyncHandler(async (req, res) => {
  const promotion = await Promotion.findById(req.params.id);
  if (!promotion) {
    res.status(404);
    throw new Error('Promoção não encontrada');
  }
  const updatedPromotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('products');
  res.json(updatedPromotion);
});

// @desc    Excluir promoção
// @route   DELETE /api/promotions/:id
exports.deletePromotion = asyncHandler(async (req, res) => {
  const promotion = await Promotion.findById(req.params.id);
  if (!promotion) {
    res.status(404);
    throw new Error('Promoção não encontrada');
  }
  await promotion.deleteOne();
  res.status(200).json({ message: "Promoção excluída com sucesso." });
});
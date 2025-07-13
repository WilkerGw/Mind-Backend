const asyncHandler = require('express-async-handler');
const Promotion = require('../models/Promotion');


exports.getAllPromotions = asyncHandler(async (req, res) => {
  const promotions = await Promotion.find().populate('products');
  res.json(promotions);
});

exports.getPromotionById = asyncHandler(async (req, res) => {
  const promotion = await Promotion.findById(req.params.id).populate('products');
  if (!promotion) {
    res.status(404);
    throw new Error('Promoção não encontrada');
  }
  res.json(promotion);
});


exports.createPromotion = asyncHandler(async (req, res) => {
  const promotion = await Promotion.create(req.body);
  res.status(201).json(promotion);
});

exports.updatePromotion = asyncHandler(async (req, res) => {
  const promotion = await Promotion.findById(req.params.id);
  if (!promotion) {
    res.status(404);
    throw new Error('Promoção não encontrada');
  }
  const updatedPromotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('products');
  res.json(updatedPromotion);
});

exports.deletePromotion = asyncHandler(async (req, res) => {
  const promotion = await Promotion.findById(req.params.id);
  if (!promotion) {
    res.status(404);
    throw new Error('Promoção não encontrada');
  }
  await promotion.deleteOne();
  res.status(200).json({ message: "Promoção excluída com sucesso." });
});
const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Listar todos os produtos
// @route   GET /api/products
exports.getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// @desc    Buscar produto por ID
// @route   GET /api/products/:id
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Produto não encontrado');
  }
  res.json(product);
});

// @desc    Criar novo produto
// @route   POST /api/products
exports.createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// @desc    Atualizar produto
// @route   PUT /api/products/:id
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Produto não encontrado');
  }
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  res.json(updatedProduct);
});

// @desc    Excluir produto
// @route   DELETE /api/products/:id
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Produto não encontrado');
  }
  await product.deleteOne();
  res.status(200).json({ message: "Produto excluído com sucesso." });
});
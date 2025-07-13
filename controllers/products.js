const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

exports.getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Produto não encontrado");
  }
  res.json(product);
});

exports.createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Produto não encontrado");
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  res.json(updatedProduct);
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Produto não encontrado");
  }
  await product.deleteOne();
  res.status(200).json({ message: "Produto excluído com sucesso." });
});

const asyncHandler = require('express-async-handler');
const Sale = require('../models/Sale');
const Client = require('../models/Client');
const Product = require('../models/Product');


exports.getAllSales = asyncHandler(async (req, res) => {
  const sales = await Sale.find()
    .populate('client', 'fullName')
    .populate('products.product', 'name price')
    .sort({ saleDate: -1 });
  res.json(sales);
});


exports.getSaleById = asyncHandler(async (req, res) => {
  const sale = await Sale.findById(req.params.id)
    .populate('client', 'fullName')
    .populate('products.product', 'name price');
  if (!sale) {
    res.status(404);
    throw new Error('Venda não encontrada');
  }
  res.json(sale);
});


exports.createSale = asyncHandler(async (req, res) => {
  const { client, products, seller, paymentMethod, total } = req.body;
  if (!client || !products || !seller || !paymentMethod || total == null) {
    res.status(400);
    throw new Error('Campos obrigatórios não preenchidos.');
  }

  const sale = await Sale.create(req.body);
  res.status(201).json(sale);
});

exports.updateSale = asyncHandler(async (req, res) => {
  const sale = await Sale.findById(req.params.id);
  if (!sale) {
    res.status(404);
    throw new Error('Venda não encontrada.');
  }
  const updatedSale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .populate('client', 'fullName')
    .populate('products.product', 'name price');
  res.json(updatedSale);
});


exports.deleteSale = asyncHandler(async (req, res) => {
  const sale = await Sale.findById(req.params.id);
  if (!sale) {
    res.status(404);
    throw new Error('Venda não encontrada.');
  }
  await sale.deleteOne();
  res.status(200).json({ message: "Venda excluída com sucesso." });
});


exports.getTotalSales = asyncHandler(async (req, res) => {
  const totalAggregation = await Sale.aggregate([
    { $group: { _id: null, total: { $sum: "$total" } } }
  ]);
  const total = totalAggregation.length > 0 ? totalAggregation[0].total : 0;
  res.json({ total });
});


exports.getSalesHistory = asyncHandler(async (req, res) => {
  const sales = await Sale.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$saleDate" } },
        total: { $sum: "$total" }
      }
    },
    { $sort: { _id: 1 } }
  ]);
  const formattedData = sales.map((item) => ({
    day: item._id,
    sales: item.total
  }));
  res.json(formattedData);
});

exports.getDailySales = asyncHandler(async (req, res) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const dailySales = await Sale.aggregate([
    { $match: { saleDate: { $gte: todayStart, $lte: todayEnd } } },
    { $group: { _id: null, total: { $sum: "$total" } } }
  ]);
  const total = dailySales.length > 0 ? dailySales[0].total : 0;
  res.json({ dailyTotal: total });
});

exports.getMonthlySales = asyncHandler(async (req, res) => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  
    const monthlySales = await Sale.aggregate([
      { $match: { saleDate: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } } },
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);
    const total = monthlySales.length > 0 ? monthlySales[0].total : 0;
    res.json({ monthlyTotal: total });
  });
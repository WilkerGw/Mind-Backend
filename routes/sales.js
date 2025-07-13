const express = require("express");
const router = express.Router();

const {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
  getTotalSales,
  getSalesHistory,
  getDailySales,
  getMonthlySales,
} = require("../controllers/sales");

router.get("/", getAllSales);
router.get("/total", getTotalSales);
router.get("/history", getSalesHistory);
router.get("/daily", getDailySales);
router.get("/monthly", getMonthlySales);
router.get("/:id", getSaleById);
router.post("/", createSale);
router.put("/:id", updateSale);
router.delete("/:id", deleteSale);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getAllBoletos,
  getBoletoById,
  createBoleto,
  updateBoleto,
  deleteBoleto,
  getTotalBoletosValue,
  getOverdueBoletos,
  getDueSoonBoletos,
} = require("../controllers/boletos");

router.get("/", getAllBoletos);
router.get("/total", getTotalBoletosValue);
router.get("/overdue", getOverdueBoletos);
router.get("/due-soon", getDueSoonBoletos);
router.get("/:id", getBoletoById);
router.post("/", createBoleto);
router.put("/:id", updateBoleto);
router.delete("/:id", deleteBoleto);

module.exports = router;

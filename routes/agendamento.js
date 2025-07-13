const express = require("express");
const router = express.Router();

const {
  getAllAgendamentos,
  getAgendamentoById,
  createAgendamento,
  updateAgendamento,
  deleteAgendamento,
  getTotalAgendamentos,
  getAgendamentosHistory,
  getTodaysAgendamentos, 
} = require("../controllers/agendamento");

router.get("/", getAllAgendamentos);
router.get("/total", getTotalAgendamentos);
router.get("/history", getAgendamentosHistory);
router.get("/today", getTodaysAgendamentos); 
router.get("/:id", getAgendamentoById);
router.post("/", createAgendamento);
router.put("/:id", updateAgendamento);
router.delete("/:id", deleteAgendamento);

module.exports = router;
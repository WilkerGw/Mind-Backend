const express = require("express");
const router = express.Router();
const {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientsWithBirthdayThisMonth,
} = require("../controllers/clients");

router.get("/", getAllClients);
router.get("/:id", getClientById);
router.post("/", createClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);
router.get("/birthday/monthly", getClientsWithBirthdayThisMonth);

module.exports = router;

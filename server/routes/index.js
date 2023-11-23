const express = require("express");
const router = express.Router();

// transaction controller
const transactionController = require("../controllers/transaction_controller");

router.get("/", (_, res) => {
  return res.status(200).json({
    message: "API is working",
  });
});

// for creating transactions
router.post("/transaction", transactionController.createTransaction);

// for fetching transactions
router.get("/transactions", transactionController.getTransaction);

module.exports = router;

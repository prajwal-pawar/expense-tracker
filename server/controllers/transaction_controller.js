const Transaction = require("../models/transaction");

// create transaction
module.exports.createTransaction = async (req, res) => {
  try {
    // create new transaction in db
    const transaction = await Transaction.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      date: req.body.date,
    });

    return res.status(200).json({
      message: "Transaction saved",
      transaction,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// fetch transactions
module.exports.getTransaction = async (req, res) => {
  try {
    // get all transactions from db
    const transactions = await Transaction.find({});

    return res.status(200).json({
      message: "Fetched all transaction",
      transactions,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

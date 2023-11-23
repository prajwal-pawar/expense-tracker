import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import "../styles/App.css";

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await axios.get("http://localhost:8000/transactions");

      // set transactions to transactions from response data
      setTransactions(response.data.transactions);
    };

    fetchTransactions();
  }, [transactions]);

  const addNewTransaction = async (event: FormEvent) => {
    event.preventDefault();

    // send request to server and get response
    const response = await axios.post("http://localhost:8000/transaction", {
      name,
      price,
      description,
      date,
    });

    // clear inputs when response comes
    setName("");
    setPrice("");
    setDescription("");
    setDate("");
    console.log("response", response.data);
  };

  // calculate the balance after transactions
  let balance = 0;

  for (let transaction of transactions) {
    balance = balance + transaction.price;
  }

  return (
    <main>
      {/* total */}
      <h1 className={balance < 0 ? "red" : ""}>
        ₹{balance}
        <span>.00</span>
      </h1>

      {/* inputs */}
      <form className="info-container" onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter item name"
            required
          />
          <input
            type="text"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Enter price"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>
        <div className="description">
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="description"
            required
          />
        </div>
        <button type="submit">Add Transaction</button>
      </form>

      {/* transaction details */}
      <div className="transactions">
        {/* if we have more than 0 transactions */}
        {transactions.length > 0 ? (
          transactions.map((transaction: any, index) => (
            <div className="transaction" key={index}>
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="right">
                <div
                  // if transaction is in minus then show red color, otherwise show green color
                  className={
                    // "price " + (transaction.price < 0 ? "red" : "green")
                    `price ${transaction.price < 0 ? "red" : "green"}`
                  }
                >
                  {transaction.price}
                </div>
                <div className="datetime">{transaction.date}</div>
              </div>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </main>
  );
}

export default App;

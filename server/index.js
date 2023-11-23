const express = require("express");
const db = require("./configs/mongoose");
const cors = require("cors");

const app = express();

const PORT = 8000;

// using body parser to read requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// using cors to avoid cors errors
app.use(cors());
// using router for routes
app.use("/", require("./routes"));

// starting server
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

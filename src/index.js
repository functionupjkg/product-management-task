const express = require("express");
const route = require("./routes/routes");

const app = express();

const port = 3000;

app.use(express.json());

app.use("/", route);

app.use("/*", function (req, res) {
  res.status(400).send({ status: false, message: "Endpoint is not correct" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

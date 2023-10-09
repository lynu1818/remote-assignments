const express = require("express");
const app = express();
const port = 3000;

app.get("/healthcheck", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

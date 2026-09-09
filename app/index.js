const express = require("express");
const itemsRouter = require("./routes/route");

const app = express();
app.use(express.json());
app.use("/api/items", itemsRouter);
app.listen(3000);
module.exports = app;
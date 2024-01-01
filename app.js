require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { db } = require("./db/db");
const { readdirSync } = require("fs");
const chatRoutes = require("./routes/chatRoutes");

const PORT = process.env.PORT;
db();
//middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/c", chatRoutes);
//Routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

const server = () => {
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();

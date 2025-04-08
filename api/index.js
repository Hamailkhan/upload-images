const express = require("express");
const cors = require("cors");
const { config } = require("../src/config/server.config");
const { corsOptions } = require("../src/config/cors.config");
const { route: ImageRoute } = require("../src/routes/image.routes");

const app = express();

const PORT = config.port;

app.use(express.json());
app.use(cors(corsOptions));

app.use("/image", ImageRoute);

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to the API",
  });
});

app.use((req, res) => {
  return res.status(404).json({
    success: true,
    message: "Invalid Route",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

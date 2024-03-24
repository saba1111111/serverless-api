const serverless = require("serverless-http");
const express = require("express");
const getDbClient = require("./libs/helpers/get-db-client.helper");
const app = express();

app.get("/", async (req, res, next) => {
  const db = await getDbClient();
  const result = await db`select now()`;

  return res.status(200).json({
    result,
  });
});

app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);

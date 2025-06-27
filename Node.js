// archivo server.js o index.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const pregunta = req.body.pregunta;

  const openaiRes = await fetch("https://api.cohere.ai/v1/generate", {
    method: "POST",
    headers: {
      "Authorization": "Bearer ",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: pregunta }]
    })
  });

  const data = await openaiRes.json();
  res.json(data);
});

app.listen(3000, () => {
  console.log("Servidor IA corriendo en http://localhost:3000");
});

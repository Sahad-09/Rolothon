const OpenAI = require("openai");
const express = require("express");
const env = require("dotenv");
env.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "assistant", content: prompt }],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Check if 'choices' property exists in the response
    if (response.choices && response.choices.length > 0) {
      const generatedText = response.choices[0].message.content;
      res.send(generatedText);
    } else {
      console.error("Invalid response format:", response);
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.error("Error:", err.message);

    if (err.response && err.response.status === 401) {
      // Unauthorized, likely an issue with the API key
      res.status(401).send("Unauthorized: Incorrect API key");
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
});

module.exports = router;

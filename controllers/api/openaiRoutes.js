const express = require('express');
const router = express.Router();
const { OpenAIApi, Configuration } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/ask', async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: req.body.question,
      max_tokens: 300,
    });
    res.json({ answer: response.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

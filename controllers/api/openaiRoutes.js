const express = require('express');
const router = express.Router();
const openai = require('openai');

const openaiApi = new openai.OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/ask', async (req, res) => {
  try {
    const response = await openaiApi.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: req.body.question,
      max_tokens: 150,
    });
    res.json({ answer: response.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

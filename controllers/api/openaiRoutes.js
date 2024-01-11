const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/ask', async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: req.body.question }],
      model: 'gpt-3.5-turbo',
    });
    console.log(response);
    const answer = response.choices[0].message.content;
    res.json({ answer: answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

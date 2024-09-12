require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.SERVER_PORT;

const apiKey = process.env.GEMINI_API_KEY;

const corsOptions = {
  origin: 'http://localhost:3000', // Allow only this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //allowedHeaders: 'Content-Type, Authorization',
};
app.use(cors(corsOptions));

app.use(express.json());

app.post('/gemini/chat', async (req, res) => {
const prompt = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Request body is required' });
  }

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key='+apiKey,
      req.body,
      {
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );

    const geminiResponse = response.data.candidates[0].content.parts[0].text;
    res.json({ response: geminiResponse });
  } catch (error) {
    console.error('Error invoking Gemini API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
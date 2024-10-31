const express = require('express');
const bodyParser = require('body-parser');
const { executeCode } = require('./execute-code');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Endpoint for executing code
app.post('/execute', async (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).send({ error: 'Code and language are required' });
  }

  try {
    const output = await executeCode(code, language);
    res.send({ output });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

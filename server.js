const express = require('express');
const cors = require('cors');
const dialogflow = require('@google-cloud/dialogflow');

const app = express();
app.use(cors());
app.use(express.json());

const projectId = 'agropilotbot-ubcb';

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const sessionId = Math.random().toString(36).substring(7);

    const sessionClient = new dialogflow.SessionsClient({
      keyFilename: './credenciales.json'
    });

    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: 'es',
        },
      },
    };

    const [response] = await sessionClient.detectIntent(request);
    const result = response.queryResult;

    res.json({ reply: result.fulfillmentText });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

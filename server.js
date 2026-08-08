const express = require('express');
const cors = require('cors');
const dialogflow = require('@google-cloud/dialogflow');

const app = express();
app.use(cors());
app.use(express.json());

const projectId = process.env.DIALOGFLOW_PROJECT_ID || 'agropilotbot-ubcb';

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const sessionId = Math.random().toString(36).substring(7);

    const credentials = {
      type: process.env.GOOGLE_TYPE || 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID || 'agropilotbot-ubcb',
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: process.env.GOOGLE_AUTH_URI,
      token_uri: process.env.GOOGLE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
    };

    const sessionClient = new dialogflow.SessionsClient({ credentials });

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const { SessionsClient } = require('@google-cloud/dialogflow');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const sessionId = Math.random().toString(36).substring(7);

    let privateKey = process.env.DF_PRIVATE_KEY || '';
    
    privateKey = privateKey
      .replace(/^"|"$/g, '')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '')
      .trim();

    if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
      throw new Error('Private key format invalid');
    }

    const credentials = {
      type: 'service_account',
      project_id: process.env.DF_PROJECT_ID,
      private_key_id: process.env.DF_PRIVATE_KEY_ID,
      private_key: privateKey,
      client_email: process.env.DF_CLIENT_EMAIL,
      client_id: process.env.DF_CLIENT_ID,
      auth_uri: process.env.DF_AUTH_URI,
      token_uri: process.env.DF_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.DF_AUTH_PROVIDER_CERT,
      client_x509_cert_url: process.env.DF_CLIENT_CERT,
    };

    const sessionClient = new SessionsClient({ credentials });
    const sessionPath = sessionClient.projectAgentSessionPath(
      process.env.DF_PROJECT_ID,
      sessionId
    );

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
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

function getPrivateKey() {
  let pk = process.env.DF_PRIVATE_KEY || '';
  pk = pk.replace(/^"|"$/g, '').replace(/\\n/g, '\n').replace(/\\r/g, '').trim();
  return pk;
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const privateKey = getPrivateKey();

  const payload = {
    iss: process.env.DF_CLIENT_EMAIL,
    scope: 'https://www.googleapis.com/auth/dialogflow',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };

  const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

  const response = await axios.post('https://oauth2.googleapis.com/token', 
    new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: token,
    }).toString(),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  return response.data.access_token;
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const projectId = process.env.DF_PROJECT_ID;
    const sessionId = Math.random().toString(36).substring(7);

    const accessToken = await getAccessToken();

    const url = `https://dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions/${sessionId}:detectIntent`;

    const response = await axios.post(url, {
      queryInput: {
        text: {
          text: message,
          languageCode: 'es',
        },
      },
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const reply = response.data.queryResult?.fulfillmentText || 'No entendi tu pregunta.';
    res.json({ reply });
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

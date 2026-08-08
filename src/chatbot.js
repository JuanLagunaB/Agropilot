const PROJECT_ID = process.env.REACT_APP_DIALOGFLOW_PROJECT_ID;
const API_KEY = process.env.REACT_APP_DIALOGFLOW_CLIENT_TOKEN;
const SESSION_ID = Math.random().toString(36).substring(7);

export async function sendMessageToBot(message) {
  try {
    const url = `https://dialogflow.googleapis.com/v2/projects/${PROJECT_ID}/agent/sessions/${SESSION_ID}:detectIntent?key=${API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        queryInput: {
          text: {
            text: message,
            languageCode: "es",
          },
        },
      }),
    });

    const data = await response.json();
    return data.fulfillmentText || "No entendi tu pregunta. Intenta de nuevo.";
  } catch (error) {
    console.error("Error al conectar con el bot:", error);
    return "Error de conexion. Intenta de nuevo mas tarde.";
  }
}

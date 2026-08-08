const API_URL = 'https://agropilot-production-03f0.up.railway.app';

export async function sendMessageToBot(message) {
  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    return data.reply || 'No entendi tu pregunta. Intenta de nuevo.';
  } catch (error) {
    console.error('Error al conectar con el bot:', error);
    return 'Error de conexion. Asegurate de que el servidor este corriendo.';
  }
}

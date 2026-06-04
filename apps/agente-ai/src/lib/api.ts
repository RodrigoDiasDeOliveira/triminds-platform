const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '';

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

function mockReply(message: string): string {
  return `You said: "${message}".

This is a mock response from the Agente AI console. Set VITE_API_BASE_URL to point at the FastAPI backend (POST /chat) to get real answers.`;
}

export async function sendChat(message: string, history: ChatTurn[]): Promise<string> {
  if (!apiBaseUrl) {
    return mockReply(message);
  }
  try {
    const res = await fetch(`${apiBaseUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.reply ?? data.answer ?? JSON.stringify(data);
  } catch (e) {
    return `Could not reach backend at ${apiBaseUrl} (${(e as Error).message}). Mock fallback: ${mockReply(message)}`;
  }
}

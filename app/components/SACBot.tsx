'use client';

import { useState } from 'react';

export default function SACBot() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    const res = await fetch('/api/openai-chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setResponse(data.reply);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-4 bg-white rounded shadow border">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4">Asistente USS | SAC</h2>
      <textarea
        className="w-full border p-3 rounded mb-2"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe tu duda sobre admisión, carreras, becas..."
      />
      <button
        onClick={sendMessage}
        className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900"
      >
        Enviar
      </button>
      {loading && <p className="mt-3 text-blue-700">Cargando respuesta...</p>}
      {response && (
        <div className="mt-4 p-3 bg-gray-100 rounded border text-sm whitespace-pre-line">
          {response}
        </div>
      )}
    </div>
  );
}
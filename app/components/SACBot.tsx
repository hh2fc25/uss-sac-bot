'use client';

import { useState, useRef, KeyboardEvent } from 'react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function SACBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/openai-chat', {
      method: 'POST',
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    const botMessage: ChatMessage = {
      role: 'assistant',
      content: data.reply,
    };

    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6 h-[600px] overflow-y-auto border border-gray-200">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Asistente USS | SAC</h2>
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl max-w-[80%] whitespace-pre-line text-sm ${
                msg.role === 'user'
                  ? 'ml-auto bg-blue-100 text-blue-900'
                  : 'mr-auto bg-gray-200 text-gray-900'
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="text-gray-500 text-sm italic">Escribiendo respuesta...</div>
          )}
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <textarea
          ref={textareaRef}
          rows={2}
          className="w-full border border-gray-300 rounded p-2 text-gray-900 placeholder-gray-400"
          placeholder="Escribe tu duda sobre admisión, carreras, becas..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
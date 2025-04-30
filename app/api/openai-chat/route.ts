import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const systemPrompt = `
Eres un asistente virtual de atención al estudiante de la Universidad San Sebastián (USS).
Debes responder únicamente usando información publicada en el sitio oficial: https://www.uss.cl.
No inventes respuestas. Si no sabes algo, invita al usuario a consultar directamente en www.uss.cl.
`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
    }),
  });

  const data = await res.json();
  return NextResponse.json({ reply: data.choices?.[0]?.message?.content });
}
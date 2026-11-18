import { JHSFL } from '../../../lib/sfl';

export const runtime = 'nodejs';
export const maxDuration = 60; // gate sfl.gl nunggu ±17 detik, jadi jangan di bawah ini

export async function POST(req) {
  let body = {};
  try {
    body = await req.json();
  } catch {}
  const url = String(body.url || '').trim().slice(0, 300);
  const enc = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (o) => controller.enqueue(enc.encode(JSON.stringify(o) + '\n'));
      try {
        const out = await JHSFL(url, (msg) => send({ t: 'log', msg }));
        send({ t: 'done', result: JSON.parse(out) });
      } catch {
        send({ t: 'done', result: { status: false, error: 'Server error, coba lagi.' } });
      }
      controller.close();
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-store, no-transform',
      'X-Accel-Buffering': 'no'
    }
  });
}

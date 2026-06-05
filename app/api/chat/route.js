import { findReply } from '../../../data/chatReplies';

export async function POST(request) {
  const { message } = await request.json();

  if (!message || typeof message !== 'string') {
    return Response.json({ error: 'Message is required' }, { status: 400 });
  }

  // Small delay so the UI feels like a real network call, not an instant reply.
  await new Promise(r => setTimeout(r, 400));

  return Response.json({ reply: findReply(message) });
}
